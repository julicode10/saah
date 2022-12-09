<?php
require_once '../controlador/GrupoControlador.php';

$method = $_POST['method'];

$objGrupo = new GrupoControlador();
if(isset($_POST['id'])){
    $objGrupo->id = $_POST['id'];
}

switch ($method)
{
    case 'g':
            $objGrupo->codigo = $_POST['codigo'];
            $objGrupo->numeroGrupo = $_POST['numero_grupo'];
            $objGrupo->cantidadEstudiantes = $_POST['cantidad_estudiantes'];
            $res = $objGrupo->guardarGrupoControlador($objGrupo);
            if($res){
                echo "Guardado correctamente.";
            }
            else{
                echo "No fue guardado.";
            }
        break;
    case 'l':
        $lists = $objGrupo->listarGrupoControlador();
        $tabla = '';
        foreach ($lists as $list){
            $tabla.= '<tr>
                            <td>'.$list['codigo'].'</td>
                            <td>'.$list['numero_grupo'].'</td>
                            <td>'.$list['cantidad_estudiantes'].'</td>
                            <td>
                                <a href="#" class="btn btn-success" onclick="editarGrupo('.$list['id'].')"><i class="fas fa-edit"></i></a>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="eliminarGrupo('.$list['id'].')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>';  
        }
        echo $tabla;
        break;
    case 'e':
        $res = $objGrupo->editarGrupoControlador($objGrupo->id);
        foreach ($res as $val){
            echo json_encode($val);
        }
        break;
    case 'a':
        $objGrupo->codigo = $_POST['codigo'];
        $objGrupo->numeroGrupo = $_POST['numero_grupo'];
        $objGrupo->cantidadEstudiantes = $_POST['cantidad_estudiantes'];
        $res = $objGrupo->actualizarGrupoControlador($objGrupo);
        if($res){
            echo "actualizado correctamente.";
        }
        else{
            echo "No fue actualizado.";
        }
        break;
    case 'd':
        $res = $objGrupo->eliminarGrupoControlador($objGrupo->id);
        if($res){
            echo "Eliminado correctamente.";
        }
        else{
            echo "No fue eliminado.";
        }
        break;
    case 'i': //select items
        $lists = $objGrupo->listarGrupoControlador();
        $items = '';
        foreach ($lists as $list){
            $items.= '<div class="form-check">
                        <input class="form-check-input" name="grupos[]" id="grupos" type="checkbox">
                        <label for="'.$list['codigo'].'" class="form-check-label">'.$list['codigo'] .' - '.$list['numero_grupo'] .'</label>
                    </div>';  
        }
        echo $items;
        break;
    default:
        echo "Acción no encontrada.";
        break;
}