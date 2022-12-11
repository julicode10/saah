document.addEventListener('DOMContentLoaded', function() {
    ch('vista/started.html');
});

function ch(urlHijo) {
    $.ajax({
        type: "POST",
        url: urlHijo,
        data:{},
        success: function(datosP){
            $('#qa').html(datosP);
            if(urlHijo === "vista/adminAula.html"){
                //datatables('#table-aulas');
            }
            if(urlHijo === "vista/adminGrupo.html"){
                //datatables('#table-grupos');
            }
            if(urlHijo === "vista/adminDocente.html"){
                //datatables('#table-docentes');
            }
            if(urlHijo === "vista/adminMateria.html"){
                //datatables('#table-materias');
            }
            if(urlHijo === "vista/adminEvento.html"){
                //datatables('#table-eventos');
            }
        }
    });
}

/*funciones comunes */
function datatables(id) {
    $(id).DataTable().destroy();
    $(id).DataTable();
};

function limpiarInputs(values){
    if (values.length !== 0){
        values.forEach(function(val) {
            $(`#${val}`).val('')
        })
    } 
}   

function limpiarFRM(button, inputs, event){
    limpiarInputs(inputs)
    document.querySelector(`#${button}`).innerHTML = 'Guardar';
    $(`#${button}`).removeAttr("onclick");
    $(`#${button}`).attr("onclick", event);
}

function listarRecurso(url){
    if(url != null || url != undefined){
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "method": "l"
            },
            success: function (resp){
                $('tbody').text('');
                $('tbody').html(resp);
            },
            fail: function (request, status, error){
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
            }
        });
    }
}

function listarOpcionesSelect(url, select , optionDefaul){
    if((url != null || url != undefined) && (select != null || select != undefined)){
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "method": "s"
            },
            success: function (resp){
                $(`${select}`).empty();
                if(resp.length > 0){
                    
                    $(`${select}`).append(`<option value="">${optionDefaul}</option>`);
                    $(`${select}`).append(resp);
                }else{
                    $(`${select}`).append(`<option value="">${optionDefaul}</option>`);
                    $(`${select}`).append(`<option value="">No se encontraron resultados</option>`);
                }
                
            },
            fail: function (request, status, error){
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
            }
        });
    }
    
}

/** funciones para docentes */

function guardarDocente(){ 
    if(validarFormDocente()){
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/docenteAjax.php",
            data: {
                "documento": $('#documento').val(),
                "nombres": $('#nombres').val(),
                "apellidos": $('#apellidos').val(),
                "correo": $('#correo').val(),
                "telefono": $('#telefono').val(),
                "method": "g"
            },
            success: function (resp){
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMDocente()
                listarDocentes()
            },
            fail: function (request, status, error){
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarDocentes();
            }
        });
    }

}

function limpiarFRMDocente(){
    limpiarFRM('btn-submit', [
        'documento', 'nombres', 'apellidos', 'correo', 'telefono'
    ],'guardarDocente()')
    listarDocentes()
}

function listarDocentes(){
    listarRecurso("../../../saah/ajax/docenteAjax.php");
}

function eliminarDocente(id){
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/docenteAjax.php",
        data: {
            "codDocente": id,
            "method": "d"
        },
        success: function (resp){
            toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
            limpiarFRMDocente()
            listarDocentes()
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
            listarDocentes()
        }
    });
}

function editarDocente(id){
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/docenteAjax.php",
        data: {
            "codDocente": id,
            "method": "e"
        },
        success: function (resp){
            let docente = JSON.parse(resp);
            document.querySelector('#btn-submit').innerHTML = 'Actualizar';
            $('#btn-submit').removeAttr("onclick");
            $('#btn-submit').attr("onclick", "actualizarDocente(" + docente.id+")");
            $('#documento').val(docente.documento)
            $('#nombres').val(docente.nombres)
            $('#apellidos').val(docente.apellidos)
            $('#correo').val(docente.correo)
            $('#telefono').val(docente.telefono)
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
        }
    });
}

function actualizarDocente(id){
    if(validarFormDocente()) {
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/docenteAjax.php",
            data: {
                "documento": $('#documento').val(),
                "nombres": $('#nombres').val(),
                "apellidos": $('#apellidos').val(),
                "correo": $('#correo').val(),
                "telefono": $('#telefono').val(),
                "codDocente": id,
                "method": "a"
            },
            success: function (resp) {
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMDocente()
                listarDocentes()
            },
            fail: function (request, status, error) {
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarDocentes()
            }
        });
    }
}
function validarFormDocente(){
    if($("#documento").val() == ""){
        toastr.warning("El campo documento no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#documento").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#nombres").val() == ""){
        toastr.warning("El campo nombres no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#nombres").focus();
        return false;
    }
    if($("#apellidos").val() == ""){
        toastr.warning("El campo apellido no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#apellidos").focus();
        return false;
    }

    if($("#correo").val() == ""){
        toastr.warning("El campo Correo no puede estar vacío.", {timeOut: 5000, "progressBar": true})
        $("#correo").focus();
        return false;
    }
    let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if(!validEmail.test($("#correo").val())){
        toastr.warning("El campo correo debe tener formato de @dominio", {timeOut: 5000, "progressBar": true})
        $("#correo").focus();
        return false;
    }
    if($("#telefono").val() == ""){
        toastr.warning("El campo telefono no puede estar vacío.", {timeOut: 5000, "progressBar": true})
        $("#telefono").focus();
        return false;
    }
    return true; // Si todo está correcto
}

/** funciones para aulas */

function validarFormAula(){
    if($("#numero_aula").val() == ""){
        toastr.warning("El número de aula no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#numero_aula").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#bloque").val() == ""){
        toastr.warning("El campo bloque no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#bloque").focus();
        return false;
    }
    return true;
}

function limpiarFRMAula(){
    limpiarFRM('btn-submit', [
        'numero_aula', 'bloque', 'descripcion'
    ],'guardarAula()')
    listarAulas()
}

function guardarAula(){ 
    if(validarFormAula()){
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/aulaAjax.php",
            data: {
                "numero_aula": $('#numero_aula').val(),
                "bloque": $('#bloque').val(),
                "descripcion": $('#descripcion').val(),
                "method": "g"
            },
            success: function (resp){
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMAula()
                listarAulas()
            },
            fail: function (request, status, error){
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarAulas();
            }
        });
    }
}

function listarAulas(){
    listarRecurso("../../../saah/ajax/aulaAjax.php");
}

function editarAula(id){
    
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/aulaAjax.php",
        data: {
            "codAula": id,
            "method": "e"
        },
        success: function (resp){
            let aula = JSON.parse(resp);
            document.querySelector('#btn-submit').innerHTML = 'Actualizar';
            $('#btn-submit').removeAttr("onclick");
            $('#btn-submit').attr("onclick", "actualizarAula(" + aula.id+")");
            $('#numero_aula').val(aula.numero_aula)
            
            $("#bloque option[value="+ aula.bloque +"]").attr("selected",true);
            $('#bloque').val(aula.bloque)
            $('#descripcion').val(aula.descripcion)
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
        }
    });
}

function actualizarAula(id){
    if(validarFormAula()) {
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/aulaAjax.php",
            data: {
                "numero_aula": $('#numero_aula').val(),
                "bloque": $('#bloque').val(),
                "descripcion": $('#descripcion').val(),
                "codAula": id,
                "method": "a"
            },
            success: function (resp) {
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMAula()
                listarAulas()
            },
            fail: function (request, status, error) {
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarAulas()
            }
        });
    }
}

function eliminarAula(id){
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/aulaAjax.php",
        data: {
            "codAula": id,
            "method": "d"
        },
        success: function (resp){
            toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
            limpiarFRMAula()
            listarAulas()
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
            listarAulas()
        }
    });
}

/** funciones para grupos */
function validarFormGrupo(){
    if($("#codigo").val() == ""){
        toastr.warning("El código no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#codigo").focus(); 
        return false;
    }
    if($("#numero_grupo").val() == ""){
        toastr.warning("El campo número grupo no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#numero_grupo").focus();
        return false;
    }
    if($("#cantidad_estudiantes").val() == ""){
        toastr.warning("El campo cantidad de estudiantes no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#cantidad_estudiantes").focus();
        return false;
    }
    return true;
}

function limpiarFRMGrupo(){
    limpiarFRM('btn-submit', [
        'codigo', 'numero_grupo', 'cantidad_estudiantes'
    ],'guardarGrupo()')
    listarGrupos()
}

function guardarGrupo(){ 
    if(validarFormGrupo()){
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/grupoAjax.php",
            data: {
                "codigo": $('#codigo').val(),
                "numero_grupo": $('#numero_grupo').val(),
                "cantidad_estudiantes": $('#cantidad_estudiantes').val(),
                "method": "g"
            },
            success: function (resp){
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMGrupo()
                listarGrupos()
            },
            fail: function (request, status, error){
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarGrupos();
            }
        });
    }
}

function listarGrupos(){
    listarRecurso("../../../saah/ajax/grupoAjax.php");
}

function editarGrupo(id){
    
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/grupoAjax.php",
        data: {
            "id": id,
            "method": "e"
        },
        success: function (resp){
            let grupo = JSON.parse(resp);
            document.querySelector('#btn-submit').innerHTML = 'Actualizar';
            $('#btn-submit').removeAttr("onclick");
            $('#btn-submit').attr("onclick", "actualizarGrupo(" + grupo.id+")");
            $('#codigo').val(grupo.codigo)
            $('#numero_grupo').val(grupo.numero_grupo)
            $('#cantidad_estudiantes').val(grupo.cantidad_estudiantes)
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
        }
    });
}

function actualizarGrupo(id){
    if(validarFormGrupo()) {
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/grupoAjax.php",
            data: {
                "codigo": $('#codigo').val(),
                "numero_grupo": $('#numero_grupo').val(),
                "cantidad_estudiantes": $('#cantidad_estudiantes').val(),
                "id": id,
                "method": "a"
            },
            success: function (resp) {
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMGrupo()
                listarGrupos()
            },
            fail: function (request, status, error) {
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarGrupos()
            }
        });
    }
}

function eliminarGrupo(id){
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/grupoAjax.php",
        data: {
            "id": id,
            "method": "d"
        },
        success: function (resp){
            toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
            limpiarFRMGrupo()
            listarGrupos()
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
            listarGrupos()
        }
    });
}



/** funciones para materias */
function validarFormMateria(){
    if($("#codigo").val() == ""){
        toastr.warning("El código de materia no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#codigo").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#nombre").val() == ""){
        toastr.warning("El campo nombre no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#nombre").focus();
        return false;
    }
    if($("#duracion_horas").val() == ""){
        toastr.warning("El campo duracion horas no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#duracion_horas").focus();
        return false;
    }
    return true;
}

function limpiarFRMMateria(){
    limpiarFRM('btn-submit', [
        'codigo', 'nombre', 'duracion_horas'
    ],'guardarMateria()')
    listarMaterias()
}

function guardarMateria(){ 
    if(validarFormMateria()){
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/materiaAjax.php",
            data: {
                "codigo": $('#codigo').val(),
                "nombre": $('#nombre').val(),
                "duracion_horas": $('#duracion_horas').val(),
                "method": "g"
            },
            success: function (resp){
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMMateria()
                listarMaterias()
            },
            fail: function (request, status, error){
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarMaterias();
            }
        });
    }
}

function listarMaterias(){
    listarRecurso("../../../saah/ajax/materiaAjax.php");
}

function editarMateria(id){
    
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/materiaAjax.php",
        data: {
            "id": id,
            "method": "e"
        },
        success: function (resp){
            let materia = JSON.parse(resp);
            document.querySelector('#btn-submit').innerHTML = 'Actualizar';
            $('#btn-submit').removeAttr("onclick");
            $('#btn-submit').attr("onclick", "actualizarMateria(" + materia.id+")");
            $('#codigo').val(materia.codigo)
            $('#nombre').val(materia.nombre)
            $('#duracion_horas').val(materia.duracion_horas)
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
        }
    });
}

function actualizarMateria(id){
    if(validarFormMateria()) {
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/materiaAjax.php",
            data: {
                "codigo": $('#codigo').val(),
                "nombre": $('#nombre').val(),
                "duracion_horas": $('#duracion_horas').val(),
                "id": id,
                "method": "a"
            },
            success: function (resp) {
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMMateria()
                listarMaterias()
            },
            fail: function (request, status, error) {
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarMaterias()
            }
        });
    }
}

function eliminarMateria(id){
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/materiaAjax.php",
        data: {
            "id": id,
            "method": "d"
        },
        success: function (resp){
            toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
            limpiarFRMMateria()
            listarMaterias()
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
            listarMaterias()
        }
    });
}

/** funciones para horario */

function listarSelectAulas(){
    listarOpcionesSelect("../../../saah/ajax/aulaAjax.php","#aula", "Seleccione el aula");    
}

function listadoSelectGrupos(){
    listarOpcionesSelect("../../../saah/ajax/grupoAjax.php", "#grupo", "Seleccione el grupo");
}

function listarSelectMaterias(){
    listarOpcionesSelect("../../../saah/ajax/materiaAjax.php", "#materia", "Seleccione la materia");
}

function listarSelectDocentes(){
    listarOpcionesSelect("../../../saah/ajax/docenteAjax.php", "#docente", "Seleccione el docente");
}

function validarFormHorario(){
    if($("#aula").val() == ""){
        toastr.warning("El campo aula no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#aula").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#grupo").val() == ""){
        toastr.warning("El campo grupo no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#grupo").focus();
        return false;
    }
    if($("#materia").val() == ""){
        toastr.warning("El campo materia no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#materia").focus();
        return false;
    }
    if($("#docente").val() == ""){
        toastr.warning("El campo docente no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#docente").focus();
        return false;
    }
    if($("#hora_inicio").val() == ""){
        toastr.warning("El campo hora inicio no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#hora_inicio").focus();
        return false;
    }
    if($("#hora_fin").val() == ""){
        toastr.warning("El campo hora fin no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#hora_fin").focus();
        return false;
    }
    return true;
}

function limpiarFRMHorario(){
    limpiarFRM('btn-submit', [
        'aula', 'grupo', 'materia','docente', 'hora_inicio', 'hora_fin'
    ],'guardarHorario()')
    listarHorarios()
}

function guardarHorario(){ 
    if(validarFormHorario()){
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/horarioAjax.php",
            data: {
                "aula": $('#aula').val(),
                "grupo": $('#grupo').val(),
                "materia": $('#materia').val(),
                "docente": $('#docente').val(),
                "hora_inicio": $('#hora_inicio').val(),
                "hora_fin": $('#hora_fin').val(),
                "method": "g"
            },
            success: function (resp){
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMHorario()
                listarHorarios()
            },
            fail: function (request, status, error){
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarHorarios();
            }
        });
    }
}

function listarHorarios(){
    listarRecurso("../../../saah/ajax/horarioAjax.php");
}

function editarHorario(id){
    
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/horarioAjax.php",
        data: {
            "id": id,
            "method": "e"
        },
        success: function (resp){
            if(resp != null || resp != undefined){
                let horario = JSON.parse(resp);
                document.querySelector('#btn-submit').innerHTML = 'Actualizar';
                $('#btn-submit').removeAttr("onclick");
                $('#btn-submit').attr("onclick", "actualizarHorario(" + horario.id+")");
                $("#aula option[value="+ horario.aula_id +"]").attr("selected",true);
                $("#docente option[value="+ horario.docente_id +"]").attr("selected",true);
                $("#materia option[value="+ horario.materia_id +"]").attr("selected",true);
                $("#grupo option[value="+ horario.grupo_id +"]").attr("selected",true);
                $('#hora_inicio').val(horario.hora_inicio)
                $('#hora_fin').val(horario.hora_fin)
            }
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
        }
    });
}

function actualizarHorario(id){
    if(validarFormHorario()) {
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/horarioAjax.php",
            data: {
                "aula": $('#aula').val(),
                "docente": $('#docente').val(),
                "materia": $('#materia').val(),
                "grupo": $('#grupo').val(),
                "hora_inicio": $('#hora_inicio').val(),
                "hora_fin": $('#hora_fin').val(),
                "id": id,
                "method": "a"
            },
            success: function (resp) {
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMHorario()
                listarHorarios()
            },
            fail: function (request, status, error) {
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarHorarios()
            }
        });
    }
}

function eliminarHorario(id){
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/horarioAjax.php",
        data: {
            "id": id,
            "method": "d"
        },
        success: function (resp){
            toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
            limpiarFRMHorario()
            listarHorarios()
        },
        fail: function (request, status, error){
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
            listarHorarios()
        }
    });
}


/** funciones para evento */

function listarSelectGrupos(){
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/grupoAjax.php",
        data: {
            "method": "i"
        },
        success: function (resp){
            $('.section-form-grupos').text('');
            $('.section-form-grupos').html(resp);
        },
        fail: function (request, status, error){
            $('.section-form-grupos').text('');
            $('.section-form-grupos').html('No se encontraron grupos');
            toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
        }
    });
}

function validarFormEvento(){
    if($("#codigo").val() == ""){
        toastr.warning("El código del evento no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#codigo").focus();       // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if($("#duracion").val() == ""){
        toastr.warning("El campo duración no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#duracion").focus();
        return false;
    }
    if($("#objetivo").val() == ""){
        toastr.warning("El campo objetivo horas no puede estar vacío.", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#objetivo").focus();
        return false;
    }
    if(
        $("input[name='grupos[]']:checked").map(function () {
            return this.value;
        }).get() == ""
    ){
        toastr.warning("debe seleccionar por lo menos un grupo", '¡Cuidado!', {timeOut: 5000, "progressBar": true})
        $("#objetivo").focus();
        return false;
    }
    return true;
}

function limpiarFRMEvento(){
    limpiarFRM('btn-submit', [
        'codigo', 'duracion', 'objetivo'
    ],'guardarEvento()')
    listarEventos()
}

function guardarEvento(){ 
    if(validarFormEvento()){
        $.ajax({
            type: "POST",
            url: "../../../saah/ajax/eventoAjax.php",
            data: {
                "codigo": $('#codigo').val(),
                "duracion": $('#duracion').val(),
                "objetivo": $('#objetivo').val(),
                "grupos": $("input[name='grupos[]']:checked").map(function () {
                    return this.value;
                }).get(),
                "method": "g"
            },
            success: function (resp){
                console.log(resp)
                toastr.success(resp, '¡Éxito!', {timeOut: 5000, "progressBar": true})
                limpiarFRMEvento()
                listarEventos()
            },
            fail: function (request, status, error){
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarEventos();
            }
        });
    }
}

function listarEventos(){
    listarRecurso("../../../saah/ajax/eventoAjax.php");
}


