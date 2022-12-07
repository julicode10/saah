<?php
require_once "../modelo/DocenteModelo.php";

class DocenteControlador extends DocenteModelo
{
    public  $codDocente;
    public $documento;
    public $nombres;
    public $apellidos;
    public $correo;
    public $telefono;

    public function guardarDocenteControlador(DocenteControlador $datos)
    {
        return DocenteModelo::guardarDocenteModelo($datos);
    }
    public function listarDocenteControlador()
    {
        return DocenteModelo::listarDocentesModelo();
    }

    public function editarDocenteControlador($codDocente)
    {
        return DocenteModelo::editarDocenteModelo($codDocente);
    }

    public function actualizarDocenteControlador(DocenteControlador $datos)
    {
        return DocenteModelo::actualizarDocenteModelo($datos);
    }

    public function eliminarDocenteControlador($codDocente)
    {
        return DocenteModelo::eliminarDocenteModelo($codDocente);
    }
}
