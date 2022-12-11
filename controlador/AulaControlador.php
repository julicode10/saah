<?php
require_once "../modelo/AulaModelo.php";

class AulaControlador extends AulaModelo
{
    public $codAula;
    public $numeroAula;
    public $bloque;
    public $descripcion;

    public function guardarAulaControlador(AulaControlador $datos)
    {
        return AulaModelo::guardarAulaModelo($datos);
    }

    public function listarAulaControlador()
    {
        return AulaModelo::listarAulasModelo();
    }

    public function editarAulaControlador($codAula)
    {
        return AulaModelo::editarAulaModelo($codAula);
    }

    public function actualizarAulaControlador(AulaControlador $datos)
    {
        return AulaModelo::actualizarAulaModelo($datos);
    }

    public function eliminarAulaControlador($codAula)
    {
        return AulaModelo::eliminarAulaModelo($codAula);
    }

    public function getCantidadAulasControlador()
    {
        return AulaModelo::getCantidadAulasModelo();
    }
}