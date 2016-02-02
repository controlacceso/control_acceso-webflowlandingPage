var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var time = require('../models/time');
var alumno = require('../models/alumno');
var md5 = require('blueimp-md5');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ControlFid'});
});//.router.get('/', function(req, res, next)

/* POST login page. */
router.post('/login',function(req,res) {
	console.log(req.body);
	var user = req.body.user;
	var pass = req.body.pass;
	console.log(pass);
	var hash = md5(pass,'2063c1608d6e0baf80249c42e2be5804');
	console.log(hash);
	var admin = req.body.administrador;
	profesor.buscarProfesorPorCorreo(user, function (error,data) {
		if (error) {
			throw error;
		}else if (data.length == 0) {
			console.log("no existe");
			res.render('index', { title: 'ControlFid', info: 'Usuario no existe'}); 
		}else{
			if (hash != data[0].password) {
				console.log("password incorrecto");
				res.render('index', { title: 'ControlFid', info: 'Password incorrecto'});
				//render index with layout password mal
			}else{
				//req.session.name = data[0].nombre;
				//req.session.id_profesor = data[0].id_profesor;
				if (admin == undefined) {
					res.redirect('/vistaProfesor?idProfesor='+data[0].id_profesor);
				}else if(admin == 1 && data[0].admin == 1){
					res.redirect('/config');
				}else if(data[0].admin == 0 && admin == 1){
					res.render('index', { title: 'ControlFid', info: 'No tienes permiso de administrador'});
				}			
			}//.else
		}//.else
	});//.profesor.buscarProfesorPorCorreo
});//.router.post('/login',function(req,res)

/* Buscar personas */
router.get('/buscarPersona',function(req,res) {
	//******Controlar session
	var nombre = req.query.nombre;
	var apellidos = req.query.apellidos;
	var dni = req.query.dni;
	var correo = req.query.correo;
	if (correo.length == 0 && dni.length == 0) {
		alumno.buscarAlumnoPorNombreYApellido(nombre, apellidos, function (error,data) {
			if(error){
				console.log(error);
				throw error;
			}else{
				if (data.length != 0) {
					res.send(data);
				}else{
					profesor.buscarProfesorPorNombreYApellido(nombre, apellidos, function (error,data) {
						if (error) {
							console.log(error);
							throw error;
						}else{
							res.send(data);
						}//else error
					})//buscarProfesorPorNombreYApellido
				}//else data-length != 0
			}//else error
		});//buscarAlumnoPorNombreYApellido
	}else if(correo.length == 0){
		alumno.buscarAlumnoPorDni(dni, function (error,data) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				if (data.length != 0) {
					res.send(data);
				}else{
					profesor.buscarProfesorPorDni(dni, function (error,data) {
						if (error) {
							console.log(error);
							throw error;
						}else{
							res.send(data);
						}
					})//buscarProfesorPorDni
				}//else es alumno
			}//else error
		});//buscarAlumnoPorDni
	}else{
		alumno.buscarAlumnoPorCorreo(correo, function (error,data) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				if (data.length != 0) {
					res.send(data);
				}else{
					profesor.buscarProfesorPorCorreo(correo, function (error,data) {
						if (error) {
							console.log(error);
						}else{
							res.send(data);
						}
					})//buscarProfesorPorCorreo
				}//else data == 0
			}//else error
		})//buscarAlumnoPorCorreo
	}//else correo == 0
});//router.get('/buscarPerosna')

/*Buscar aula de la persona a buscar*/
router.get('/buscarAulaPersona',function(req,res) {
	var curr_time;
	time.horaActual(function (error,data) {
		if (error) {
			throw error;
		}else{
			curr_time = data;
		}
	});
	var id = req.query.id;
	alumno.buscarAulaEnLaQueTieneQueEstarPorId(id, curr_time, function (error,data) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			if (data.length != 0) {
				res.send(data);
			}else{
				profesor.buscarAulaEnLaQueTieneQueEstarPorId(id,curr_time,function (error,data2) {
					if (error) {
						console.log(error);
						throw error;
					}else{
						if (data2.length != 0) {
							res.send(data2);
						}else{
							res.send({'error':'No tiene clase'});
							console.log("No hay aula asociada");
						}
					}
				})//buscarAulaEnLaQueTieneQueEstarPorId
			}//else if no es alumno
		}
	});//buscarAulaEnLaQueTieneQueEstarPorId
});//buscarAulaPersona

/*logout*/
router.post('/logout',function(req,res) {
	if (req.session) {
        req.session.destroy(function(err){
        	if(err){
            	console.log(err);
        	}else{
        		res.send({'result':'ok'});
        	}
		});
	}
});//Logout

module.exports = router;
