<?php

require_once "ClsConexion.php";

class EventoModelo extends  PDODB
{
    protected $id;
    protected $codigo;
    protected $duracion;
    protected $objetivo;
    protected $grupos;

    protected static function guardarEventoModelo(EventoModelo $evento)
    {
        $con = new PDODB();
        
        $sql = "INSERT INTO eventos (codigo, duracion, objetivo) 
        values (:codigo,:duracion,:objetivo)";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':codigo', $evento->codigo);
        $res->bindParam(':duracion', $evento->duracion);
        $res->bindParam(':objetivo', $evento->objetivo);
        if($res->execute()){
            return EventoModelo::ultimoEventoModelo();
        }
        return false;
    }

    protected static function ultimoEventoModelo()
    {
        $con = new PDODB();
        $sql = "SELECT max(id) as id FROM eventos";
        $res = $con->connect()->prepare($sql);
        $res->execute();
        return $res->fetch();
    }

    protected static function listarEventosModelo()
    {
        $con = new PDODB();
        $sql = "SELECT eventos.*, GROUP_CONCAT(grupos.codigo)  as grupos FROM eventos
        JOIN evento_grupo on evento_grupo.evento_id = eventos.id
        JOIN grupos on grupos.id = evento_grupo.grupo_id
        GROUP BY eventos.id
        ";
        $res = $con->connect()->prepare($sql);
        $res->execute();
        return $res;
    }
}
