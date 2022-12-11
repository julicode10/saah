<?php
require_once '../controlador/AulaControlador.php';

$method = $_POST['method'];

$objAula = new AulaControlador();
if(isset($_POST['codAula'])){
    $objAula->codAula = $_POST['codAula'];
}

switch ($method)
{
    case 'g':
            $objAula->numeroAula = $_POST['numero_aula'];
            $objAula->bloque = $_POST['bloque'];
            $objAula->descripcion = $_POST['descripcion'];
            $res = $objAula->guardarAulaControlador($objAula);
            if($res){
                echo "Guardado correctamente.";
            }
            else{
                echo "No fue guardado.";
            }
        break;
    case 'l':
        $lists = $objAula->listarAulaControlador();
        $tabla = '';
        foreach ($lists as $list){
            $tabla.= '<tr>
                            <td>'.$list['numero_aula'].'</td>
                            <td>'.$list['bloque'].'</td>
                            <td>'.$list['descripcion'].'</td>
                            <td>
                                <a href="#" class="btn btn-success" onclick="editarAula('.$list['id'].')"><i class="fas fa-edit"></i></a>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="eliminarAula('.$list['id'].')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>';  
        }
        echo $tabla;
        break;
    case 'e':
        $res = $objAula->editarAulaControlador($objAula->codAula);
        foreach ($res as $val){
            echo json_encode($val);
        }
        break;
    case 'a':
        $objAula->numeroAula = $_POST['numero_aula'];
        $objAula->bloque = $_POST['bloque'];
        $objAula->descripcion = $_POST['descripcion'];;
        $res = $objAula->actualizarAulaControlador($objAula);
        if($res){
            echo "actualizado correctamente.";
        }
        else{
            echo "No fue actualizado.";
        }
        break;
    case 'd':
        $res = $objAula->eliminarAulaControlador($objAula->codAula);
        if($res){
            echo "Eliminado correctamente.";
        }
        else{
            echo "No fue eliminado.";
        }
        break;
    case 's':
        $lists = $objAula->listarAulaControlador();
        $tabla = '';
        foreach ($lists as $list){
            $tabla.= '<option  value="'.$list['id'].'">'.$list['bloque'].' - '.$list['numero_aula'].'</option>';  
        }
        echo $tabla;
        break;
    case 'c':
        $res = $objAula->getCantidadAulasControlador();
        foreach ($res as $val){
            echo ($val);
        }
        break;
    default:
        echo "Acción no encontrada.";
        break;
}