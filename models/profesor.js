var connection = require('../models/connection');
var time = require('../models/time');
var profesor = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR profesor
*/
profesor.agregarProfesor = function (dni,nombre,apellidos,correo,password,fotoblob,num_tarjeta,callback) {
	if(connection){							
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password: password , foto: fotoblob, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' , admin: '0' };
		var sqlinsertarProfesor = 'INSERT INTO profesores SET ?';
		connection.query(sqlinsertarProfesor,profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
				console.log('agregarProfesor OK');
			}//else
		});//connection.query
	}//if
}//profesor.agregarProfesor

/*
* INSERTAR profesor sin foto
*/
profesor.agregarProfesorSinFoto = function (dni,nombre,apellidos,correo,password,num_tarjeta,callback) {
	if(connection){							
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password: password , tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' , admin: '0' };
		var sqlinsertarProfesor = 'INSERT INTO profesores SET ?';
		connection.query(sqlinsertarProfesor,profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
				console.log('agregarProfesorSinFoto OK');
			}//else
		});//connection.query
	}//if
}//profesor.agregarProfesorSinFoto

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE profesor
*/
profesor.modificarProfesor = function (id,dni,nombre,apellidos,correo,password,foto,tarjeta_activada,num_tarjeta,admin,callback) {
	if(connection){	
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password:password, foto: foto, tarjeta_activada: tarjeta_activada , num_tarjeta: num_tarjeta,presencia: '0' , admin: admin};
		var sqlmodificarProfesor = 'UPDATE profesores SET ? WHERE id_profesor ="'+id+'"';
		connection.query(sqlmodificarProfesor,profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesor.modificarProfesor

/*
* UPDATE profesor sin foto
*/
profesor.modificarProfesorSinFoto = function (id,dni,nombre,apellidos,correo,password,tarjeta_activada,num_tarjeta,admin,callback) {
	if(connection){	
		var profesor = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , password:password, tarjeta_activada: tarjeta_activada , num_tarjeta: num_tarjeta,presencia: '0' , admin: admin};
		var sqlmodificarProfesor = 'UPDATE profesores SET ? WHERE id_profesor ="'+id+'"';
		connection.query(sqlmodificarProfesor,profesor, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//profesor.modificarProfesorSinFoto

/*
* UPDATE presencia profesor
*/
profesor.modificarPresenciaProfesor = function (num_tarjeta,callback) {
	if(connection){
		this.buscarPresenciaProfesor(num_tarjeta,function (error,data) {
			if (data[0].presencia == 0) {
				var sqlUpdate = 'UPDATE profesores SET presencia = 1 WHERE num_tarjeta ="'+num_tarjeta+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
						console.log(error);
					}else{
						callback(null);
						console.log('modificarPresenciaProfesor OK');
					}//else
				});//connection.query
			}else{
				var sqlUpdate = 'UPDATE profesores SET presencia = 0 WHERE num_tarjeta ="'+num_tarjeta+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
						console.log(error);
					}else{
						callback(null);
						console.log('modificarPresenciaProfesor OK');
					}//else
				});//connection.query
			}//else
		});//this.buscarPresenciaProfesor
	}//if
}//profesor.modificarPresenciaProfesor

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE profesor
*/
profesor.borrarProfesor = function (id,callback) {
	if(connection){						
		connection.query('DELETE FROM profesores WHERE id_profesor= "'+id+'"', function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarProfesor OK');
			}//else
		});//connection.query
	}//if
}//profesor.borrarProfesor

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR todos los nombre y apellido de todos los profesores
*/
profesor.mostrarTodosLosIdNombreApellidosProfesor = function (callback) {
	if(connection){						
		connection.query('SELECT id_profesor,nombre,apellidos FROM profesores', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('mostrarTodosLosIdNombreApellidosProfesor OK');
			}//else
		});//connection.query
	}//if
}//profesor.mostrarTodosLosIdNombreApellidosProfesor

/*
* BUSCAR profesor por id_profesor
*/
profesor.buscarProfesorPorId = function(id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo,password,num_tarjeta,foto,tarjeta_activada,admin FROM profesores WHERE id_profesor ='+connection.escape(id_profesor);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				if(row[0].foto == undefined){
					var foto = row[0].foto;
				} else {
					var foto = row[0].foto.toString('base64');//foto del alumno	
				}
				var row2 = {id_profesor : row[0].id_profesor,dni : row[0].dni,nombre : row[0].nombre,apellidos : row[0].apellidos,correo : row[0].correo,password : row[0].password,num_tarjeta : row[0].num_tarjeta,foto : foto,tarjeta_activada : row[0].tarjeta_activada,admin : row[0].admin};
				callback(null,row2);
				console.log('buscarProfesorPorId OK');
			}//else
		});//connection.query
	}//if
}//profesor.buscarProfesorPorId

/*
* BUSCAR profesor por dni
*/
profesor.buscarProfesorPorDni = function(dni,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,dni,nombre,apellidos,correo,foto,presencia FROM profesores WHERE dni LIKE ' + connection.escape(dni+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarProfesorPorDni OK');
			}
		})//connection.query
	}//if connection
}//buscarProfesorPorDni

/*
* BUSCAR profesor por nombre y apellidos
*/
profesor.buscarProfesorPorNombreYApellido = function(nombre,apellidos,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,dni,nombre,apellidos,correo,foto,presencia FROM profesores WHERE nombre = ' + connection.escape(nombre)+' and apellidos LIKE '+ connection.escape(apellidos+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarProfesorPorNombreYApellido OK');
			}
		})//connection.query
	}//if connection
}//buscarProfesorPorNombreYApellido

/*
* BUSCAR profesor por correo
*/
profesor.buscarProfesorPorCorreo = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_profesor,nombre,apellidos,correo,password,foto,admin,presencia from profesores WHERE correo = "'+correo+'"';
		connection.query(sql, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarProfesorPorCorreo OK');
			}//else
		});//connection.query
	};//if
}//profesor.buscarProfesorPorCorreo

/*
* BUSCAR profesor por num_tarjeta
*/
profesor.buscarProfesorPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_profesor,tarjeta_activada,presencia FROM profesores WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
		connection.query(sql, function (error, row){
			if(error){
				throw error;
				console.log(error);
			}
			else{
				callback(null,row);
				console.log('buscarProfesorPorTarjeta OK');
			}//else
		});//connection.query
	}//if
}//profesor.buscarProfesorPorTarjeta

/*
* BUSCAR profesor por nombre
*/
profesor.buscarProfesorPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo,foto FROM profesores WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarProfesorPorNombre OK');
			}//else
		});//connection.query
	}//if
}//profesor.buscarProfesorPorNombre

/*
* BUSCAR todos los id_profesor
*/
profesor.buscarTodosLosIdProfesor = function (callback) {
	if(connection){						
		connection.query('SELECT id_profesor FROM profesores', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				var id_profesorArray = [];
				for (var i= 0;i<row.length;i++){
					var id = row[i].id_profesor;
					id_profesorArray.push(id);
				}//for
				function compareNumbers(a, b) {
					return a - b;
				} 
				id_profesorArray.sort(compareNumbers);
				callback(null,id_profesorArray);
				console.log('buscarTodosLosIdProfesor OK');
			}//else
		});//connection.query
	}//if
}//profesor.buscarTodosLosIdProfesor

/*
* BUSCAR el estado de la presencia del profesor por num_tarjeta
*/
profesor.buscarPresenciaProfesor = function (num_tarjeta,callback) {
	if(connection){	
		var sqlProfesorPresencia = 'SELECT presencia FROM profesores WHERE num_tarjeta ="'+num_tarjeta+'"';
		connection.query(sqlProfesorPresencia, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarPresenciaProfesor OK');
			}//else
		});//connection.query
	}//if
}//profesor.buscarPresenciaProfesor

/*
* BUSCAR aula en la que tiene que estar el profesor en ese momento por tarjeta
*/
profesor.buscarAulaEnLaQueTieneQueEstarPorTarjeta = function (num_tarjeta,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}//else
	});//time.diaDeLaSemana
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN (SELECT id_profesor FROM profesores WHERE num_tarjeta ="'+num_tarjeta+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarAulaEnLaQueTieneQueEstarPorTarjeta OK');
			}//else
		});//connection.query
	}//if
}//profesor.buscarAulaEnLaQueTieneQueEstarPorTarjeta

/*
* BUSCAR aula en la que tiene que estar el profesor en ese momento por id_profesor
*/
profesor.buscarAulaEnLaQueTieneQueEstarPorId = function (id_profesor,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}//.else
});//.time.diaDeLaSemana
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_profesor IN (SELECT id_profesor FROM profesores WHERE id_profesor ="'+id_profesor+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarAulaEnLaQueTieneQueEstarPorId OK');
			}
		});
	}//.if (connection)
}//.profesor.buscarAulaEnLaQueTieneQueEstarPorId

/*
* BUSCAR los alumnos que deben estar en su clase en ese momento
*/
profesor.buscarLosAlumnosDeSuClaseActual = function (idProfesor,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}//else
	});//time.diaDeLaSemana
	if (connection) {
		// sentencia sql original,comentar para hacer pruebas
		//var sqlProfesorClaseActual = 'SELECT nombre,apellidos,foto FROM alumnos WHERE id_alumno IN (SELECT id_alumno FROM alumno_grupos  WHERE id_grupo IN (SELECT id_grupo FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final))))';
		//para hacer pruebas
		//var sqlProfesorClaseActual = 'SELECT presencia,num_tarjeta,nombre,apellidos,foto FROM alumnos WHERE id_alumno IN (SELECT id_alumno FROM alumno_grupos  WHERE id_grupo IN (SELECT id_grupo FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final))))';
		var sqlProfesorClaseActual = 'SELECT presencia,num_tarjeta,nombre,apellidos,foto FROM alumnos WHERE id_alumno NOT IN (SELECT id_alumno FROM convalidadas WHERE id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final)))) and  id_alumno IN (SELECT id_alumno FROM alumno_grupos  WHERE id_grupo IN (SELECT id_grupo FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final) and id_horario_grupo IN (SELECT id_horario_grupo FROM horario_profesores WHERE id_profesor="'+idProfesor+'"  and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final))))';

		connection.query(sqlProfesorClaseActual, function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				var presenciaArray = [];
				var num_tarjetaArray = [];
				var nombreArray = [];
				var apellidosArray = [];
				var fotoArray = [];
				for (var i= 0;i<row.length;i++){
					var presencia = row[i].presencia;
					var num_tarjeta = row[i].num_tarjeta;
					var nombre = row[i].nombre;
					var apellidos = row[i].apellidos;
					var foto = row[i].foto;//foto del alumno
					var fotofinal = foto.toString('base64');
					presenciaArray.push(presencia);
					num_tarjetaArray.push(num_tarjeta);
					nombreArray.push(nombre); 
					apellidosArray.push(apellidos);
					fotoArray.push(fotofinal);
				}//for
				callback(null,presenciaArray,num_tarjetaArray,nombreArray,apellidosArray,fotoArray);
				console.log('buscarLosAlumnosDeSuClaseActual OK');
			}//else
		});//connection.query
	}//if
}//profesor.buscarLosAlumnosDeSuClaseActual

/*
* BUSCAR profesor por id_profesor, dni, correo y num_tarjeta
*/
profesor.buscarProfesorPorIdDniCorreoNum_tarj = function(id_profesor,dni,correo,num_tarjeta,callback) {
	if (connection) {
		var sql = 'SELECT id_profesor,dni,nombre,apellidos,correo,foto,presencia FROM profesores WHERE id_profesor = ' + connection.escape(id_profesor)+' and dni = '+ connection.escape(dni)+' and correo = '+ connection.escape(correo)+' and num_tarjeta = '+ connection.escape(num_tarjeta);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('buscarProfesorPorIdDniCorreoNum_tarj OK');
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//profesor.buscarProfesorPorIdDniCorreoNum_tarj

/*
* BUSCAR el horario del profesor por correo
*/
profesor.buscarHorarioProfesorPorCorreo = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT p.dia_semana, p.hora_inicio, p.hora_final, a.numero, s.nombre, g.nombre_grupo FROM horario_profesores p LEFT JOIN horario_grupos r ON (p.id_horario_grupo = r.id_horario_grupo) INNER JOIN asignaturas s ON (r.id_asignatura = s.id_asignatura) INNER JOIN grupos g ON (r.id_grupo = g.id_grupo) INNER JOIN aulas a ON (r.id_aula = a.id_aula) WHERE p.id_profesor =(SELECT id_profesor FROM profesores WHERE correo ="'+correo+'")';
		connection.query(sql, function(error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarHorarioProfesorPorCorreo OK');
			}//else
		})//connection.query
	}//if
}//profesor.buscarHorarioProfesorPorCorreo

/*
* BUSCAR el id_profesor del profesor que deberia estar en una aula a una hora concreta
*/
profesor.buscarProfesorPorIdAulaEnUnaHora = function (id_aula,curr_time,callback){
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
			console.log(error);
		}else{
			day = data;
		}//else
	});//time.diaDeLaSemana
	if (connection) {
		var sql = 'SELECT id_profesor FROM horario_profesores WHERE id_horario_grupo IN (SELECT id_horario_grupo FROM horario_grupos WHERE id_aula=' + connection.escape(id_aula)+' AND dia_semana="'+day+'"  AND ('+ connection.escape(curr_time)+' between hora_inicio AND hora_final))';		
		//var sql = 'SELECT id_profesor FROM horario_profesores WHERE id_horario_grupo IN (SELECT id_horario_grupo FROM horario_grupos WHERE id_aula=9 AND dia_semana="Lunes"  AND ("08:00:05" between hora_inicio AND hora_final))';				
		//para pruebas
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				//console.log('buscarProfesorPorIdAulaEnUnaHora OK');
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//profesor.buscarProfesorPorIdAulaEnUnaHora

/*
*	BUSCAR las asignaturas que imparte un profesor por id_profesor
*/
profesor.buscarAsignaturasQueImparte = function(id_profesor,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarAsignaturasQueImparte OK');
			}//else
		});//connection.query
	}//if
}//profesor.buscarAsignaturasQueImparte

/*
*	BUSCAR las asignaturas que no imparte un profesor por id_profesor
*/
profesor.buscarAsignaturasQueNoImpartePorId = function (id_profesor,callback){
	console.log(id_profesor);
	if(connection){						
		var sqllasAsignaturasQueFaltan = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura NOT IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sqllasAsignaturasQueFaltan, function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarAsignaturasQueNoImpartePorId correctamente');
			}//else
		});//connection.query
	}//if
}//profesor.buscarAsignaturasQueNoImpartePorId

/*
*	BUSCAR las asignaturas que no imparte un profesor por tipo
*/
profesor.buscarAsignaturasQueNoImpartePorTipo = function (id_profesor,tipo,callback){
	if(connection){						
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE tipo="'+tipo+'" and id_asignatura NOT IN (SELECT id_asignatura FROM profesores_asignaturas WHERE id_profesor ="'+id_profesor+'")';
		connection.query(sql, function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
				console.log('buscarAsignaturasQueNoImpartePorTipo OK');
			}//else
		});//connection.query
	}//if
}//profesor.buscarAsignaturasQueNoImpartePorTipo

/****************************************************************************************************************************/




/*
* INSERT profesor_asignatura
*/
profesor.insertarAsignaturasProfesor =  function(id_asignatura,id_profesor,callback) {
	if(connection){
		var profesor_asignatura = { id_asignatura: id_asignatura, id_profesor: id_profesor};						
		var sqlinsertarAsignaturasProfesor = 'INSERT INTO profesores_asignaturas SET ?';
		connection.query(sqlinsertarAsignaturasProfesor,profesor_asignatura, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('insertarAsignaturasProfesor OK');
			}//else
		});//connection.query
	}//if
}//profesor.insertarAsignaturasProfesor

/*
* DELETE profesor_asignatura
*/
profesor.borrarAsignaturasProfesor =  function(id_profesor,callback) {
	if(connection){					
		var sqlinsertarAsignaturasProfesor = 'DELETE FROM profesores_asignaturas WHERE id_profesor= "'+id_profesor+'"';
		connection.query(sqlinsertarAsignaturasProfesor, function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarAsignaturasProfesor OK');
			}//else
		});//connection.query
	}//if
}//profesor.borrarAsignaturasProfesor



module.exports = profesor;
