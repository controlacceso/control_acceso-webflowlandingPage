var express = require('express');
var router = express.Router();
var time = require('../models/time');
var alumno = require('../models/alumno');
var asignatura = require('../models/asignatura');


/*
******************************MOSTAR********************************


router.get('/mostrar/mostrarAlumnoportarjeta', function(req, res, next) {
	alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta, function (error,data) {
		if (error) {
			res.send("ko");
			console.log("Fallo update presencia alumno");
			throw error;
		}else{
			//emitir al cliente para cambiar color presencia alumno
			res.json(data);
		}//else error
	});//modificarPresenciaDelAlumno
});//

router.get('/mostrar/buscarTodoslosAlumnos', function(req, res, next) {
	alumno.buscarTodoslosAlumnos(function (error,data) {
		if (error) {
			res.send("ko");
			console.log("Fallo update presencia alumno");
			throw error;
		}else{
			//emitir al cliente para cambiar color presencia alumno
			res.json(data);
		}//else error
	});//modificarPresenciaDelAlumno
});//


******************************AGREGAR********************************


router.post('/agregar/agregarAsignatura', function(req, res, next) {
	asignatura.agregarAsignatura(req.query.nombre,req.query.clave,req.query.obligatoria,req.query.tipo,function (error,data) {
		if (error) {
			res.send("ko");
			console.log("Fallo agregarAlumno");
			throw error;
		}else{
			//emitir al cliente para cambiar color presencia alumno
			res.json(data);
		}//else error
	});//modificarPresenciaDelAlumno
});//


router.post('/agregar/insertarSinFoto', function(req, res, next) {
	alumno.agregarAlumno(req.query.dni,req.query.nombre,req.query.apellidos,req.query.correo,req.query.num_tarjeta,function (error,data) {
		if (error) {
			res.send("ko");
			console.log("Fallo insertarSinFoto");
			throw error;
		}else{
			//emitir al cliente para cambiar color presencia alumno
			res.json(data);
		}//else error
	});//insertarSinFoto
});//*/

module.exports = router;