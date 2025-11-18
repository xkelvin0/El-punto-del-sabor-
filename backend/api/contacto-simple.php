<?php
header('Content-Type: application/json; charset=utf-8');
// Permitir desde mismo origen en XAMPP (ajustar si se expone públicamente)
header('Access-Control-Allow-Origin: http://localhost');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function json_response($status, $data) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Leer cuerpo JSON
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    json_response(400, [ 'success' => false, 'message' => 'Cuerpo inválido. Esperado JSON.' ]);
}

// Normalizar claves esperadas desde el JS
$name     = isset($input['name']) ? trim($input['name']) : null;
$email    = isset($input['email']) ? trim($input['email']) : null;
$consulta = isset($input['consulta']) ? trim($input['consulta']) : null;
$message  = isset($input['message']) ? trim($input['message']) : null;
$horario  = null;

// Si en el futuro envías horario como array de checks, lo unimos por comas
if (isset($input['horario'])) {
    if (is_array($input['horario'])) {
        $horario = implode(',', array_map('trim', $input['horario']));
    } else {
        $horario = trim((string)$input['horario']);
    }
}

// Validaciones básicas
if ($name === '' || $email === '' || $message === '' || !$name || !$email || !$message) {
    json_response(400, [ 'success' => false, 'message' => 'Faltan campos requeridos.' ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(400, [ 'success' => false, 'message' => 'Email inválido.' ]);
}

// Conexión a MySQL (usa las credenciales definidas en database/el_punto_del_sabor.sql)
$DB_HOST = 'localhost';
$DB_NAME = 'el_punto_del_sabor';
$DB_USER = 'elpunto_user';
$DB_PASS = 'TuContraseñaSegura123!';
$DSN     = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";

try {
    $pdo = new PDO($DSN, $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Crear tabla si no existe
    $pdo->exec("CREATE TABLE IF NOT EXISTS contactos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        consulta VARCHAR(50) NULL,
        mensaje TEXT NOT NULL,
        horario VARCHAR(100) NULL,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // Insertar
    $stmt = $pdo->prepare("INSERT INTO contactos (nombre, email, consulta, mensaje, horario) VALUES (:nombre, :email, :consulta, :mensaje, :horario)");
    $stmt->execute([
        ':nombre'   => $name,
        ':email'    => $email,
        ':consulta' => $consulta,
        ':mensaje'  => $message,
        ':horario'  => $horario,
    ]);

    $id = $pdo->lastInsertId();

    json_response(200, [
        'success' => true,
        'id' => (int)$id,
        'message' => 'Contacto guardado correctamente',
        'data' => [
            'nombre' => $name,
            'email' => $email,
            'consulta' => $consulta,
            'horario' => $horario,
        ]
    ]);
} catch (PDOException $e) {
    json_response(500, [ 'success' => false, 'message' => 'Error de servidor', 'error' => $e->getMessage() ]);
}
