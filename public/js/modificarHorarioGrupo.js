$(document).ready(function() {
	
     $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
     }, "Value must not equal arg.");

	//reglas
	var reglas = {
		dia:{required:true,valueNotEquals: 'default' },
        hora_inicio:{required:true},
		hora_final:{required:true},
		grupo:{required:true,valueNotEquals: 'default' },
        asignatura:{required:true,valueNotEquals: 'default' },
        aula:{required:true,valueNotEquals: 'default' },
	};
	//mensajes
	var mensajes = {
		dia:{required:" Requerido",valueNotEquals: "elige el dia" },
        hora_inicio:{required:" Requerido"},
		hora_final:{required:" Requerido"},
		grupo:{required:" Requerido",valueNotEquals: "elige el grupo" },
        asignatura:{required:" Requerido",valueNotEquals: "elige la asignatura" },
        aula:{required:" Requerido",valueNotEquals: "elige el aula" },
	};

	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarHorarioGrupos();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarHorarioGrupos();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarHorarioGrupoId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/updateHorarioGrupo' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "id_horario_grupo: <input type='text' id='id_horario_grupo' name='id_horario_grupo' class='form-control' value='"+result[0].id_horario_grupo+"'readonly>";
    		formulario += "Dia<select name='dia'>";
    		formulario += "<option value='default'>Elige el dia</option>";
				if (result[0].dia_semana == 'Lunes'){
                    formulario += "<option value='Lunes' selected>Lunes</option>";   
                } else {
                    formulario += "<option value='Lunes'>Lunes</option>";   
                            }
                if (result[0].dia_semana == 'Martes'){
                	formulario += "<option value='Martes' selected>Martes</option>";   
                } else {
                    formulario += "<option value='Martes'>Martes</option>";   
                }
                if (result[0].dia_semana == 'Miercoles'){
                    formulario += "<option value='Miercoles' selected>Miercoles</option>";   
                } else {
                    formulario += "<option value='Miercoles'>Miercoles</option>";   
                }
                if (result[0].dia_semana == 'Jueves'){
                    formulario += "<option value='Jueves' selected>Jueves</option>";   
                } else {
                    formulario += "<option value='Jueves'>Jueves</option>";   
                }
                if (result[0].dia_semana == 'Viernes'){
                    formulario += "<option value='Viernes' selected>Viernes</option>";   
                } else {
                    formulario += "<option value='Viernes'>Viernes</option>";   
                }
            formulario += "</select></br>";
            formulario += "Hora Inicio<input id='hora_inicio' type='time' name='hora_inicio' value='"+result[0].hora_inicio+"'/></br>";
            formulario += "Hora Final<input id='hora_final' type='time' name='hora_final' value='"+result[0].hora_final+"'/></br>";
			mostrarTodosLosGruposIdNombre(result[0].id_grupo);
			formulario += "Grupos: <div id='grupos'>";
    		formulario += "</div>";
			buscarTodasLasAsignaturas(result[0].id_asignatura);
			formulario += "Asignatura: <div id='asignaturas'>";
    		formulario += "</div>";            
			mostrarTodasLasAulasIdNumero(result[0].id_aula);
			formulario += "Aula: <div id='aulas'>";
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

		function mostrarTodasLasAulasIdNumero (id_aula) {
			var result = id_aula;
		$.ajax({
			url: '/configAula/mostrarTodosLasAulasIdNumero',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp+= "<select name='aula'>";
    			resp += "<option value='default'>Elige el aula</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_aula == result){
						resp += "<option value="+data[i].id_aula+" selected>"+data[i].numero+"</option>";
					} else {
						resp += "<option value="+data[i].id_aula+">"+data[i].numero+"</option>";
					}
				};
				resp += "</select>";
				$('#aulas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas

		function buscarTodasLasAsignaturas (id_asignatura) {//FALTA EL POST
			var result = id_asignatura;
		$.ajax({
			url: '/configAsignatura/buscarTodasLasAsignaturas',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp+= "<select name='asignatura'>";
    			resp += "<option value='default'>Elige la asignatura</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_asignatura == result){
						resp += "<option value="+data[i].id_asignatura+" selected>"+data[i].nombre+"</option>";
					} else {
						resp += "<option value="+data[i].id_asignatura+">"+data[i].nombre+"</option>";
					}
				};
				resp += "</select>";
				$('#asignaturas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas
	
		function mostrarTodosLosGruposIdNombre (id_grupo) {
			var result = id_grupo;
		$.ajax({
			url: '/configGrupo/mostrarTodosLosGruposIdNombre',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp+= "<select name='grupo'>";
    			resp += "<option value='default'>Elige el grupo</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_grupo == result){
						resp += "<option value="+data[i].id_grupo+" selected>"+data[i].nombre_grupo+"</option>";
					} else {
						resp += "<option value="+data[i].id_grupo+">"+data[i].nombre_grupo+"</option>";
					}
				};
				resp += "</select>";
				$('#grupos').html(resp);
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
	            console.log(data);
	            $.ajax({
	                url: '/configHorarioGrupo/updateHorarioGrupo',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data)
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
	function buscarHorarioGrupos () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configHorarioGrupo/buscarHorarioGrupoNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_horario_grupo+"'>"+data[i].dia_semana+" "+data[i].hora_inicio+" "+data[i].hora_final+"</h3>";
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
	}//function buscarHorarioGrupos

	//funcion para buscar alumnos por id
	function buscarHorarioGrupoId (id) { 
		return	$.ajax({
					url: '/configHorarioGrupo/buscarHorarioGrupoPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_horario_grupo:id },
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
		console.log($('#resultado #id_horario_grupo').val());
		if(confirm("Estas seguro de borrar el horario del grupo?")) {
			$.ajax({
				url: '/configHorarioGrupo/borrarHorarioGrupo',
				type: 'post',
				dataType: 'html',
				data: {'id_horario_grupo':$('#resultado #id_horario_grupo').val()},
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