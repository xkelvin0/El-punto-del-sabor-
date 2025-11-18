<?php
// Test simple para verificar la conexión a la base de datos
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'chifa_el_punto';

try {
    $conn = new mysqli($host, $username, $password, $database);
    
    if ($conn->connect_error) {
        echo "Error de conexión: " . $conn->connect_error;
    } else {
        echo "Conexión exitosa a la base de datos: $database";
        
        // Verificar si las tablas existen
        $tables = ['clientes', 'pedidos', 'detalle_pedidos'];
        foreach ($tables as $table) {
            $result = $conn->query("SHOW TABLES LIKE '$table'");
            if ($result->num_rows > 0) {
                echo "<br>Tabla '$table' existe";
            } else {
                echo "<br>ERROR: Tabla '$table' NO existe";
            }
        }
    }
    
    $conn->close();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
