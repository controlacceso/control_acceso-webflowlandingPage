$(document).ready(function() {
  //recoger el correo del profesor en variable (desde html hidden)
  var correo = $('#correo').html();

/*
* Horario profesor ********************************************
*/
  //llenar la tabla del horario desde horarioProfesor
  $.ajax({
    url: 'vistaProfesor/horarioProfesor',
    type: 'get',
    dataType: 'json',
    data: {correo: correo},
    success:function (data) {
      var cont = 1;
      var resp = "<table id='tablaHorario' class='table table-hover tablesorter'><thead><tr><th>Día</th><th>Inicio</th><th>Fin</th><th>Aula</th><th>Asignatura</th><th>Grupo</th></tr></thead><tbody>";
      for (var i = 0; i < data.length; i++) {
        if (cont%2 == 0) {
          resp += "<tr>";
        }else{
          resp += "<tr class='success'>";
        }
        resp += "<td>"+data[i].dia_semana+"</td>";
        resp += "<td>"+data[i].hora_inicio+"</td>";
        resp += "<td>"+data[i].hora_final+"</td>";
        resp += "<td>"+data[i].numero+"</td>";
        resp += "<td>"+data[i].nombre+"</td>";
        resp += "<td>"+data[i].nombre_grupo+"</td>";
        resp += "</tr>";
        cont++;
      };
      resp += "</tbody>";
      $('#horario').html(resp);
      $('#horario #tablaHorario').tablesorter();
    }
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  
//dialog de horario
	$( "#horario").dialog({
      autoOpen: false,
      modal:true,
      maxWidth:700,
      maxHeight: 500,
      width: 'auto',
      fluid: true,
      autoReposition: true,
     /* show: {
        effect: "blind",
        duration: 1000
      },*/
      hide: {
        effect: "explode",
        duration: 1000
      }
  });
    //al clicar en el boton horario abrir el dialog
  $('#botonHorarioProfesor').click(function() {
		  $( "#horario" ).dialog( "open" );
   });

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
  * fin horario profesor ********************************************
  */

  /*
  * Hover fotos alumnos
  */
  $('.celdaAlumno').hover(function() {
    $(this).css('box-shadow', '0px 0px 25px black');
  }, function() {
    $(this).css('box-shadow', '5px 5px 10px black');
  });


  /*
  * Socket.io
  */
  var socket;
  var serverName = window.location.hostname;
  if ((serverName == "localhost") || (serverName == "127.0.0.1")) {
    socket = io();
  } else {
    socket = io('http://controlfid.zubirimanteoweb.com:8000');
  }
  socket = io.connect();

  $('td').click(function(event) {
    var id = $(this).attr('id');
    socket.emit('cambiaCliente',id);
  });

  socket.on('cambiaServidor', function(msg){
    if($('#'+msg).hasClass('presencia1')){
      $('#'+msg).removeClass('presencia1');
      $('#'+msg).addClass('presencia0');
    }else{
      $('#'+msg).removeClass('presencia0');
      $('#'+msg).addClass('presencia1');
    }
  });
  /*
  * Fin socket.io
  */

  /*
  * control footer
  */
  var dato = $('.celdaAlumno').html();
  if (dato == undefined) {
    $('#footer').css('bottom', '0px');
    $('#botonHorarioProfesor').css({
      position: 'absolute',
      bottom: '100px'
    });
    $('#exit').css({
      position: 'absolute',
      bottom: '100px',
      right: '20px'
    });
  };

  /*
  * destruir sesion
  */
  $('#exit').click(function(event) {
    $.ajax({
      url: '/logout',
      type: 'post',
      dataType: 'json',
      success:function (data) {
        if (data.result == 'ok') {
          window.location.href("/");
        };
      }
    })
    .done(function() {
      console.log("Session destroyed");
    })
    .fail(function() {
      console.log("error");
    })    
  });
  
  
});//ready
