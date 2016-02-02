$(document).ready(function() {
	
	$.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
    }, "Value must not equal arg.");

	//reglas
	var reglas = {
		nombre:{required:true},
		tipo:{required:true,valueNotEquals: "default" }
	};
	//mensajes
	var mensajes = {
		nombre:{required:" Requerido"},
		tipo:{required:" Requerido",valueNotEquals: "elige un tipo: FP O Bachiller" }
	};

	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarGrupos();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarGrupos();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarGrupoId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/updateGrupo' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "id_grupo: <input type='text' id='id_grupo' name='id_grupo' class='form-control' value='"+result[0].id_grupo+"'readonly>";
    		formulario += "Nombre: <input type='text' id='nombre' name='nombre' class='form-control' value='"+result[0].nombre_grupo+"'>";
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span> Nombre ya existente</span></div>";	
				if(result[0].tipo == 'FP'){
					formulario += "Tipo:<select name='tipo'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'>Bachiller</option>";
					formulario += "<option value='FP' selected>FP</option>";
					formulario += "</select>";
				} else {
					formulario += "Tipo:<select name='tipo'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'selected>Bachiller</option>";
					formulario += "<option value='FP'>FP</option>";
					formulario += "</select>";				
				}
			formulario += "</br><input type='submit' name='btnModificar' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace' href='/config/configGlobal/configGrupos' class='btn btn-primary'>Volver</a>";
    		formulario += "</form>";
    		$('#resultado').html(formulario);
		})
		.fail(function() {
    		console.log("error crear formulario");
		});
	});//Formulario modificar y borrar
	
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
	                url: '/configGrupo/updateGrupo',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data)
		                if (data.err=="existe"){
		                showAlert($('#resultado #nombre'),"error","Nombre ya existente");
		                }else if (data.dato=="ok"){
		                showAlert($('#resultado #enlace'),"ok","Grupo modificado correctamente");
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
	function buscarGrupos () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configGrupo/buscarGrupoNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_grupo+"'>"+data[i].nombre_grupo+" "+data[i].tipo+"</h3>";
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
	}//function buscarGrupos

	//funcion para buscar alumnos por id
	function buscarGrupoId (id) { 
		return	$.ajax({
					url: '/configGrupo/buscarGrupoPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_grupo:id },
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
		console.log($('#resultado #id_grupo').val());
		if(confirm("Estas seguro de borrar el grupo?")) {
			$.ajax({
				url: '/configGrupo/borrarGrupo',
				type: 'post',
				dataType: 'html',
				data: {'id_grupo':$('#resultado #id_grupo').val()},
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