//MODELO HORARIO_GRUPO COMPROBAR

var connection = require('../models/connection');
var time = require('../models/time');
var app = require('../app');

var horario_grupo = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR horario_grupo
*/
horario_grupo.agregarHorarioGrupo = function (dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula,callback) {							
	if(connection){	
		var horario_grupo = { dia_semana: dia_semana, hora_inicio: hora_inicio, hora_final: hora_final, id_grupo: id_grupo, id_asignatura: id_asignatura, id_aula: id_aula };
		var sqlagregarHorarioGrupo = 'INSERT INTO horario_grupos SET ?';
		connection.query(sqlagregarHorarioGrupo,horario_grupo, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
				console.log('agregarHorarioGrupo OK');
			}//else
		});//connection.query
	}//if
}//horario_grupo.agregarHorarioGrupo

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE horario_grupo
*/
horario_grupo.modificarHorarioGrupo = function (id_horario_grupo,dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula,callback) {								
	if(connection){	
		var horario_grupo = { dia_semana: dia_semana, hora_inicio: hora_inicio, hora_final: hora_final, id_grupo: id_grupo, id_asignatura: id_asignatura, id_aula: id_aula };
		var modificarHorarioGrupo = 'UPDATE horario_grupos SET ? WHERE id_horario_grupo ="'+id_horario_grupo+'"';
		connection.query(modificarHorarioGrupo, horario_grupo, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
				console.log('modificarHorarioGrupo OK');
			}//else
		});//connection.query
	}//if
}//horario_grupo.modificarHorarioGrupo

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE horario_grupo
*/
horario_grupo.borrarHorarioGrupo = function (id_horario_grupo,callback) {							
	if(connection){	
		connection.query('DELETE FROM horario_grupos WHERE id_horario_grupo= "'+id_horario_grupo+'"', function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarHorarioGrupo OK');
			}//else
		});//connection.query
	}//if
}//horario_grupo.borrarHorarioGrupo

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR horario_grupo por id_horario_grupo
*/
horario_grupo.buscarHorarioGrupoPorId = function (id_horario_grupo,callback) {							
	if(connection){	
		var sql = 'SELECT id_horario_grupo,dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula FROM horario_grupos WHERE id_horario_grupo = ' + connection.escape(id_horario_grupo);
		connection.query(sql, function (error, row){
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarHorarioGrupoExistente OK');
			}//else
		});//connection.query
	}//if
}//horario_grupo.buscarHorarioGrupoPorId

/*
*	BUSCAR horario_grupo por nombre
*/
horario_grupo.buscarHorarioGrupoPorNombre = function(nombre,callback){
	console.log(nombre);
	if(connection){
		var sql = 'SELECT id_horario_grupo,dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE nombre_grupo LIKE "'+nombre+'%'+'")';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarHorarioGrupoPorNombre OK');
			}//.else
		});//.connection.query
	}//.if(connection)
}//horario_grupo.buscarHorarioGrupoPorNombre

/*
*	BUSCAR todos los horario_grupo
*/
horario_grupo.buscarTodosLosHorarioGrupo = function (callback) {							
	if(connection){	
		connection.query('SELECT id_horario_grupo,dia_semana,hora_inicio,hora_final FROM horario_grupos', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarTodosLosHorarioGrupo OK');
			}//else
		});//connection.query
	}//if
}//horario_grupo.buscarTodosLosHorarioGrupo

/*
*	BUSCAR todos los id_horario_grupo
*/
horario_grupo.buscarTodosLosIdHorarioGrupo = function (callback) {							
	if(connection){	
		connection.query('SELECT id_horario_grupo FROM horario_grupos', function(error,row){
			if (error) {
				throw error;
				console.log(error);
			}else{
				var id_horarioGrupoArray = [];
				for (var i= 0;i<row.length;i++){
					id_horarioGrupoArray.push(row[i].id_horario_grupo);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				}//compareNumbers
				id_horarioGrupoArray.sort(compareNumbers);
				callback(null,id_horarioGrupoArray);
				console.log('buscarTodosLosIdHorarioGrupo OK');
			}//else
		});//connection.query
	}//if
}//horario_grupo.buscarTodosLosIdHorarioGrupo

/*
*	BUSCAR un horario_grupo que ya exista en la base de datos
*/
horario_grupo.buscarHorarioGrupoExistente = function(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula,callback){
	if(connection){
		var sql = 'SELECT id_horario_grupo,dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula FROM horario_grupos WHERE dia_semana ="'+dia_semana+'" AND hora_inicio ="'+hora_inicio+'" AND hora_final ="'+hora_final+'" AND id_grupo ="'+id_grupo+'" AND id_asignatura ="'+id_asignatura+'" AND id_aula ="'+id_aula+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarHorarioGrupoExistente OK');
			}//else
		});//connection.query
	}//if
}//horario_grupo.buscarHorarioGrupoExistente

/*
*	Buscar horas finales según día de la semana
*/
horario_grupo.buscarHoraFinalPorDia = function(dia,callback) {
	if (connection) {
		var sql = 'SELECT DISTINCT(hora_final) FROM horario_grupos WHERE dia_semana = "'+dia+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}
		});//connection query
	};//if connection
}//buscarHoraFinalPorDia

/****************************************************************************************************************************/

module.exports = horario_grupo;

