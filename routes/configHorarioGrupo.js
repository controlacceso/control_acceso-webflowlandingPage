var express = require('express');
var router = express.Router();
var horario_grupo = require('../models/horario_grupo');
var multer = require('multer');
var aula = require('../models/aula');
var asignatura = require('../models/asignatura');
var grupo = require('../models/grupo');

router.get('/config/configGlobal/configHorario/agregarHorarioGrupo', function(req, res, next) {
  aula.buscarTodosLosIdYNumero(function (error,aul) {
    if (error) {
      console.log("Fallo buscarTodosLosIdYNumero");
      throw error;
    }else{  
    asignatura.buscarTodasLasAsignaturas(function (error,asign) {
      if (error) {
        console.log("Fallo buscarTodasLasAsignaturas");
        throw error;
      }else{
        grupo.buscarTodosLosIdYNombreGrupo(function (error,gru){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioGrupo',{ 
                      grupo:gru,
                      asignatura:asign,
                      aula:aul,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdNombreGrupo
      }//.else
    });//profesor.buscarProfesorPorId
  }//.else
  });//.buscarTodosLosIdYNumero
});//.router.get('/agregarHorarioGr', function(req, res, next) {

router.post('/agregarHorarioGrupo', function(req,res,next){
  console.log(req.body);
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_grupo = req.body.id_grupo;
  var id_asignatura = req.body.id_asignatura;
  var id_aula = req.body.id_aula;     
    horario_grupo.buscarHorarioGrupoExistente(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_grupo.agregarHorarioGrupo(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_grupo.agregarHorarioGrupo
        }//. else if (row.length == 0)
    }//.else
  });//.horario_grupo.buscarHorarioGrupoExistente
});//.router.post('/agregarHorarioGrupo', function(req,res,next){

router.post('/buscarHorarioGrupoHorarioProfesor', function(req,res,next) {
  var id_horario_grupo = req.body.id_horario_grupo;
  horario_grupo.buscarHorarioGrupoPorId(id_horario_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarHorarioGrupoPorId
});//router.post('/buscarHorarioGrupoHorarioProfesor', function(req,res,next) {

router.post('/updateHorarioGrupo',  function(req,res,next){
  var id_horario_grupo = req.body.id_horario_grupo;
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_grupo = req.body.grupo;
  var id_asignatura = req.body.asignatura;
  var id_aula = req.body.aula;     
    horario_grupo.buscarHorarioGrupoExistente(dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_grupo.modificarHorarioGrupo(id_horario_grupo,dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_grupo.modificarHorarioGrupo
        }//. else if (row.length == 0)
    }//.else
  });//.horario_grupo.buscarHorarioGrupoExistente
});//.router.post('/updateHorarioGrupo',  function(req,res,next){

router.post('/buscarHorarioGrupoNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  console.log(req.body);
  horario_grupo.buscarHorarioGrupoPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//horario_grupo.buscarHorarioGrupoPorNombre
});//router.post('/buscarHorarioGrupoNombre', function(req,res,next) {

router.post('/buscarHorarioGrupoPorId', function(req,res,next) {
  var id_horario_grupo = req.body.id_horario_grupo;
  horario_grupo.buscarHorarioGrupoPorId(id_horario_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//grupo.buscarGrupoPorId
});//router.post('/buscarGrupoPorId', function(req,res,next) {

router.post('/borrarHorarioGrupo', function(req,res,next){
  var id_horario_grupo = req.body.id_horario_grupo;
  horario_grupo.borrarHorarioGrupo(id_horario_grupo, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarGrupo
});//router.post('/borrarGrupo', function(req,res,next){  

module.exports = router;