<?php
require_once "../modelo/MateriaModelo.php";

class MateriaControlador extends MateriaModelo
{
    public $id;
    public $codigo;
    public $nombre;
    public $duracionHoras;

    public function guardarMateriaControlador(MateriaControlador $datos)
    {
        return MateriaModelo::guardarMateriaModelo($datos);
    }
    public function listarMateriaControlador()
    {
        return MateriaModelo::listarMateriasModelo();
    }

    public function editarMateriaControlador($id)
    {
        return MateriaModelo::editarMateriaModelo($id);
    }

    public function actualizarMateriaControlador(MateriaControlador $datos)
    {
        return MateriaModelo::actualizarMateriaModelo($datos);
    }

    public function eliminarMateriaControlador($id)
    {
        return MateriaModelo::eliminarMateriaModelo($id);
    }
}