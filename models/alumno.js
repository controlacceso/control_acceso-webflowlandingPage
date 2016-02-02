var connection = require('../models/connection');
var time = require('../models/time');
var alumno = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno
*/
alumno.agregarAlumno = function (dni,nombre,apellidos,correo,foto,num_tarjeta,callback) {
	if(connection){							
		var alumno = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , foto: foto, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
		var sqlagregarAlumno = 'INSERT INTO alumnos SET ?';
		connection.query(sqlagregarAlumno,alumno, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno.agregarAlumno

/*
* INSERTAR alumno sin foto
*/
alumno.agregarAlumnoSinFoto = function (dni,nombre,apellidos,correo,num_tarjeta,callback) {
	if(connection){							
		var alumno = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
		var sqlagregarAlumno = 'INSERT INTO alumnos SET ?';
		connection.query(sqlagregarAlumno,alumno, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno.agregarAlumnoSinFoto

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno
*/
alumno.modificarAlumno = function (id,dni,nombre,apellidos,correo,foto,num_tarjeta,tarjeta_activada,callback) {
	if(connection){							
		var campos = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , foto: foto, tarjeta_activada: tarjeta_activada , num_tarjeta: num_tarjeta, presencia: '0' };
		var sqlmodificarAlumno = 'UPDATE alumnos SET ? WHERE id_alumno ="'+id+'"';
		connection.query(sqlmodificarAlumno,campos, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarAlumno');
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno.modificarAlumno

/*
*	UPDATE alumno sin foto
*/
alumno.modificarAlumnoSinFoto = function (id,dni,nombre,apellidos,correo,num_tarjeta,tarjeta_activada,callback) {
	if(connection){							
		var campos = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo, tarjeta_activada: tarjeta_activada , num_tarjeta: num_tarjeta, presencia: '0' };
		var sqlmodificarAlumno = 'UPDATE alumnos SET ? WHERE id_alumno ="'+id+'"';
		connection.query(sqlmodificarAlumno,campos, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarAlumnoSinFoto');				
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno.modificarAlumnoSinFoto

/*
*	UPDATE la presencia del alumno a 0 o a 1 por num_tarjeta
*/
alumno.modificarPresenciaDelAlumno = function (num_tarjeta,callback) {
	if(connection){
		this.buscarPresenciaAlumno(num_tarjeta,function (error,data) {
			if (data[0].presencia == 0) {
				var sqlUpdate = 'UPDATE alumnos SET presencia = 1 WHERE num_tarjeta ="'+num_tarjeta+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
						console.log(error);
					}else{
						console.log('modificarPresenciaDelAlumno a 1 OK');
						callback(null);
					}//else
				});//connection.query
			}else{
				var sqlUpdate = 'UPDATE alumnos SET presencia = 0 WHERE num_tarjeta ="'+num_tarjeta+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
						console.log(error);
					}else{
						console.log('modificarPresenciaDelAlumno a 0 OK');
						callback(null);
					}//else
				});//connection.query
			}//else
		});//this.buscarPresenciaAlumno
	}//if
}//alumno.modificarPresenciaDelAlumno

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE alumno por id_alumno
*/
alumno.borrarAlumno = function (id,callback) {
	if(connection){							
		connection.query('DELETE FROM alumnos WHERE id_alumno= "'+id+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarAlumno OK');
			}//else
		});//connection.query
	}//if
}//alumno.borrarAlumno

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR alumno por id_alumno
*/
alumno.buscarAlumnoPorId = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,foto,tarjeta_activada FROM alumnos WHERE id_alumno ='+connection.escape(id_alumno);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				if(row[0].foto == null){
					var foto = row[0].foto;
				} else {
					var foto = row[0].foto.toString('base64');//foto del alumno	
				}
				var row2 = {id_alumno : row[0].id_alumno,dni : row[0].dni,nombre : row[0].nombre,apellidos : row[0].apellidos,correo : row[0].correo,num_tarjeta : row[0].num_tarjeta,foto : foto,tarjeta_activada : row[0].tarjeta_activada};
				callback(null,row2);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAlumnoPorId

/*
*	BUSCAR alumno por dni
*/
alumno.buscarAlumnoPorDni = function(dni,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_alumno,dni,nombre,apellidos,correo,foto,presencia FROM alumnos WHERE dni LIKE ' + connection.escape(dni+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//buscarAlumnoPorDni

/*
* BUSCAR alumno por num_tarjeta
*/
alumno.buscarAlumnoPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_alumno,tarjeta_activada,presencia FROM alumnos WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
		connection.query(sql, function (error, row){
			if(error){
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.buscarAlumnoPorTarjeta

/*
*	BUSCAR alumno por nombre
*/
alumno.buscarAlumnoPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,foto FROM alumnos WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAlumnoPorNombre

/*
*	BUSCA alumnos por nombre y apellidos
*/
alumno.buscarAlumnoPorNombreYApellido = function(nombre,apellidos,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_alumno,dni,nombre,apellidos,correo,foto,presencia FROM alumnos WHERE nombre = ' + connection.escape(nombre)+' and apellidos LIKE '+ connection.escape(apellidos+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('buscarAlumnoPorNombreYApellido OK');
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//alumno.buscarAlumnoPorNombreYApellido

/*
*	BUSCAR alumno por correo
*/
alumno.buscarAlumnoPorCorreo = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_alumno,dni,nombre,apellidos,correo,foto,presencia FROM alumnos WHERE correo LIKE ' + connection.escape(correo+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('buscarAlumnoPorCorreo OK');
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAlumnoPorCorreo

/*
*	BUSCAR el aula en la que tiene que estar por num_tarjeta
*/
alumno.buscarAulaEnLaQueTieneQueEstarPorTarjeta = function (num_tarjeta,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}
	});
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_alumno IN (SELECT id_alumno FROM alumnos WHERE num_tarjeta ="'+num_tarjeta+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('buscarAulaEnLaQueTieneQueEstarPorTarjeta OK');
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAulaEnLaQueTieneQueEstarPorTarjeta

/*
*	BUSCA el aula en la que tiene que estar por id_persona, hora y dia de la semana
*/
alumno.buscarAulaEnLaQueTieneQueEstarPorId = function (id_alumno,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}
	});
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_alumno ="'+id_alumno+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('buscarAulaEnLaQueTieneQueEstarPorId OK');
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAulaEnLaQueTieneQueEstarPorId

/*
*	BUSCAR la presencia del alumno por num_tarjeta
*/
alumno.buscarPresenciaAlumno = function (num_tarjeta,callback) {
	if(connection){
		var sqlAlumnoPresencia = 'SELECT presencia FROM alumnos WHERE num_tarjeta ="'+num_tarjeta+'"';
		connection.query(sqlAlumnoPresencia, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('buscarPresenciaAlumno OK');
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarPresenciaAlumno

/*
*	BUSCA todos los id_alumno
*/
alumno.buscarTodosLosIdAlumno = function (callback) {
	if(connection){						
		connection.query('SELECT id_alumno FROM alumnos', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				var id_alumnoArray = [];
				for (var i= 0;i<row.length;i++){
					var id = row[i].id_alumno;
					id_alumnoArray.push(id);
				}//for
				function compareNumbers(a, b) {
				  	return a - b;
				}//compareNumbers
				id_alumnoArray.sort(compareNumbers);
				console.log('buscarTodosLosIdAlumno OK');
				callback(null,id_alumnoArray);
			}//else
		});//connection.query
	}//if
}//alumno.buscarTodosLosIdAlumno

alumno.buscarAlumnoPorIdDniCorreoNum_tarj = function(id_alumno,dni,correo,num_tarjeta,callback) {
	if (connection) {
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,foto,presencia FROM alumnos WHERE id_alumno = ' + connection.escape(id_alumno)+' and dni = '+ connection.escape(dni)+' and correo = '+ connection.escape(correo)+' and num_tarjeta = '+ connection.escape(num_tarjeta);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('buscarAlumnoPorIdDniCorreoNum_tarj OK');
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//alumno.buscarAlumnoPorIdDniCorreoNum_tarj

/****************************************************************************************************************************/

module.exports = alumno;