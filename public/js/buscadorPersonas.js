$(document).ready(function() {
	/*
	*	Formulario
	*/
	var form = "<form id='formBuscador' class='form-group'>";
	form += "<div id='accordion'>";
	form += "<h3><a href='#'>Por nombre</a></h3>";
	form += "<div><label for='nombre'>Nombre: </label><input type='text' id='nombre' name='nombre' class='required form-control' /><label for='apellidos'>Apellidos: </label><input type='text' id='apellidos' name='apellidos' class='required form-control' /></div>";
	form += "<h3><a href='#'>Por DNI</a></h3>";
	form += "<div><label for='dni'>DNI: </label><input type='text' id='dni' name='dni' class='required form-control' /></div>";
	form += "<h3><a href='#'>Por correo</a></h3>";
	form += "<div><label for='correo'>Correo:</label><input type='text' id='correo' name='correo' class='required form-control' /></div>";
	form += "</div>";
	form += "<p><button id='buscadorSubmit' class='btn btn-primary'>Buscar</button></p>";
	$('#buscador').html(form);
	$("#accordion").accordion();
	/*
	*	Formulario fin
	*/

	/*
	*	Validate
	*/
	//regla dni
	jQuery.validator.addMethod("dni", function(value, element) {
		return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
	});

	//regla correo
	jQuery.validator.addMethod("correo", function(value, element) {
		return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
	});

	//reglas
	var reglas = {
		nombre:{required:true},
		apellidos:{required:true},
		dni:{required:true,dni:true},
		correo:{required:true,correo:true}
	};
	//mensajes
	var mensajes = {
		nombre:{required:" Requerido"},
		apellidos:{required:" Requerido"},
		dni:{required:" Requerido", dni:" Formato no válido"},
		correo:{required:" Requerido",correo:" Formato no válido"}
	};

	//Validate
	$("#buscador #formBuscador").validate({
        rules:reglas,
		messages:mensajes,
		errorPlacement: function(error,element){
			element.before(error);
		},
        submitHandler: function (form) {
            enviar();
        }//submitHandler
    });//Validate
    /*
    *   Validate Fin
    */

    /*
    *   funcion enviar
    */
    function enviar () {
        /*
        *   Form Submit
        */
        event.preventDefault();
        var data = $("#formBuscador").serializeArray();
        console.log(data);
        $.ajax({
            url: '/buscarPersona',
            type: 'get',
            dataType: 'json',
            data: data,
            success: function (data) {
                var cont = 1;
                var resp = "<table class='table table-hover'><tr><th>Nombre</th><th>Apellidos</th><th>Correo</th></tr>";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id_alumno != undefined) {
                        if (cont%2 == 0) {
                            resp += "<tr id='"+data[i].id_alumno+"'>";
                        }else{
                            resp += "<tr class='success' id='"+data[i].id_alumno+"'>";
                        }
                    }else{
                        if (cont%2 == 0) {
                            resp += "<tr id='"+data[i].id_profesor+"'>";
                        }else{
                            resp += "<tr class='success' id='"+data[i].id_profesor+"'>";
                        }
                    }//else if alumno
                    
                    resp += "<td id='"+data[i].presencia+"'>"+data[i].nombre+"</td><td>"+data[i].apellidos+"</td><td>"+data[i].correo+"</td></tr>";
                        cont++;
                };//for
                resp += "</table>";
                resp += "<button id='volverABuscar' class='btn btn-primary'>Volver</button>";
                $('#buscador').html(resp);
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        /*
        *   Form Submit Fin
        */
    }
    /*
    *   fin funcion enviar
    */
    

    /*
    *	Dialog
    */
	$( "#buscador").dialog({
        autoOpen: false,
        modal:true,
        maxWidth:700,
        maxHeight: 500,
        width: 'auto',
        fluid: true,
        show: {
            effect: "blind",
            duration: 1000
        },//show
        hide: {
            effect: "explode",
            duration: 1000
        },//hide
        close: function (event,ui) {
            $('#buscador').html(form);
            $('#accordion').accordion();
            /*
            *   volver a validar
            */
            $("#buscador #formBuscador").validate({
                rules:reglas,
                messages:mensajes,
                errorPlacement: function(error,element){
                    element.before(error);
                },
                submitHandler: function (form) {
                    enviar();
                }//submitHandler
            });//Validate
            /*
            *   fin volver a validar
            */
            encontrado = 0;
        }//close
    });//dialog buscador

    //al clicar en el boton horario abrir el dialog
	$('#botonBuscador').click(function() {
		$( "#buscador" ).dialog( "open" );
    });

    /*
    *	Dialog Fin
    */

    /*
    *   Dialog responsive
    */
    $(window).resize(function () {
        fluidDialog();
    });

    $(document).on("dialogopen", ".ui-dialog", function (event, ui) {
        fluidDialog();
    });

    function fluidDialog() {
        var $visible = $(".ui-dialog:visible");
        // each open dialog
        $visible.each(function () {
            var $this = $(this);
            var dialog = $this.find(".ui-dialog-content").data("ui-dialog");
            // if fluid option == true
            if (dialog.options.fluid) {
                var wWidth = $(window).width();
                // check window width against dialog width
                if (wWidth < (parseInt(dialog.options.maxWidth) + 50))  {
                    // keep dialog from filling entire screen
                    $this.css("max-width", "90%");
                } else {
                    // fix maxWidth bug
                    $this.css("max-width", dialog.options.maxWidth + "px");
                }
                //reposition dialog
                dialog.option("position", dialog.options.position);
            }
        });

    }
    /*
    *   fin Dialog responsive
    */

    /*
    *   click alumno encontrado
    */
    var encontrado = 0;
    $('#buscador').on('click', 'tr', function(event) {
        if (encontrado != 1) {
            var datos = $(this).contents();
            var celda = datos[0].localName;
            if (celda != 'th') {
                var id = $(this).attr('id');
                var nombre = datos[0].innerHTML;
                var apellidos = datos[1].innerHTML;
                var correo = datos[2].innerHTML;
                var presencia = datos[0].id;
                $.ajax({
                    url: '/buscarAulaPersona',
                    type: 'get',
                    dataType: 'json',
                    data: {'id': id},
                    success: function (data) {
                        var persona = "<table id='tablaPersona'><tr>";
                        if (presencia == 0) {
                            persona += "<td class='presencia0'>";
                        }else{
                            persona += "<td class='presencia1'>";
                        }
                        if (data.error) {
                            persona += nombre+"<br/>"+apellidos+"<br/>"+correo+"<br/>Aula: "+data.error;
                        }else{
                            persona += nombre+"<br/>"+apellidos+"<br/>"+correo+"<br/>Aula: "+data[0].id_aula;
                        }
                        persona += "</td></tr></table>";
                        persona += "<button id='volverABuscar' class='btn btn-primary'>Volver</button>";
                        $('#buscador').html(persona);
                        encontrado = 1;
                    }

                })
                .done(function() {
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                });//ajax                                    
            }//if celda
        }//if encontrado
    });//buscador on click tr
    /*
    *   alumno encontrado fin
    */

    /*
    *   Volver a buscar
    */
    $('#buscador').on('click', '#volverABuscar', function(event){
        event.preventDefault();
        $('#buscador').html(form);
        $('#accordion').accordion();
        /*
        *   volver a validar
        */
        $("#buscador #formBuscador").validate({
            rules:reglas,
            messages:mensajes,
            errorPlacement: function(error,element){
                element.before(error);
            },
            submitHandler: function (form) {
                enviar();
            }//submitHandler
        });//Validate
        /*
        *   fin volver a validar
        */
        encontrado = 0;
    });
    /*
    *   volver a buscar fin
    */
});//ready