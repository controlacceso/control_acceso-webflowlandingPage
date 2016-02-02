$(document).ready(function() {
    $('#id_horario_grupo').on("change",function(event) {
         $.ajax({
            url: '/configHorarioGrupo/buscarHorarioGrupoPorId',
            type: 'post',
            dataType: 'json',
            data:{ id_horario_grupo:this.value},
            success:function (data) {
                console.log(data);
                var resp = "";
                resp += "<table id='horario_grupo'>";
                for (var i = 0; i < data.length; i++) {
                    resp += "<tr>";
                    resp += "<td>";
                    resp += "<label for='hora_inicio'>hora_inicio</label>";
                    resp += "<input id='hora_inicio' type='time' name='hora_inicio' value='"+data[i].hora_inicio+"'/>";
                    resp += "</br><label for='hora_final'>hora_final</label>";
                    resp += "<input id='hora_final' type='time' name='hora_final' value='"+data[i].hora_final+"'/>";
                    resp += "</br><label for='dia'>Dia de la semana</label>";
                    resp += "<select name='dia'>";
                        resp += "<option value='default'>Elige el dia</option>";
                            if (data[i].dia_semana == 'Lunes'){
                              resp += "<option value='Lunes' selected>Lunes</option>";   
                            } else {
                              resp += "<option value='Lunes'>Lunes</option>";   
                            }
                            if (data[i].dia_semana == 'Martes'){
                              resp += "<option value='Martes' selected>Martes</option>";   
                            } else {
                              resp += "<option value='Martes'>Martes</option>";   
                            }
                            if (data[i].dia_semana == 'Miercoles'){
                              resp += "<option value='Miercoles' selected>Miercoles</option>";   
                            } else {
                              resp += "<option value='Miercoles'>Miercoles</option>";   
                            }
                            if (data[i].dia_semana == 'Jueves'){
                              resp += "<option value='Jueves' selected>Jueves</option>";   
                            } else {
                              resp += "<option value='Jueves'>Jueves</option>";   
                            }
                            if (data[i].dia_semana == 'Viernes'){
                              resp += "<option value='Viernes' selected>Viernes</option>";   
                            } else {
                              resp += "<option value='Viernes'>Viernes</option>";   
                            }
                    resp += "</select>";
                    resp += "</td>";
                    resp += "</tr>"
                };
                resp += "</table>";
                $('#horarioGrupoHorarioProfesor').html(resp);
            }
        })//ajax
        .done(function() {
            console.log("success");
        })//done
        .fail(function() {
            console.log("error");
        })//fail
    });//function buscarAsignaturas

$.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
     }, "Value must not equal arg.");

    //reglas
    var reglas = {
        id_horario_grupo:{required:true,valueNotEquals: "default" },
        id_profesor:{required:true,valueNotEquals: "default"},
        hora_inicio:{required:true},
        hora_final:{required:true},
        dia:{required:true,valueNotEquals: "default" },
    };
    //mensajes
    var mensajes = {
        id_horario_grupo:{required:" Requerido",valueNotEquals: "elige el horario_grupo" },
        id_profesor:{required:" Requerido",valueNotEquals: "elige el profesor"},
        hora_inicio:{required:" Requerido"},
        hora_final:{required:" Requerido" },
        dia:{required:" Requerido",valueNotEquals: "elige el dia" },
    };

    //Validate
    $("#agregarHorarioProfesorForm").validate({
        rules:reglas,
        messages:mensajes,
        errorPlacement: function(error,element){
            element.before(error);
        },
        submitHandler: function (form) {
            event.preventDefault();
            var data = $("#agregarHorarioProfesorForm").serializeArray();
            //console.log(data);
            $.ajax({
                url: '/configHorarioProfesor/agregarHorarioProfesor',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {

                }
            })
            .done(function(data) {
                console.log(data);
                if (data.err=="existe"){
                showAlert("#enlace","error","HorarioProfesor ya existente");
                }else if (data.dato=="ok"){
                showAlert("#enlace","ok","HorarioProfesor añadida correctamente");
                }
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            /*
            *   Form Submit Fin
            */
        }//submitHandler
    });//Validate
});//ready


function showAlert(lugar,tipo,texto) {

    if (tipo=="error"){
        $('#mensaje').attr('class','alert alert-danger fade in');
    }else {
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(500, function(){
                });
    }