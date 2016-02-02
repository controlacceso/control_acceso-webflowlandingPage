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
        foto:{required:true,fileSize:true},
        num_tarjeta:{required:true},
	};
	//mensajes
	var mensajes = {
		dni:{required:" Requerido",dni:"introduce un DNI correcto"},
        nombre:{required:" Requerido",lettersonly:"Please enter only letters"},
		apellidos:{required:" Requerido",lettersonly:"Please enter only letters"},
		correo:{required:" Requerido",correo:"introduce un Correo correcto"},
        password:{required:"Requerido",convertHash:"Hash"},
        foto:{required:" Requerido",fileSize:"maximo 100kb"},
        num_tarjeta:{required:" Requerido"},
	};

	//Validate
	$("#agregarProfesorForm").validate({
        rules:reglas,
		messages:mensajes,
		errorPlacement: function(error,element){
			element.before(error);
		},
        submitHandler: function (form) {
            event.preventDefault();
            console.log(password);
            $('#password').attr('disabled',true);            
            var formData = new FormData($("#agregarProfesorForm")[0]);
            console.log(formData);
            $.ajax({
                url: '/configProfesor/agregarProfesor',
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
                console.log(data);
                $('#password').attr('disabled',false);
                if (data.err=="existeDNI"){
                    showAlert("#dni","error","DNI ya existente");
                } else if (data.err=="existeCorreo"){
                    showAlert("#correo","error","Correo ya existente");    
                }else if(data.err=="existeTarjeta"){
                    showAlert("#num_tarjeta","error","NumeroTarjeta ya existente");    
                }else if (data.dato=="ok"){
                    showAlert("#enlace","ok","Alumno añadida correctamente");
                }
                console.log("successdata");
            })
            .fail(function() {
                console.log("error");
                $('#password').attr("disabled",false);
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