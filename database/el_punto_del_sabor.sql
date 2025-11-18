-- Base de datos para el restaurante "El Punto del Sabor"
CREATE DATABASE IF NOT EXISTS el_punto_del_sabor;
USE el_punto_del_sabor;

-- Tabla de Categorías
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(255),
    es_promocion BOOLEAN DEFAULT FALSE,
    es_2x1 BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabla de Clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT,
    distrito VARCHAR(100),
    referencia TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    codigo_pedido VARCHAR(20) UNIQUE,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'en_preparacion', 'en_camino', 'entregado', 'cancelado') DEFAULT 'pendiente',
    tipo_entrega ENUM('domicilio', 'recojo') NOT NULL,
    direccion_entrega TEXT,
    referencia TEXT,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('efectivo', 'tarjeta', 'yape', 'transferencia') NOT NULL,
    estado_pago ENUM('pendiente', 'pagado', 'reembolsado') DEFAULT 'pendiente',
    observaciones TEXT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Tabla de Detalles del Pedido
CREATE TABLE detalle_pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT,
    producto_id INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    es_promocion BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de Promociones
CREATE TABLE promociones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo ENUM('descuento', '2x1', 'combo') NOT NULL,
    valor DECIMAL(10,2),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    activa BOOLEAN DEFAULT TRUE,
    imagen VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Productos en Promoción
CREATE TABLE producto_promocion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    promocion_id INT,
    producto_id INT,
    FOREIGN KEY (promocion_id) REFERENCES promociones(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de Horarios
CREATE TABLE horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dia_semana ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo') NOT NULL,
    apertura TIME NOT NULL,
    cierre TIME NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Configuraciones
CREATE TABLE configuraciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clave VARCHAR(50) NOT NULL UNIQUE,
    valor TEXT,
    descripcion TEXT,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos iniciales
INSERT INTO categorias (nombre, descripcion) VALUES
('Entradas', 'Deliciosas entradas para comenzar tu experiencia culinaria'),
('Platos Principales', 'Nuestros platos más destacados'),
('Bebidas', 'Bebidas refrescantes y calientes'),
('Postres', 'El broche de oro para tu comida');

-- Insertar horarios por defecto
INSERT INTO horarios (dia_semana, apertura, cierre) VALUES
('lunes', '12:00:00', '22:00:00'),
('martes', '12:00:00', '22:00:00'),
('miercoles', '12:00:00', '22:00:00'),
('jueves', '12:00:00', '22:00:00'),
('viernes', '12:00:00', '23:00:00'),
('sabado', '12:00:00', '23:00:00'),
('domingo', '12:00:00', '22:00:00');

-- Insertar configuraciones básicas
INSERT INTO configuraciones (clave, valor, descripcion) VALUES
('nombre_restaurante', 'El Punto del Sabor', 'Nombre del restaurante'),
('direccion', 'Av. Principal 123, Lima', 'Dirección del local principal'),
('telefono', '+51 123 456 789', 'Teléfono de contacto'),
('email', 'contacto@elpuntodelsabor.com', 'Correo electrónico de contacto'),
('hora_cierre_pedidos', '21:30:00', 'Hora límite para recibir pedidos'),
('tiempo_entrega_promedio', '45', 'Tiempo promedio de entrega en minutos'),
('costo_envio', '5.00', 'Costo de envío estándar'),
('monto_minimo_envio', '30.00', 'Monto mínimo de compra para envío gratuito');

-- Crear trigger para generar código de pedido
DELIMITER //
CREATE TRIGGER before_insert_pedido
BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    DECLARE next_id INT;
    SET next_id = (SELECT AUTO_INCREMENT FROM information_schema.TABLES 
                  WHERE TABLE_SCHEMA = 'el_punto_del_sabor' 
                  AND TABLE_NAME = 'pedidos');
    SET NEW.codigo_pedido = CONCAT('PED-', DATE_FORMAT(NOW(), '%Y%m%d'), '-', LPAD(next_id, 5, '0'));
END//
DELIMITER ;

-- Crear usuario para la aplicación
CREATE USER 'elpunto_user'@'localhost' IDENTIFIED BY 'TuContraseñaSegura123!';
GRANT ALL PRIVILEGES ON el_punto_del_sabor.* TO 'elpunto_user'@'localhost';
FLUSH PRIVILEGES;
