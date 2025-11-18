<?php
// Script para verificar qué tablas existen en la base de datos
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
        exit;
    }
    
    echo "Conexión exitosa a la base de datos: $database<br><br>";
    
    // Obtener todas las tablas
    $result = $conn->query("SHOW TABLES");
    
    if ($result->num_rows > 0) {
        echo "Tablas encontradas en la base de datos:<br>";
        while($row = $result->fetch_array()) {
            echo "- " . $row[0] . "<br>";
        }
    } else {
        echo "No se encontraron tablas en la base de datos.";
    }
    
    $conn->close();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
