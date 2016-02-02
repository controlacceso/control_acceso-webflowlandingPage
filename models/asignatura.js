var connection = require('../models/connection');
var app = require('../app');

var asignatura = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR asignatura
*/
asignatura.agregarAsignatura = function (nombre,clave,obligatoria,tipo,callback) {
	if(connection){						
		var asignatura = { nombre: nombre, clave: clave ,obligatoria: obligatoria, tipo:tipo };
		var sqlagregarAsignatura = 'INSERT INTO asignaturas SET ?';
		connection.query(sqlagregarAsignatura,asignatura, function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//asignatura.agregarAsignatura

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE asignatura
*/
asignatura.modificarAsigntura = function (id,nombre,clave,obligatoria,tipo,callback) {
	if(connection){							
		var asignatura = { nombre: nombre, clave: clave ,obligatoria: obligatoria, tipo:tipo };
		var sqlmodificarAsigntura = 'UPDATE asignaturas SET ? WHERE id_asignatura ="'+id+'"';
		connection.query(sqlmodificarAsigntura,asignatura, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//asignatura.modificarAsigntura

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE asignatura
*/
asignatura.borrarAsigntura = function (id,callback) {
	if(connection){							
		connection.query('DELETE FROM asignaturas WHERE id_asignatura= "'+id+'"', function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarAsigntura OK');
			}//else
		});//connection.query
	}//if
}//asignatura.borrarAsigntura

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR todas las asignaturas
*/
asignatura.buscarTodasLasAsignaturas = function (callback) {
	if(connection){							
		connection.query('SELECT id_asignatura,nombre FROM asignaturas', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log(row);
			    callback(null,row);
				console.log('buscarTodasLasAsignaturas OK');
			}//else
		});//connection.query
	}//if
}//asignatura.buscarTodasLasAsignaturas

/*
*	BUSCAR todos los id_asignatura
*/
asignatura.buscarTodosLosIdAsignatura = function (callback) {
	if(connection){							
		connection.query('SELECT id_asignatura FROM asignaturas', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				var id_AsignaturasArray = [];
				for (var i= 0;i<row.length;i++){
					id_AsignaturasArray.push(row[i].id_asignatura);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				}//compareNumbers
				id_AsignaturasArray.sort(compareNumbers);
				callback(null,id_AsignaturasArray);
				console.log('buscarTodosLosIdAsignatura OK');
			}//else
		});//connection.query
	}//if
}//asignatura.buscarTodosLosIdAsignatura

/*
*	BUSCAR asignaturas por id_asignatura
*/
asignatura.buscarAsignaturaPorId = function(id_asignatura,callback){
	//console.log(connection.escape(id_asignatura));
	if(connection){
		var sql = 'SELECT id_asignatura,nombre,clave,obligatoria,tipo FROM asignaturas WHERE id_asignatura ='+connection.escape(id_asignatura);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarAsignaturaPorId OK');
			}//else
		});//connection.query
	}//if
}//asignatura.buscarAsignaturaPorId

/*
*	BUSCAR asignaturas por nombre
*/
asignatura.buscarAsignaturaPorNombre = function(nombre,callback){
	if (connection){
		var sql = 'SELECT id_asignatura,nombre,clave,obligatoria,tipo FROM asignaturas WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql, function (error, row){
			if(error){
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarAsignaturaPorNombre OK');
			}//else
		});//connection.query
	}//if
}//asignatura.buscarAsignaturaPorNombre

/*
*	BUSCAR asignaturas por clave
*/
asignatura.buscarAsignaturaPorClave = function(clave,callback){
	if (connection){
		var sql = 'SELECT id_asignatura,nombre,clave,obligatoria,tipo FROM asignaturas WHERE clave = ' + connection.escape(clave);
		connection.query(sql, function (error, row){
			if(error){
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarAsignaturaPorClave OK');
			}//else
		});//connection.query
	}//if
}//asignatura.buscarAsignaturaPorClave

/*
*	BUSCAR asignaturas por id_asignatura y clave
*/
asignatura.buscarAsignaturaPorIdYClave = function(id_asignatura,clave,callback){
	console.log(connection.escape(id_asignatura));
	console.log(connection.escape(clave));
	if(connection){
		var sql = 'SELECT id_asignatura,nombre,clave,obligatoria,tipo FROM asignaturas WHERE id_asignatura ="'+id_asignatura+'" AND clave ="'+clave+'"';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarAsignaturaPorIdYClave OK');
			}//else
		});//connection.query
	}//if
}//asignatura.buscarAsignaturaPorIdYClave

/****************************************************************************************************************************/

module.exports = asignatura;