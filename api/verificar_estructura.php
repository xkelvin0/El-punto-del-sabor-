<?php
// Script para verificar la estructura de las tablas
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
    
    echo "Base de datos: $database<br><br>";
    
    // Tablas a verificar
    $tablas = ['envios', 'pedidos', 'pedido_detalles'];
    
    foreach ($tablas as $tabla) {
        echo "<h3>Estructura de la tabla '$tabla':</h3>";
        
        $result = $conn->query("DESCRIBE $tabla");
        
        if ($result->num_rows > 0) {
            echo "<table border='1'>";
            echo "<tr><th>Campo</th><th>Tipo</th><th>Nulo</th><th>Clave</th><th>Predeterminado</th></tr>";
            
            while($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row['Field'] . "</td>";
                echo "<td>" . $row['Type'] . "</td>";
                echo "<td>" . $row['Null'] . "</td>";
                echo "<td>" . $row['Key'] . "</td>";
                echo "<td>" . $row['Default'] . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "La tabla '$tabla' no existe o está vacía.<br>";
        }
        
        echo "<br>";
    }
    
    $conn->close();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
