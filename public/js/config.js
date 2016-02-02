$(document).ready(function() {
    $( "div" ).click(function() {
      //alert($(this).attr("id"));
      event.preventDefault();
			$.ajax({
				url: '/configProfesor/buscarProfesorPorIdAulaEnUnaHora',
				type: 'post',
				dataType: 'html',
				data: {'id_aula':$(this).attr("id")},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				var JSONObject = JSON.parse(data);
				console.log("success");
				window.location.replace('/vistaProfesor?idProfesor='+JSONObject[0].id_profesor);
			})//done
			.fail(function() {
				console.log("error");
			})//fail
	});//$( "div" ).click(function()
});//ready

//profesor.buscarProfesorPorIdAulaEnUnaHora metodo


