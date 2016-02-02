$(document).ready(function() {
	
     $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
     }, "Value must not equal arg.");

	//reglas
	var reglas = {
		id_horario_profesor:{required:true},
        id_horario_grupo:{required:true},
		dia:{required:true},
		hora_inicio:{required:true},
        hora_final:{required:true},
        profesor:{required:true,valueNotEquals: "default" },
	};
	//mensajes
	var mensajes = {
		id_horario_profesor:{required:" Requerido"},
        id_horario_grupo:{required:" Requerido"},
		dia:{required:" Requerido"},
		hora_inicio:{required:" Requerido"},
        hora_final:{required:" Requerido"},
        profesor:{required:" Requerido",valueNotEquals: "elige el profesor" },
	};

	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarHorarioProfesores();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarHorarioProfesores();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarHorarioProfesorId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/updateHorarioGrupo' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "id_horario_profesor: <input type='text' id='id_horario_profesor' name='id_horario_profesor' class='form-control' value='"+result[0].id_horario_profesor+"'readonly>";    		
    		formulario += "id_horario_grupo: <input type='text' id='id_horario_grupo' name='id_horario_grupo' class='form-control' value='"+result[0].id_horario_grupo+"'readonly>";
			mostrarHorarioGrupo(result[0].id_horario_grupo);
			formulario += "<div id='horarioGrupo'>";
    		formulario += "</div>";
			mostrarTodosLosProfesoresIdNombreApellidos(result[0].id_profesor);
			formulario += "Profesor: <div id='profesores'>";
    		formulario += "</div>";			
			formulario += "</br><input type='submit' name='btnModificar' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace' href='/config/configGlobal/configHorario' class='btn btn-primary'>Volver</a>";
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span> Nombre ya existente</span></div>";	
    		formulario += "</form>";
    		$('#resultado').html(formulario);
		})
		.fail(function() {
    		console.log("error crear formulario");
		});
	});//Formulario modificar y borrar

		function mostrarHorarioGrupo (id_horario_grupo) {
			var id = id_horario_grupo;
		$.ajax({
			url: '/configHorarioGrupo/buscarHorarioGrupoPorId',
			type: 'post',
			dataType: 'json',
			data:{ id_horario_grupo:id },
				success:function (data) {
					var resp = "";
					resp += "<table id='horario'>";
				for (var i = 0; i < data.length; i++) {
					resp += "<tr>";
					resp += "<td>";
					resp += "Dia<input type='text' id='dia' name='dia' class='form-control' value='"+data[i].dia_semana+"'readonly></br>";
					resp += "Hora Inicio<input type='time' id='hora_inicio' name='hora_inicio' class='form-control' value='"+data[i].hora_inicio+"'readonly></br>";
					resp += "Hora Final<input type='time' id='hora_final' name='hora_final' class='form-control' value='"+data[i].hora_final+"'readonly></br>";					
					resp += "</td>";
					resp += "</tr>"
					};
					resp += "</table>";
					$('#horarioGrupo').html(resp);
				}
		})//ajax
		.done(function() {
		console.log("success");
		})//done
		.fail(function() {
		console.log("error");
		})//fail
	}//function buscarTodosLosGrupos

		//profesor.mostrarTodosLosIdNombreApellidosProfesor
		function mostrarTodosLosProfesoresIdNombreApellidos (id_profesor) {
			var result = id_profesor;
		$.ajax({
			url: '/configProfesor/mostrarTodosLosProfesoresIdNombreApellidos',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp+= "<select name='profesor'>";
    			resp += "<option value='default'>Elige el profesor</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_profesor == result){
						resp += "<option value="+data[i].id_profesor+" selected>"+data[i].nombre+"</option>";
					} else {
						resp += "<option value="+data[i].id_profesor+">"+data[i].nombre+"</option>";
					}
				};
				resp += "</select>";
				$('#profesores').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas
	
	
	$('#resultado').on("click","#btnModificar",function () {
		$("#formUpdate").validate({
	        rules:reglas,
			messages:mensajes,
			errorPlacement: function(error,element){
				element.before(error);
			},
	        submitHandler: function (form) {
	            event.preventDefault();
	            var data = $("#formUpdate").serializeArray();
	            $.ajax({
	                url: '/configHorarioProfesor/updateHorarioProfesor',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
		                if (data.err=="existe"){
		                showAlert($('#resultado #enlace'),"error","HorarioGrupo ya existente");
		                }else if (data.dato=="ok"){
		                showAlert($('#resultado #enlace'),"ok","HorarioGrupo modificado correctamente");
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
	  //$( "#target" ).submit();
	});

	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarHorarioProfesores () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configHorarioProfesor/buscarHorarioProfesorNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_horario_profesor+"'>"+data[i].dia_semana+" "+data[i].hora_inicio+" "+data[i].hora_final+"</h3>";
					resp += "</td></tr></table>";
				};
				$('#resultado').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarHorarioProfesores

	//funcion para buscar alumnos por id
	function buscarHorarioProfesorId (id) { 
		return	$.ajax({
					url: '/configHorarioProfesor/buscarHorarioProfesorPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_horario_profesor:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarProfesores
	
			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar el horario del grupo?")) {
			$.ajax({
				url: '/configHorarioProfesor/borrarHorarioProfesor',
				type: 'post',
				dataType: 'html',
				data: {'id_horario_profesor':$('#resultado #id_horario_profesor').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function() {
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario asiganura
	
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