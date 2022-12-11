<?php

require_once "ClsConexion.php";

class MateriaModelo extends  PDODB
{
    protected $id;
    protected $codigo;
    protected $nombre;
    protected $duracionHoras;

    protected static function guardarMateriaModelo(MateriaModelo $materia)
    {
        $con = new PDODB();
        $sql = "INSERT INTO materias (codigo, nombre, duracion_horas) 
                values (:codigo,:nombre,:duracion_horas)";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':codigo', $materia->codigo);
        $res->bindParam(':nombre', $materia->nombre);
        $res->bindParam(':duracion_horas', $materia->duracionHoras);
        $res->execute();
        return $res;
    }

    protected static function listarMateriasModelo()
    {
        $con = new PDODB();
        $sql = "SELECT * FROM materias";
        $res = $con->connect()->prepare($sql);
        $res->execute();
        return $res;
    }

    protected static function editarMateriaModelo($codigoMateria)
    {
        $con = new PDODB();
        $sql = "SELECT * FROM materias WHERE id= :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':id', $codigoMateria);
        $res->execute();
        $data = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)){
            array_push($data, $row);
        }
        return $data;
    }

    protected static function actualizarMateriaModelo(MateriaModelo $materia)
    {
        $con = new PDODB();
        $sql = "UPDATE materias SET codigo = :codigo,nombre = :nombre, duracion_horas = :duracion_horas WHERE id = :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':codigo', $materia->codigo);
        $res->bindParam(':nombre', $materia->nombre);
        $res->bindParam(':duracion_horas', $materia->duracionHoras);
        $res->bindParam(':id', $materia->id);
        $res->execute();
        return $res;
    }

    protected static function eliminarMateriaModelo($materia)
    {
        try{
            $con = new PDODB();
            $sql = "DELETE FROM materias WHERE id= :id";
            $res = $con->connect()->prepare($sql);
            $res->bindParam(':id', $materia);
            $res->execute();
            return $res;
        }catch(Exception $e){
            $e->getMessage();
            return false;
        }
    }
}