<?php
require_once '../controlador/MateriaControlador.php';

$method = $_POST['method'];

$objMateria = new MateriaControlador();
if(isset($_POST['id'])){
    $objMateria->id = $_POST['id'];
}

switch ($method)
{
    case 'g':
            $objMateria->codigo = $_POST['codigo'];
            $objMateria->nombre = $_POST['nombre'];
            $objMateria->duracionHoras = $_POST['duracion_horas'];
            $res = $objMateria->guardarMateriaControlador($objMateria);
            if($res){
                echo "Guardado correctamente.";
            }
            else{
                echo "No fue guardado.";
            }
        break;
    case 'l':
        $lists = $objMateria->listarMateriaControlador();
        $tabla = '';
        foreach ($lists as $list){
            $tabla.= '<tr>
                            <td>'.$list['codigo'].'</td>
                            <td>'.$list['nombre'].'</td>
                            <td>'.$list['duracion_horas'].'</td>
                            <td>
                                <a href="#" class="btn btn-success" onclick="editarMateria('.$list['id'].')"><i class="fas fa-edit"></i></a>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="eliminarMateria('.$list['id'].')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>';  
        }
        echo $tabla;
        break;
    case 'e':
        $res = $objMateria->editarMateriaControlador($objMateria->id);
        foreach ($res as $val){
            echo json_encode($val);
        }
        break;
    case 'a':
        $objMateria->codigo = $_POST['codigo'];
        $objMateria->nombre = $_POST['nombre'];
        $objMateria->duracionHoras = $_POST['duracion_horas'];
        $res = $objMateria->actualizarMateriaControlador($objMateria);
        if($res){
            echo "actualizado correctamente.";
        }
        else{
            echo "No fue actualizado.";
        }
        break;
    case 'd':
        $res = $objMateria->eliminarMateriaControlador($objMateria->id);
        if($res){
            echo "Eliminado correctamente.";
        }
        else{
            echo "No fue eliminado.";
        }
        break;
    case 's':
        $lists = $objMateria->listarMateriaControlador();
        $tabla = '';
        foreach ($lists as $list){
            $tabla.= '<option  value="'.$list['id'].'">'.$list['codigo'].' - '.$list['nombre'].'</option>';  
        }
        echo $tabla;
        break;
    default:
        echo "Acción no encontrada.";
        break;
}