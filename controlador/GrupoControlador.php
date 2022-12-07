<?php
require_once "../modelo/GrupoModelo.php";

class GrupoControlador extends GrupoModelo
{
    public $id;
    public $codigo;
    public $numeroGrupo;
    public $cantidadEstudiantes;

    public function guardarGrupoControlador(GrupoControlador $datos)
    {
        return GrupoModelo::guardarGrupoModelo($datos);
    }

    public function listarGrupoControlador()
    {
        return GrupoModelo::listarGruposModelo();
    }

    public function editarGrupoControlador($id)
    {
        return GrupoModelo::editarGrupoModelo($id);
    }

    public function actualizarGrupoControlador(GrupoControlador $datos)
    {
        return GrupoModelo::actualizarGrupoModelo($datos);
    }

    public function eliminarGrupoControlador($id)
    {
        return GrupoModelo::eliminarGrupoModelo($id);
    }
}