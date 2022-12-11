<?php

require_once "ClsConexion.php";

class DocenteModelo extends  PDODB
{
    protected $codDocente;
    protected $documento;
    protected $nombres;
    protected $apellidos;
    protected $correo;
    protected $telefono;

    protected static function guardarDocenteModelo(DocenteModelo $docente)
    {
        $con = new PDODB();
        $sql = "INSERT INTO docentes (documento, nombres, apellidos, correo, telefono) 
                values (:documento,:nombres,:apellidos,:correo,:telefono)";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':documento', $docente->documento);
        $res->bindParam(':nombres', $docente->nombres);
        $res->bindParam(':apellidos', $docente->apellidos);
        $res->bindParam(':correo', $docente->correo);
        $res->bindParam(':telefono', $docente->telefono);
        $res->execute();
        return $res;
    }
    protected static function listarDocentesModelo()
    {
        $con = new PDODB();
        $sql = "SELECT * FROM docentes";
        $res = $con->connect()->prepare($sql);
        $res->execute();
        //$res->fetchAll();
        // $data = array();
        // while ($row = $res->fetch(PDO::FETCH_ASSOC)){
        //     array_push($data, $row);
        // }
        return $res;
    }

    protected static function editarDocenteModelo($codigoDocente)
    {
        $con = new PDODB();
        $sql = "SELECT * FROM docentes WHERE id= :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':id', $codigoDocente);
        $res->execute();
        $data = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)){
            array_push($data, $row);
        }
        return $data;
    }

    protected static function actualizarDocenteModelo(DocenteModelo $docente)
    {
        $con = new PDODB();
        $sql = "UPDATE docentes SET documento = :documento,nombres = :nombres, apellidos = :apellidos, correo = :correo,telefono = :telefono WHERE id = :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':documento', $docente->documento);
        $res->bindParam(':nombres', $docente->nombres);
        $res->bindParam(':apellidos', $docente->apellidos);
        $res->bindParam(':correo', $docente->correo);
        $res->bindParam(':telefono', $docente->telefono);
        $res->bindParam(':id', $docente->codDocente);
        $res->execute();
        return $res;
    }

    protected static function eliminarDocenteModelo($codigoDocente)
    {
        try{
            $con = new PDODB();
            $sql = "DELETE FROM docentes WHERE id= :id";
            $res = $con->connect()->prepare($sql);
            $res->bindParam(':id', $codigoDocente);
            $res->execute();
            return $res;
        }catch(Exception $e){
            $e->getMessage();
            return false;
        }
    }
}
