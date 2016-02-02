var connection = require('../models/connection');
var app = require('../app');

var convalidadas = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR asignatura convalidada
*/
convalidadas.agregarAsignaturaConvalidada =  function(id_asignatura,id_alumno,callback) {
	if(connection){
		var convalidadas = { id_asignatura: id_asignatura, id_alumno: id_alumno};						
		var sqlagregarAsignaturaConvalidada = 'INSERT INTO convalidadas SET ?';
		connection.query(sqlagregarAsignaturaConvalidada,convalidadas, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('agregarAsignaturaConvalidada OK');
			}//else
		});//connection.query
	}//if
}//convalidadas.agregarAsignaturaConvalidada

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE asignatura convalidada
*/
convalidadas.borrarAsignaturaConvalidada =  function(id_alumno,callback) {
	if(connection){					
		var sqlborrarAsignaturaConvalidada = 'DELETE FROM convalidadas WHERE id_alumno= "'+id_alumno+'"';
		connection.query(sqlborrarAsignaturaConvalidada, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarAsignaturaConvalidada OK');
			}//else
		});//connection.query
	}//if (connection)
}//convalidadas.borrarAsignaturaConvalidada

/****************************************************************************************************************************/

module.exports = convalidadas;


