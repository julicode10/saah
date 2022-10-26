<?php
require_once "../modelo/docenteModelo.php";

class DocenteControlador extends docenteModelo
{
    public  $codDocente;
    public $documento;
    public $nombres;
    public $apellidos;
    public $correo;
    public $telefono;

    public function guardarDocenteControlador(DocenteControlador $datos)
    {

        return docenteModelo::guardarDocenteModelo($datos);
    }
    public function listarDocenteControlador()
    {
        return docenteModelo::listarDocentesModelo();
    }

    public function editarDocenteControlador($codDocente)
    {
        return docenteModelo::editarDocenteModelo($codDocente);
    }

    public function actualizarDocenteControlador(DocenteControlador $datos)
    {
        return docenteModelo::actualizarDocenteModelo($datos);
    }

    public function eliminarDocenteControlador($codDocente)
    {
        return docenteModelo::eliminarDocenteModelo($codDocente);
    }
}
