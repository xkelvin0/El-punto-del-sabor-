<?php
/**
 * Clase base Model que proporciona funcionalidades CRUD básicas
 * 
 * Esta clase abstracta sirve como base para todos los modelos de la aplicación.
 * Proporciona métodos comunes para realizar operaciones de base de datos de forma segura
 * utilizando PDO con consultas preparadas.
 * 
 * @package App\Core
 * @version 1.0.0
 */
namespace App\Core;

use PDO;
use PDOException;

abstract class Model {
    /**
     * @var PDO Instancia de la conexión a la base de datos
     */
    protected $db;
    
    /**
     * @var string Nombre de la tabla en la base de datos
     */
    protected $table;
    
    /**
     * @var string Nombre de la columna que actúa como clave primaria
     */
    protected $primaryKey = 'id';

    /**
     * Constructor de la clase Model
     * 
     * Inicializa la conexión a la base de datos al crear una nueva instancia del modelo.
     */
    public function __construct() {
        $this->connect();
    }

    /**
     * Establece la conexión con la base de datos
     * 
     * Lee la configuración de la base de datos y crea una nueva instancia de PDO.
     * 
     * @throws \Exception Si ocurre un error al conectar con la base de datos
     * @return void
     */
    protected function connect() {
        $config = require __DIR__ . '/../config/database.php';
        
        $dsn = "mysql:host={$config['host']};dbname={$config['database']};charset={$config['charset']}";
        
        try {
            $this->db = new PDO($dsn, $config['username'], $config['password'], $config['options']);
        } catch (PDOException $e) {
            throw new \Exception("Error de conexión: " . $e->getMessage());
        }
    }

    /**
     * Obtiene todos los registros de la tabla
     * 
     * @return array Un array asociativo con todos los registros de la tabla
     * @throws \PDOException Si ocurre un error en la consulta
     */
    public function all() {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table}");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    /**
     * Busca un registro por su ID
     * 
     * @param mixed $id El valor de la clave primaria del registro a buscar
     * @return array|false Retorna un array asociativo con los datos del registro o false si no se encuentra
     * @throws \PDOException Si ocurre un error en la consulta
     */
    public function find($id) {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE {$this->primaryKey} = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch();
    }

    /**
     * Crea un nuevo registro en la base de datos
     * 
     * @param array $data Array asociativo donde las claves son los nombres de las columnas
     *                   y los valores son los valores a insertar
     * @return int|false Retorna el ID del nuevo registro o false en caso de error
     * @throws \PDOException Si ocurre un error en la consulta
     */
    public function create(array $data) {
        $columns = implode(', ', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));
        
        $sql = "INSERT INTO {$this->table} ({$columns}) VALUES ({$placeholders})";
        
        $stmt = $this->db->prepare($sql);
        
        foreach ($data as $key => $value) {
            $stmt->bindValue(":{$key}", $value);
        }
        
        return $stmt->execute() ? $this->db->lastInsertId() : false;
    }

    /**
     * Actualiza un registro existente
     * 
     * @param mixed $id El valor de la clave primaria del registro a actualizar
     * @param array $data Array asociativo con las columnas a actualizar y sus nuevos valores
     * @return bool true si la actualización fue exitosa, false en caso contrario
     * @throws \PDOException Si ocurre un error en la consulta
     */
    public function update($id, array $data) {
        $set = [];
        foreach ($data as $key => $value) {
            $set[] = "{$key} = :{$key}";
        }
        $set = implode(', ', $set);
        
        $sql = "UPDATE {$this->table} SET {$set} WHERE {$this->primaryKey} = :id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);
        
        foreach ($data as $key => $value) {
            $stmt->bindValue(":{$key}", $value);
        }
        
        return $stmt->execute();
    }

    /**
     * Elimina un registro de la base de datos
     * 
     * @param mixed $id El valor de la clave primaria del registro a eliminar
     * @return bool true si la eliminación fue exitosa, false en caso contrario
     * @throws \PDOException Si ocurre un error en la consulta
     */
    public function delete($id) {
        $sql = "DELETE FROM {$this->table} WHERE {$this->primaryKey} = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);
        return $stmt->execute();
    }

    /**
     * Ejecuta una consulta SQL personalizada
     * 
     * @param string $sql La consulta SQL a ejecutar
     * @param array $params Parámetros para la consulta preparada
     * @return \PDOStatement El objeto PDOStatement resultante
     * @throws \PDOException Si ocurre un error en la consulta
     */
    public function query($sql, $params = []) {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
}
