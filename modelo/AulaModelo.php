<?php

require_once "ClsConexion.php";

class AulaModelo extends  PDODB
{
    protected $codAula;
    protected $numeroAula;
    protected $bloque;
    protected $descripcion;

    protected static function guardarAulaModelo(AulaModelo $aula)
    {
        $con = new PDODB();
        $sql = "INSERT INTO aulas (numero_aula, bloque, descripcion) 
                values (:numero_aula,:bloque,:descripcion)";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':numero_aula', $aula->numeroAula);
        $res->bindParam(':bloque', $aula->bloque);
        $res->bindParam(':descripcion', $aula->descripcion);
        $res->execute();
        return $res;
    }

    protected static function listarAulasModelo()
    {
        $con = new PDODB();
        $sql = "SELECT * FROM aulas";
        $res = $con->connect()->prepare($sql);
        $res->execute();
        return $res;
    }

    protected static function editarAulaModelo($codigoAula)
    {
        $con = new PDODB();
        $sql = "SELECT * FROM aulas WHERE id= :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':id', $codigoAula);
        $res->execute();
        $data = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)){
            array_push($data, $row);
        }
        return $data;
    }

    protected static function actualizarAulaModelo(AulaModelo $aula)
    {
        $con = new PDODB();
        $sql = "UPDATE aulas SET numero_aula = :numero_aula,bloque = :bloque, descripcion = :descripcion WHERE id = :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':numero_aula', $aula->numeroAula);
        $res->bindParam(':bloque', $aula->bloque);
        $res->bindParam(':descripcion', $aula->descripcion);
        $res->bindParam(':id', $aula->codAula);
        $res->execute();
        return $res;
    }

    protected static function eliminarAulaModelo($codigoAula)
    {
        try{
            $con = new PDODB();
            $sql = "DELETE FROM aulas WHERE id= :id";
            $res = $con->connect()->prepare($sql);
            $res->bindParam(':id', $codigoAula);
            $res->execute();
            return $res;
        }catch(Exception $e){
            $e->getMessage();
            return false;
        }
    }

    protected static function getCantidadAulasModelo()
    {
        $con = new PDODB();
        $sql = "SELECT COUNT(id) AS cantidad_de_aulas FROM aulas";
        $res = $con->connect()->prepare($sql);
        $res->execute();
        return $res->fetch(PDO::FETCH_ASSOC);
    }
}