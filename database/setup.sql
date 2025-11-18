-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS chifa_el_punto;
USE chifa_el_punto;

-- Tabla de clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255),
    categoria VARCHAR(100),
    disponible BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    codigo_pedido VARCHAR(50) UNIQUE NOT NULL,
    tipo_entrega ENUM('domicilio', 'tienda') NOT NULL,
    direccion_entrega TEXT,
    referencia TEXT,
    metodo_pago VARCHAR(50) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
);

-- Tabla de detalles del pedido
CREATE TABLE IF NOT EXISTS detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    es_promocion BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- Insertar algunos productos básicos
INSERT IGNORE INTO productos (id, nombre, descripcion, precio, imagen, categoria) VALUES
(1, 'Arroz Chaufa', 'Delicioso arroz chaufa con pollo, huevo, cebollita china y toque especial de la casa.', 15.00, 'imagenes/chaufa.jpeg', 'platos'),
(2, 'Chijaukay', 'Pollo frito crujiente bañado en nuestra especial salsa de soya y ostión.', 22.00, 'imagenes/chijaukai2.jpeg', 'platos'),
(3, 'Kamlu Wantan', 'Deliciosos wantanes fritos con pollo, chancho y verduras en salsa tamarindo.', 24.00, 'imagenes/kamluwantan.png', 'platos'),
(4, 'Wantanes Especiales', 'Deliciosos wantanes fritos rellenos de pollo y chancho con salsa especial', 8.00, 'imagenes/wantanfrito.jpeg', 'promociones'),
(5, 'Combo Chaufa Familiar', '2 Arroces Chaufa + 1 Gaseosa 1.5L + 1 Porción de Wantanes', 45.00, 'imagenes/promochaufa.png', 'combos'),
(6, 'Combo Aeropuerto', '1 Aeropuerto + 1 Gaseosa Personal + 1 Porción de Siu Mai', 32.00, 'imagenes/promosiumai.png', 'combos');

-- Crear un trigger para generar el código de pedido automáticamente
DELIMITER //
CREATE TRIGGER generar_codigo_pedido BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    DECLARE codigo VARCHAR(50);
    SET codigo = CONCAT('PED', DATE_FORMAT(NOW(), '%Y%m%d'), LPAD((SELECT COUNT(*) + 1 FROM pedidos WHERE DATE(fecha_pedido) = CURDATE()), 3, '0'));
    SET NEW.codigo_pedido = codigo;
END//
DELIMITER ;
