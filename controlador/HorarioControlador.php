<?php
require_once "../modelo/HorarioModelo.php";

class HorarioControlador extends HorarioModelo
{
    public $id;
    public $aula;
    public $docente;
    public $materia;
    public $grupo;
    public $hora_inicio;
    public $hora_fin;

    public function guardarHorarioControlador(HorarioControlador $datos)
    {
        return HorarioModelo::guardarHorarioModelo($datos);
    }

    public function listarHorarioControlador()
    {
        return HorarioModelo::listarHorariosModelo();
    }

    public function editarHorarioControlador($id)
    {
        return HorarioModelo::editarHorarioModelo($id);
    }

    public function actualizarHorarioControlador(HorarioControlador $datos)
    {
        return HorarioModelo::actualizarHorarioModelo($datos);
    }

    public function eliminarHorarioControlador($id)
    {
        return HorarioModelo::eliminarHorarioModelo($id);
    }
}