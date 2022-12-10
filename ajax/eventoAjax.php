<?php
require_once '../controlador/EventoControlador.php';

$method = $_POST['method'];

$objEvento = new EventoControlador();
if(isset($_POST['id'])){
    $objEvento->id = $_POST['id'];
}

switch ($method)
{
    case 'g':
        if(!empty($_POST['grupos']) && is_array($_POST['grupos'])){
            // Bucle para almacenar y mostrar los valores de la casilla de verificación comprobación individual.
            // foreach($_POST['grupos'] as $selected){
            //     echo $selected."</br>";
            // }
            $objEvento->codigo = $_POST['codigo'];
            $objEvento->duracion = $_POST['duracion'];
            $objEvento->objetivo = $_POST['objetivo'];
            $data = array(); 
            foreach($_POST['grupos'] as $selected){
                array_push($data, $selected);
            }
            $objEvento->grupos = $data;
            $res = $objEvento->guardarEventoControlador($objEvento);
            if($res){
                echo "Guardado correctamente.";
            }
            else{
                echo "No fue guardado.";
            }
        }else{
            echo "Selecciona por lo menos un grupo.";
        }
            
    break;
    case 'l':
        $lists = $objEvento->listarEventoControlador();
        $tabla = '';
        foreach ($lists as $list){
            $tabla.= '<tr>
                            <td>'.$list['codigo'].'</td>
                            <td>'.$list['duracion'].'</td>
                            <td>'.$list['objetivo'].'</td>
                            <td>'.$list['grupos'].'</td>
                            <td>
                                <a href="#" class="btn btn-success" onclick="editarEvento('.$list['id'].')"><i class="fas fa-edit"></i></a>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" onclick="eliminarEvento('.$list['id'].')"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>';  
        }
        echo $tabla;
        break;
}