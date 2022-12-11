<?php
require_once '../controlador/HorarioControlador.php';

$method = $_POST['method'];

$objHorario = new HorarioControlador();
if(isset($_POST['id'])){
    $objHorario->id = $_POST['id'];
}

switch ($method)
{
    case 'g':
            $objHorario->aula = $_POST['aula'];
            $objHorario->grupo = $_POST['grupo'];
            $objHorario->materia = $_POST['materia'];
            $objHorario->docente = $_POST['docente'];
            $objHorario->hora_inicio = $_POST['hora_inicio'];
            $objHorario->hora_fin = $_POST['hora_fin'];
            $res = $objHorario->guardarHorarioControlador($objHorario);
            if($res){
                echo "Guardado correctamente.";
            }
            else{
                echo "No fue guardado.";
            }
        break;
    case 'l':
        $lists = $objHorario->listarHorarioControlador();
        $tabla = '';
        foreach ($lists as $list){
            $tabla.= '<tr>
                            <td>'.$list['hora_inicio'].'</td>
                            <td>'.$list['hora_fin'].'</td>
                            <td>'.$list['aula'].'</td>
                            <td>'.$list['grupo'].'</td>
                            <td>'.$list['materia'].'</td>
                            <td>'.$list['docente'].'</td>
                            <td>
                                <a href="#" class="btn btn-success" onclick="editarHorario('.$list['id'].')"><i class="fas fa-edit"></i></a>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="eliminarHorario('.$list['id'].')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>';  
        }
        echo $tabla;
        break;
    case 'e':
        $res = $objHorario->editarHorarioControlador($objHorario->id);
        foreach ($res as $val){
            echo json_encode($val);
        }
        break;
    case 'a':
        $objHorario->aula = $_POST['aula'];
        $objHorario->grupo = $_POST['grupo'];
        $objHorario->materia = $_POST['materia'];
        $objHorario->docente = $_POST['docente'];
        $objHorario->hora_inicio = $_POST['hora_inicio'];
        $objHorario->hora_fin = $_POST['hora_fin'];
        $res = $objHorario->actualizarHorarioControlador($objHorario);
        if($res){
            echo "actualizado correctamente.";
        }
        else{
            echo "No fue actualizado.";
        }
        break;
    case 'd':
        $res = $objHorario->eliminarHorarioControlador($objHorario->id);
        if($res){
            echo "Eliminado correctamente.";
        }
        else{
            echo "No fue eliminado.";
        }
        break;
    default:
        echo "Acción no encontrada.";
        break;
}