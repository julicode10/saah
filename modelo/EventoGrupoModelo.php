<?php

require_once "ClsConexion.php";

class EventoGrupoModelo extends  PDODB
{
    protected $evento;
    protected $grupo;

    public static function guardarEventoGrupoModelo($evento, $grupo)
    {
        $con = new PDODB();
        
        $sql = "INSERT INTO evento_grupo (evento_id, grupo_id) 
        values (:evento_id,:grupo_id)";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':evento_id', $evento);
        $res->bindParam(':grupo_id', $grupo);
        $res->execute();
        return $res;
    }
    
    public static function eliminarEventoGrupoModelo($id)
    {
        try{
            $con = new PDODB();
            $sql = "DELETE FROM evento_grupo WHERE evento_id = :evento_id";
            $res = $con->connect()->prepare($sql);
            $res->bindParam(':evento_id', $id);
            $res->execute();
            return $res;
        }catch(Exception $e){
            $e->getMessage();
            return false;
        }
    }
}