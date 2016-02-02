var connection = require('../models/connection');
var time = require('../models/time');
var app = require('../app');

var horario_profesor = {};
var day;

time.diaDeLaSemana(function (error,data) {
	if (error) {
		throw error;
	}else{
		day = data;
	}
});

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR horario_profesor
*/
horario_profesor.agregarHorarioProfesor = function (dia_semana, hora_inicio, hora_final, id_profesor, id_horario_grupo,callback) {							
	if(connection){
		var horario_profesor = { dia_semana:dia_semana, hora_inicio:hora_inicio, hora_final:hora_final, id_profesor:id_profesor, id_horario_grupo:id_horario_grupo };
		var sqlagregarHorarioProfesor = 'INSERT INTO horario_profesores SET ?';
		connection.query(sqlagregarHorarioProfesor,horario_profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
				console.log('agregarHorarioProfesor OK');
			}//else
		});//connection.query
	}//if
}//horario_profesor.agregarHorarioProfesor

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE horario_profesor
*/
horario_profesor.modificarHorarioProfesor = function (id_horario_profesor,dia_semana, hora_inicio, hora_final, id_profesor, id_horario_grupo,callback) {							
	if(connection){	
		var horario_profesor = { id_horario_profesor:id_horario_profesor,dia_semana:dia_semana, hora_inicio:hora_inicio, hora_final:hora_final, id_profesor:id_profesor, id_horario_grupo:id_horario_grupo };
		var sqlmodificarHorarioProfesor = 'UPDATE horario_profesores SET ? WHERE id_horario_profesor ="'+id_horario_profesor+'"';
		connection.query(sqlmodificarHorarioProfesor,horario_profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
				console.log('modificarHorarioProfesor OK');
			}//else
		});//connection.query
	}//if
}//horario_profesor.modificarHorarioProfesor

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE horario_profesor
*/
horario_profesor.borrarHorarioProfesor = function (id_horario_profesor,callback) {							
	if(connection){	
		connection.query('DELETE FROM horario_profesores WHERE id_horario_profesor= "'+id_horario_profesor+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarHorarioProfesor OK');
			}//else
		});//connection.query
	}//if
}//horario_profesor.borrarHorarioProfesor

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR horario_profesor por id_horario_profesor
*/
horario_profesor.buscarHorarioProfesorPorId = function (id_horario_profesor,callback) {							
	if(connection){	
		var sql = 'SELECT id_horario_profesor,dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo FROM horario_profesores WHERE id_horario_profesor = ' + connection.escape(id_horario_profesor);
		connection.query(sql, function (error, row){
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarHorarioProfesorPorId OK');
			}//else
		});//connection.query
	}//if
}//horario_profesor.buscarHorarioProfesorPorId

/*
* BUSCAR horario_profesor por nombre del profesor
*/
horario_profesor.buscarHorarioProfesorPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_horario_profesor,dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo FROM horario_profesores WHERE id_profesor IN (SELECT id_profesor FROM profesores WHERE nombre LIKE "'+nombre+'%'+'")';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarHorarioProfesorPorNombre OK');
			}//else
		});//connection.query
	}//if
}//horario_profesor.buscarHorarioProfesorPorNombre

/*
* BUSCAR todos los id_horario_profesor
*/
horario_profesor.buscarTodosLosIdHorarioProfesor = function (callback) {							
	if(connection){	
		connection.query('SELECT id_horario_profesor FROM horario_profesores', function(error,row){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				var id_HorarioProfesorArray = [];
				for (var i= 0;i<row.length;i++){
					id_HorarioProfesorArray.push(row[i].id_horario_profesor);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				}//compareNumbers
				id_HorarioProfesorArray.sort(compareNumbers);
				callback(null,id_HorarioProfesorArray);
				console.log('buscarTodosLosIdHorarioProfesor OK');
			}//else
		});//connection.query
	}//if
}//horario_profesor.buscarTodosLosIdHorarioProfesor

/*
*	BUSCAR un horario_profesor que ya exista en la base de datos
*/
horario_profesor.buscarHorarioProfesorExistente = function(dia_semana,hora_inicio,hora_final,id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_horario_profesor,dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo FROM horario_profesores WHERE dia_semana ="'+dia_semana+'" AND hora_inicio ="'+hora_inicio+'" AND hora_final ="'+hora_final+'" AND id_profesor ="'+id_profesor+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarHorarioProfesorExistente OK');
			}//else
		});//connection.query
	}//if
}//horario_profesor.buscarHorarioProfesorExistente

/****************************************************************************************************************************/

module.exports = horario_profesor;

