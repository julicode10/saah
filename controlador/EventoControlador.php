<?php
require_once "../modelo/EventoModelo.php";
require_once "../modelo/EventoGrupoModelo.php";

class EventoControlador extends EventoModelo
{
    public $id;
    public $codigo;
    public $duracion;
    public $objetivo;
    public $grupos;

    public function guardarEventoControlador(EventoControlador $datos)
    {
        
        $respuesta = EventoModelo::guardarEventoModelo($datos);
        foreach($respuesta as $res){
            if($res != false){
                $ultimo = $res;
                foreach($datos->grupos as $value){
                    EventoGrupoModelo::guardarEventoGrupoModelo($ultimo, $value);
                }
                return true;
            }else{
                return false;
            }
        }    
    }

    public function listarEventoControlador()
    {
        return EventoModelo::listarEventosModelo();
    }

    public function editarEventoControlador($id)
    {
        return EventoModelo::editarEventoModelo($id);
    }

    public function actualizarEventoControlador(EventoControlador $datos)
    {
        $respuesta =  EventoModelo::actualizarEventoModelo($datos);
        
        foreach($respuesta as $res){
            if($res != false){
                $ultimo = $res["id"];
                EventoGrupoModelo::eliminarEventoGrupoModelo($res["id"]);
                foreach($datos->grupos as $grupo){
                    EventoGrupoModelo::guardarEventoGrupoModelo($ultimo, $grupo);
                }
                return true;
            }else{
                return false;
            }
        }
    }

    public function eliminarEventoControlador($id)
    {
        EventoGrupoModelo::eliminarEventoGrupoModelo($id);
        return EventoGrupoModelo::eliminarEventoGrupoModelo($id);
        
    }
}