<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Habilitar logging para depuración
error_reporting(E_ALL);
ini_set('display_errors', 0);  // No mostrar errores en pantalla
ini_set('log_errors', 1);

// Configuración de la base de datos
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'chifa_el_punto';

// Conectar a la base de datos
$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']);
    exit;
}

// Obtener datos del POST
$json_data = file_get_contents('php://input');
error_log("Datos recibidos: " . $json_data);

$datos = json_decode($json_data, true);

if (!$datos) {
    error_log("Error al decodificar JSON: " . json_last_error_msg());
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

// Validar estructura de datos
error_log("Estructura de datos: " . print_r($datos, true));

if (!isset($datos['nombre']) || !isset($datos['telefono']) || !isset($datos['items']) || 
    !isset($datos['tipo_entrega']) || !isset($datos['metodo_pago']) || !isset($datos['total'])) {
    error_log("Faltan campos requeridos");
    echo json_encode(['success' => false, 'message' => 'Faltan campos requeridos']);
    exit;
}

try {
    // Iniciar transacción
    $conn->begin_transaction();
    
    // Insertar pedido directamente con los datos del cliente
    $sql_pedido = "INSERT INTO pedidos (nombre_cliente, telefono_cliente, email, metodo_pago, total) VALUES (?, ?, ?, ?, ?)";
    $stmt_pedido = $conn->prepare($sql_pedido);
            
    if (!$stmt_pedido) {
        error_log("Error preparando statement de pedido: " . $conn->error);
        throw new Exception("Error al preparar consulta de pedido");
    }
            
    $stmt_pedido->bind_param("ssssd", 
        $datos['nombre'], 
        $datos['telefono'], 
        $datos['email'],
        $datos['metodo_pago'], 
        $datos['total']
    );
            
    if (!$stmt_pedido->execute()) {
        error_log("Error ejecutando inserción de pedido: " . $stmt_pedido->error);
        throw new Exception("Error al insertar pedido");
    }
            
    $pedido_id = $conn->insert_id;
    error_log("Pedido insertado con ID: $pedido_id");
    
    // Insertar datos de envío
    $sql_envio = "INSERT INTO envios (pedido_id, direccion, notas, estado) VALUES (?, ?, ?, 'pendiente')";
    $stmt_envio = $conn->prepare($sql_envio);
    
    if ($stmt_envio) {
        $direccion = isset($datos['direccion']) ? $datos['direccion'] : '';
        $notas = isset($datos['notas']) ? $datos['notas'] : '';
        
        $stmt_envio->bind_param("iss", 
            $pedido_id,
            $direccion,
            $notas
        );
        $stmt_envio->execute();
    }
    
    // Insertar detalles del pedido
    $sql_detalle = "INSERT INTO pedido_detalles (pedido_id, producto_nombre, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)";
    $stmt_detalle = $conn->prepare($sql_detalle);
            
    if (!$stmt_detalle) {
        error_log("Error preparando statement de detalle: " . $conn->error);
        throw new Exception("Error al preparar consulta de detalles");
    }
    
    foreach ($datos['items'] as $item) {
        error_log("Procesando item: " . print_r($item, true));
        
        // Validar que el item tenga los campos necesarios
        if (!isset($item['nombre']) || !isset($item['cantidad']) || !isset($item['precio'])) {
            error_log("Item sin campos requeridos");
            throw new Exception("Item sin campos requeridos");
        }
        
        $precio_unitario = (isset($item['esPromoDescuento']) && $item['esPromoDescuento']) ? $item['precio'] : $item['precio'];
        $subtotal = $precio_unitario * $item['cantidad'];
        
        error_log("Insertando detalle: pedido_id=$pedido_id, nombre={$item['nombre']}, cantidad={$item['cantidad']}, precio_unitario=$precio_unitario, subtotal=$subtotal");
        
        $stmt_detalle->bind_param("isidd", 
            $pedido_id,
            $item['nombre'],
            $item['cantidad'],
            $precio_unitario,
            $subtotal
        );
        
        if (!$stmt_detalle->execute()) {
            error_log("Error ejecutando inserción de detalle: " . $stmt_detalle->error);
            throw new Exception("Error al insertar detalle del pedido");
        }
    }
    
    // Confirmar transacción
    $conn->commit();
    
    echo json_encode([
        'success' => true, 
        'pedido_id' => $pedido_id,
        'message' => 'Pedido guardado exitosamente'
    ]);
    
} catch (Exception $e) {
    if (isset($conn) && $conn->ping()) {
        $conn->rollback();
    }
    error_log("Error en guardar_pedido.php: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    echo json_encode(['success' => false, 'message' => 'Error al guardar el pedido: ' . $e->getMessage()]);
}

$conn->close();
?>
