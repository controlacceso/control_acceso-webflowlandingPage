$(document).ready(function() {
	
    jQuery.validator.addMethod("fileSize", function (val, element) {
        var size = element.files[0].size;
        console.log(size);
           if (size > 102400)// checks the file more than 100 Kb
           {
                return false;
           } else {
               return true;
           }

      }, "File type error");
    
    jQuery.validator.addMethod("lettersonly", function(value, element) { 
    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	},"Please enter only letters");

    jQuery.validator.addMethod("dni", function(value, element) {
        return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
    });

    //regla correo
    jQuery.validator.addMethod("correo", function(value, element) {
        return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
    });

    jQuery.validator.addMethod("convertHash", function(value) {
        var hash = md5(value, '2063c1608d6e0baf80249c42e2be5804');
        $('#pass').val(hash);
        return hash;
    }, 'Hash');

	//reglas
	var reglas = {
		dni:{required:true,dni:true},
        nombre:{required:true,lettersonly:true},
		apellidos:{required:true,lettersonly:true},
		correo:{required:true,correo:true},
		password:{required:true,convertHash:true},
		foto:{fileSize:true},
        num_tarjeta:{required:true},
	};
	//mensajes
	var mensajes = {
		dni:{required:" Requerido",dni:"introduce un DNI correcto"},
        nombre:{required:" Requerido",lettersonly:"Please enter only letters"},
		apellidos:{required:" Requerido",lettersonly:"Please enter only letters"},
		correo:{required:" Requerido",correo:"introduce un Correo correcto"},
		password:{required:"Requerido",convertHash:"Hash"},
		foto:{fileSize:"maximo 100kb"},
        num_tarjeta:{required:" Requerido"},
	};

	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarProfesores();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarProfesores();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarProfesorPorId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/modificarProfesor' id='formUpdate' name='formUpdate'>";
    		formulario += "id_profesor: <input type='text' id='id_profesor' name='id_profesor' class='form-control' value='"+result.id_profesor+"'readonly>";
    		formulario += "dni: <input type='text' id='dni' name='dni' class='form-control' value='"+result.dni+"'>";
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span> Dni ya existente</span></div>";	    		    		
    		formulario += "Nombre: <input type='text' id='nombre' name='nombre' class='form-control' value='"+result.nombre+"'>";
    		formulario += "Apellidos: <input type='text' id='apellidos' name='apellidos' class='form-control' value='"+result.apellidos+"'>";
    		formulario += "Correo: <input type='text' id='correo' name='correo' class='form-control' value='"+result.correo+"'>";
    		console.log(result.password);
    		formulario += "Password: <input type='text' id='password' name='password' class='form-control' value='"+result.password+"'>";
    		formulario += "<input type='hidden' id='pass' name='pass' class='form-control'>";
    		formulario += "<img id='fotoProfesor' alt='fotoProfesor' src='data:img/png;base64,"+result.foto+"' width='100' height='100'/>";
    		formulario += "Foto: <input type='file' id='foto' name='foto' class='form-control'>";
    		formulario += "Tarj_act: <input type='text' id='tarjeta_activada' name='tarjeta_activada' class='form-control' value='"+result.tarjeta_activada+"'>";
    		formulario += "Numero_Tarjeta: <input type='text' id='num_tarjeta' name='num_tarjeta' class='form-control' value='"+result.num_tarjeta+"'>";
    		formulario += "Admin: <input type='text' id='admin' name='admin' class='form-control' value='"+result.admin+"'>";
    		buscarAsignaturasQueImparte(result.id_profesor);
    		formulario += "Asignaturas: <div id='asignaturasdelProfesor'>";
    		formulario += "</div>";
    		formulario += "<select id='tipo'>";
    		formulario += "<option value='Ambos'>Ambos</option>";
    		formulario += "<option value='FP'>FP</option>";
    		formulario += "<option value='Bachiller'>Bachiller</option>";    		
     		formulario += "</select>";
     		formulario += "</br>";   		
    		buscarTodasLasAsignaturas(result.id_profesor);
    		formulario += "Todas <div id='asignaturasTodas'>";
    		formulario += "</div>";
			formulario += "<input type='submit' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace' href='/config/configPersonas' class='btn btn-primary'>Volver</a>";
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
	        if ($('#resultado #foto').val() == ''){
	        	event.preventDefault();
	            $('#password').attr('disabled',true);  
	            var data = $("#formUpdate").serializeArray();
	            $.ajax({
	                url: '/configProfesor/modificarProfesorSinFoto',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data)
	                $('#password').attr('disabled',false);
		                if (data.err=="existeDNI"){
		                showAlert($('#resultado #dni'),"error","dni ya existente");
		                } else if (data.err=="existeCorreo"){
		                showAlert($('#resultado #correo'),"error","Correo ya existente");
		                } else if (data.err=="existeTarjeta"){
		                showAlert($('#resultado #num_tarjeta'),"error","Tarjeta ya existente");
		                }else if (data.dato=="ok"){
		                showAlert($('#resultado #enlace'),"ok","Alumno modificada correctamente");
		                }
		                console.log("success");
			            })
			            .fail(function() {
	                console.log("error");
	                $('#password').attr('disabled',false);
	            })
	            /*
	            *   Form Submit Fin
	            */
	        } else {
	            event.preventDefault();
	            $('#password').attr('disabled',true);  
	            var formData = new FormData($('#resultado #formUpdate')[0]);
	            $.ajax({
	                url: '/configProfesor/modificarProfesor',
	                type: 'post',
	                data: formData,
	                async: false,
	                cache: false,
	                contentType: false,
	                processData: false,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data)
	                $('#password').attr('disabled',false);
		                if (data.err=="existeDNI"){
		                showAlert($('#resultado #dni'),"error","dni ya existente");
		                } else if (data.err=="existeCorreo"){
		                showAlert($('#resultado #correo'),"error","Correo ya existente");
		                } else if (data.err=="existeTarjeta"){
		                showAlert($('#resultado #num_tarjeta'),"error","Tarjeta ya existente");
		                }else if (data.dato=="ok"){
		                showAlert($('#resultado #enlace'),"ok","Alumno modificada correctamente");
		                }
		                console.log("success");
			            })
			            .fail(function() {
	                console.log("error");
	                $('#password').attr('disabled',false);
	            })
	            /*
	            *   Form Submit Fin
	            */
	        }//.else	
	        }//submitHandler
	    });//Validate
	  //$( "#target" ).submit();
	});

		//Funcion con buscar asignaturas
	function buscarAsignaturasQueImparte (id) {
		$.ajax({
			url: '/configAsignatura/buscarAsignaturasQueImparte',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id },
			success:function (data) {
				var resp = "";
				resp += "<table id='asignaturasTable'>";
				for (var i = 0; i < data.length; i++) {
					resp += "<tr>";
					resp += "<td>";
					resp += "<input type='checkbox' id='checkbox' name='checkbox' value='"+data[i].id_asignatura+"' checked>";
					resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
					resp += "</td>";
					resp += "</tr>"
				};
				resp += "</table>";
				$('#asignaturasdelProfesor').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas


		//Funcion con buscar asignaturas
	function buscarTodasLasAsignaturas (id) {
		$.ajax({
			url: '/configAsignatura/buscarAsignaturasQueNoImpartePorId',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id },
			success:function (data) {
				console.log(data);
				var resp = "";
				resp += "<table id='asignaturasTodas'>";			
				for (var i = 0; i < data.length; i++) {
					resp += "<tr>";
					resp += "<td>";
					resp += "<input type='checkbox' id='checkbox' name='checkbox' value='"+data[i].id_asignatura+"'>";
					resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
					resp += "</td>";
					resp += "</tr>"
				};
				resp += "</table>";
				$('#asignaturasTodas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas
	
			//Funcion con buscar asignaturas
	function buscarTodasLasAsignaturasDelTipo (id,tipo) {
		$.ajax({
			url: '/configAsignatura/buscarTodasLasAsignaturasDelTipo',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id , tipo:tipo},
			success:function (data) {
				//console.log(data);
				var resp = "";
				resp += "<table id='asignaturasTodas'>";			
				for (var i = 0; i < data.length; i++) {
					resp += "<tr>";
					resp += "<td>";
					resp += "<input type='checkbox' id='checkbox' name='checkbox' value='"+data[i].id_asignatura+"'>";
					resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
					resp += "</td>";
					resp += "</tr>"
				};
				resp += "</table>";
				$('#asignaturasTodas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas
	
	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarProfesores () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configProfesor/buscarProfesorNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_profesor+"'>"+data[i].id_profesor+" "+data[i].nombre+"</h3>";
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
	}//function buscarProfesores

	//funcion para buscar alumnos por id
	function buscarProfesorPorId (id) { 
		return	$.ajax({
					url: '/configProfesor/buscarProfesorId',
					type: 'post',
					dataType: 'json',
					data:{ id_profesor:id },
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
		if(confirm("Estas seguro de borrar al profesor?")) {
			$.ajax({
				url: '/configProfesor/borrarProfesor',
				type: 'post',
				dataType: 'html',
				data: {'id_profesor':$('#resultado #id_profesor').val()},
				success:function(data){
					if (data == "ok") {
						alert("Alumno borrado correctamente");
						buscarProfesores();
					}else{
						alert("Algo no ha ido bien");
					}//if else
				}//success
			})//ajax
			.done(function() {
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario alumno

	//cambiar select
	$('#resultado').on("change","#tipo",function(event) {
		 //alert( this.value );
		 if(this.value == "FP"){
		 	//alert("has elegido asignaturas FP");
		 	buscarTodasLasAsignaturasDelTipo($('#resultado #id_profesor').val(),this.value);
		 } else if(this.value == "Bachiller"){
		 	//alert("has elegido asignaturas Bachiller");
		 	buscarTodasLasAsignaturasDelTipo($('#resultado #id_profesor').val(),this.value);
		 } else {
		 	//alert("has elegido todas");
		 	buscarTodasLasAsignaturas($('#resultado #id_profesor').val());
		 }
		});//click borrar formulario alumno

	
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


