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
                datatables('#table-grupos');
            }
            if(urlHijo === "vista/adminDocente.html"){
                //datatables('#table-docentes');
            }
            if(urlHijo === "vista/adminMateria.html"){
                datatables('#table-materias');
            }
            if(urlHijo === "vista/adminEvento.html"){
                datatables('#table-eventos');
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
