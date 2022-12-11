<?php

require_once "ClsConexion.php";

class HorarioModelo extends  PDODB
{
    protected $id;
    protected $aula;
    protected $docente;
    protected $materia;
    protected $grupo;
    protected $hora_inicio;
    protected $hora_fin;

    protected static function guardarHorarioModelo(HorarioModelo $horario)
    {
        $con = new PDODB();
        $sql = "INSERT INTO horarios (aula_id, docente_id, materia_id, grupo_id, hora_inicio, hora_fin) 
                values (:aula_id,:docente_id,:materia_id,:grupo_id,:hora_inicio,:hora_fin)";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':aula_id', $horario->aula);
        $res->bindParam(':docente_id', $horario->docente);
        $res->bindParam(':materia_id', $horario->materia);
        $res->bindParam(':grupo_id', $horario->grupo);
        $res->bindParam(':hora_inicio', $horario->hora_inicio);
        $res->bindParam(':hora_fin', $horario->hora_fin);
        $res->execute();
        return $res;
    }

    protected static function listarHorariosModelo()
    {
        $con = new PDODB();
        $sql = "SELECT horarios.*, concat(aulas.bloque, ' - ', aulas.numero_aula) as aula,
        concat(docentes.documento, ' - ', docentes.nombres, ' ', docentes.apellidos) as docente,
        concat(materias.codigo, ' - ', materias.nombre) as materia,
        concat(grupos.codigo, ' - ', grupos.numero_grupo) as grupo
        FROM horarios
        JOIN aulas on aulas.id = horarios.aula_id
        JOIN docentes on docentes.id = horarios.docente_id
        JOIN materias on materias.id = horarios.materia_id
        JOIN grupos on grupos.id = horarios.grupo_id";
        $res = $con->connect()->prepare($sql);
        $res->execute();
        return $res;
    }

    protected static function editarHorarioModelo($id)
    {
        $con = new PDODB();
        $sql = "SELECT * FROM horarios WHERE id= :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':id', $id);
        $res->execute();
        $data = array();
        while ($row = $res->fetch(PDO::FETCH_ASSOC)){
            array_push($data, $row);
        }
        return $data;
    }

    protected static function actualizarHorarioModelo(HorarioModelo $horario)
    {
        $con = new PDODB();
        $sql = "UPDATE horarios SET aula_id = :aula_id,
                docente_id = :docente_id, materia_id = :materia_id,
                grupo_id = :grupo_id, hora_inicio = :hora_inicio,hora_fin = :hora_fin
                WHERE id = :id";
        $res = $con->connect()->prepare($sql);
        $res->bindParam(':aula_id', $horario->aula);
        $res->bindParam(':docente_id', $horario->docente);
        $res->bindParam(':materia_id', $horario->materia);
        $res->bindParam(':grupo_id', $horario->grupo);
        $res->bindParam(':hora_inicio', $horario->hora_inicio);
        $res->bindParam(':hora_fin', $horario->hora_fin);
        $res->bindParam(':id', $horario->id);
        $res->execute();
        return $res;
    }

    protected static function eliminarHorarioModelo($id)
    {
        try{
            $con = new PDODB();
            $sql = "DELETE FROM horarios WHERE id= :id";
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