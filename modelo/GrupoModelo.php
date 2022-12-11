<?php

require_once "ClsConexion.php";

class GrupoModelo extends  PDODB
{
    protected $id;
    protected $codigo;
    protected $numeroGrupo;
    protected $cantidadEstudiantes;

    protected static function guardarGrupoModelo(GrupoModelo $grupo)
    {
        $con = new PDODB();
        $sql = "INSERT INTO grupos (codigo, numero_grupo, cantidad_estudiantes) 
                values (:codigo,:numero_grupo,:cantidad_estudiantes)";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':codigo', $grupo->codigo);
        $res->bindParam(':numero_grupo', $grupo->numeroGrupo);
        $res->bindParam(':cantidad_estudiantes', $grupo->cantidadEstudiantes);
        $res->execute();
        return $res;
    }

    protected static function listarGruposModelo()
    {
        $con = new PDODB();
        $sql = "SELECT * FROM grupos";
        $res = $con->connect()->prepare($sql);
        $res->execute();
        return $res;
    }

    protected static function editarGrupoModelo($id)
    {
        $con = new PDODB();
        $sql = "SELECT * FROM grupos WHERE id= :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':id', $id);
        $res->execute();
        $data = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)){
            array_push($data, $row);
        }
        return $data;
    }

    protected static function actualizarGrupoModelo(GrupoModelo $grupo)
    {
        $con = new PDODB();
        $sql = "UPDATE grupos SET codigo = :codigo,numero_grupo = :numero_grupo, cantidad_estudiantes = :cantidad_estudiantes WHERE id = :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':codigo', $grupo->codigo);
        $res->bindParam(':numero_grupo', $grupo->numeroGrupo);
        $res->bindParam(':cantidad_estudiantes', $grupo->cantidadEstudiantes);
        $res->bindParam(':id', $grupo->id);
        $res->execute();
        return $res;
    }

    protected static function eliminarGrupoModelo($id)
    {
        try{
            $con = new PDODB();
            $sql = "DELETE FROM grupos WHERE id= :id";
            $res = $con->connect()->prepare($sql);
            $res->bindParam(':id', $id);
            $res->execute();
            return $res;
        }catch(Exception $e){
            $e->getMessage();
            return false;
        }
    }
}