<?php
namespace App\Models;

use App\Core\Model;

class PedidoModel extends Model {
    protected $table = 'pedidos';
    
    public function __construct() {
        parent::__construct();
    }

    public function crearPedido($datosPedido) {
        $this->db->beginTransaction();
        
        try {
            // Insertar el pedido
            $pedidoId = $this->create([
                'nombre_cliente' => $datosPedido['nombre'],
                'telefono_cliente' => $datosPedido['telefono'],
                'email' => $datosPedido['email'] ?? null,
                'metodo_pago' => $datosPedido['metodo_pago'],
                'total' => $datosPedido['total'],
                'fecha_creacion' => date('Y-m-d H:i:s')
            ]);

            // Insertar los detalles del pedido
            $detalleModel = new PedidoDetalleModel();
            foreach ($datosPedido['items'] as $item) {
                $detalleModel->crearDetalle([
                    'pedido_id' => $pedidoId,
                    'producto_nombre' => $item['nombre'],
                    'cantidad' => $item['cantidad'],
                    'precio_unitario' => $item['precio'],
                    'subtotal' => $item['cantidad'] * $item['precio']
                ]);
            }

            $this->db->commit();
            return $pedidoId;

        } catch (\Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    public function obtenerPedido($id) {
        $pedido = $this->find($id);
        if (!$pedido) {
            return null;
        }

        $detalleModel = new PedidoDetalleModel();
        $pedido['items'] = $detalleModel->obtenerPorPedido($id);
        
        return $pedido;
    }

    public function listarPedidos($filtros = []) {
        $sql = "SELECT * FROM {$this->table} WHERE 1=1";
        $params = [];
        
        if (!empty($filtros['fecha_desde'])) {
            $sql .= " AND fecha_creacion >= :fecha_desde";
            $params['fecha_desde'] = $filtros['fecha_desde'];
        }
        
        if (!empty($filtros['fecha_hasta'])) {
            $sql .= " AND fecha_creacion <= :fecha_hasta";
            $params['fecha_hasta'] = $filtros['fecha_hasta'] . ' 23:59:59';
        }
        
        $sql .= " ORDER BY fecha_creacion DESC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        
        return $stmt->fetchAll();
    }
}
