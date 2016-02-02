var connection = require('../models/connection');
var app = require('../app');

var falta = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR falta
*/
falta.agregarFalta = function (fecha,id_alumno,id_horario_grupo,observaciones,callback) {
	if(connection){							
		var falta = { fecha: fecha, id_alumno: id_alumno, id_horario_grupo: id_horario_grupo, observaciones: observaciones };
		var sqlagregarFalta = 'INSERT INTO faltas SET ?';
		connection.query(sqlagregarFalta,falta, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('agregarFalta OK');
			}//else
		});//connection.query
	}//if
}//falta.agregarFalta

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE falta
*/
falta.modificarFalta = function (id_falta,fecha,id_alumno,id_horario_grupo,observaciones,callback) {
	if(connection){							
		var falta = { fecha: fecha, id_alumno: id_alumno, id_horario_grupo: id_horario_grupo, observaciones: observaciones };
		var sqlmodificarFalta = 'UPDATE faltas SET ? WHERE id_falta ="'+id_falta+'"';
		connection.query(sqlmodificarAula,aula, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarFalta OK');
			}//else
		});//connection.query
	}//if
}//falta.modificarFalta

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE falta por id_falta
*/
falta.borrarFalta = function (id_falta,callback) {
	if(connection){							
		connection.query('DELETE FROM faltas WHERE id_falta= "'+id_falta+'"', function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarFalta OK');
			}//else
		});//connection.query
	}//if
}//falta.borrarFalta

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR alumno por id_alumno
*/
falta.buscarTodosLosIdFalta = function (callback) {
	if(connection){							
		connection.query('SELECT id_falta FROM faltas', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				var id_FaltaArray = [];
				for (var i= 0;i<row.length;i++){
					var id = row[i].id_falta;
					id_FaltaArray.push(id);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				}//compareNumbers
				id_FaltaArray.sort(compareNumbers);
				callback(null,id_FaltaArray);
				console.log('buscarTodosLosIdFalta OK');
			}//else
		});//connection.query
	}//if
}//falta.buscarTodosLosIdFalta

/****************************************************************************************************************************/

module.exports = falta;

