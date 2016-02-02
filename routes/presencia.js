var express = require('express');
var router = express.Router();
var alumno = require('../models/alumno');
var profesor = require('../models/profesor');
var time = require('../models/time');

/* GET presencia page. */
router.get('/', function(req, res, next) {
	//socket.io variable global
	var io = req.app.io;
	var curr_time;
	if (req.query.time == undefined) {
		time.horaActual(function (error,data) {
			if (error) {
				throw error;
			}else{
				curr_time = data;
				console.log(curr_time);
			}//.else
		});//.time.horaActual
	}else{
		curr_time = req.query.time;
	}//.else
	alumno.buscarAlumnoPorTarjeta(req.query.num_tarjeta,function (error,data) {
		if (data.length != 0) {
			if (data[0].tarjeta_activada == 0) {
				console.log("Tarjeta no activada");
				res.send("ko");
			}else{
				alumno.buscarAulaEnLaQueTieneQueEstarPorTarjeta(req.query.num_tarjeta,curr_time,function (error,data) {
					if (data.length != 0) {
						if (error) {
							throw error;
						}else{
							if (req.query.room == data[0].id_aula) {
								alumno.modificarPresenciaDelAlumno(req.query.num_tarjeta,function (error) {
									if (error) {
										res.send("ko");
										console.log("Fallo update presencia alumno");
										throw error;
									}else{
										//emitir al cliente para cambiar color presencia alumno
										io.emit('cambiaServidor',req.query.num_tarjeta);
										console.log("Update alumno ok");
										res.send("ok");
									}//else error
								});//modificarPresenciaDelAlumno
							}else{
								console.log("No esta en el aula que debe");
								res.send("ko");
							}//.else
						}//.else error
					}else{
						console.log("No hay aula asociada");
						res.send("ko");
					}//else data length 0
				});//.alumno.buscarAulaEnLaQueTieneQueEstarPorTarjeta
			}//.else tarjetaActivada
		}else{//.else no es alumno
			profesor.buscarProfesorPorTarjeta(req.query.num_tarjeta,function (error,data) {
				if (data.length != 0) {
					if (data[0].tarjeta_activada == 0) {
						res.send("ko");
					}else{
						profesor.buscarAulaEnLaQueTieneQueEstarPorTarjeta(req.query.num_tarjeta,curr_time,function (error,data) {
							if (data.length != 0) {
								if (error) {
									throw error;
								}else{
									if (req.query.room == data[0].id_aula) {
										profesor.modificarPresenciaProfesor(req.query.num_tarjeta,function (error) {
											if (error) {
												res.send("ko");
												console.log("Fallo update presencia profesor");
												throw error;
											}else{
												console.log("Update presencia profesor ok");
												res.send("ok");
											}//else error
										});//.profesor.modificarPresenciaProfesor
									}else{
										console.log("No esta en el aula que debe");
										res.send("ko");
									}//.else
								}// else error
							}else{
								console.log("No hay aula asociada");
								res.send("ko");
							}//else data.length 0
						});//.profesor.buscarAulaEnLaQueTieneQueEstarPorTarjeta
					}//else TarjetaActivada
				}else{
					console.log("No hay datos de persona asociados");
					res.send("ko");
				}//else data.length 0		
			});//.profesor.buscarProfesorPorTarjeta
		}//else if data.length 0 alumno	
	});//.alumno.buscarAlumnoPorTarjeta
});//.router.get('/', function(req, res, next)

module.exports = router;