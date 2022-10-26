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
                datatables('#table-aulas');
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

function datatables(id) {
    $(id).DataTable().destroy();
    $(id).DataTable();
};

function limpiarInputs(){
    $('#documento').val('')
    $('#nombres').val('')
    $('#apellidos').val('')
    $('#correo').val('')
    $('#telefono').val('')
}

function limpiarFRM(){
    limpiarInputs()
    document.querySelector('#btn-submit').innerHTML = 'Guardar';
    $('#btn-submit').removeAttr("onclick");
    $('#btn-submit').attr("onclick", "guardarDocente()");
}

function guardarDocente(){
    if(validaForm()){
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
                limpiarFRM()
                listarDocentes()
            },
            fail: function (request, status, error){
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarDocentes();
            }
        });
    }

}

function listarDocentes(){
    $.ajax({
        type: "POST",
        url: "../../../saah/ajax/docenteAjax.php",
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
            limpiarFRM()
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
    if(validaForm()) {
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
                limpiarFRM()
                listarDocentes()
            },
            fail: function (request, status, error) {
                toastr.error(request.responseText, 'Solicitud faillda', {timeOut: 5000, "progressBar": true})
                listarDocentes()
            }
        });
    }
}
function validaForm(){
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