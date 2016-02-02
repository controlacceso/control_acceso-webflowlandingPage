var express = require('express');
var router = express.Router();
var horario_profesor = require('../models/horario_profesor');
var horario_grupo = require('../models/horario_grupo');
var multer = require('multer');
var profesor = require('../models/profesor');

router.get('/config/configGlobal/configHorario/agregarHorarioProfesor', function(req, res, next) {
  horario_grupo.buscarTodosLosHorarioGrupo(function (error,gru) {
    if (error) {
      console.log("Fallo buscarTodosLosHorarioGrupo");
      throw error;
    }else{  
        profesor.mostrarTodosLosIdNombreApellidosProfesor(function (error,pro){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioProfesor',{ 
                      grupo:gru,
                      profesor:pro,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdNombreApellidosProfesor
  }//.else
  });//.buscarTodosLosHorarioGrupo
});//.router.get('/agregarHorarioGr', function(req, res, next) {

router.post('/agregarHorarioProfesor', function(req,res,next){
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_profesor = req.body.id_profesor;
  var id_horario_grupo = req.body.id_horario_grupo;     
    horario_profesor.buscarHorarioProfesorExistente(dia_semana,hora_inicio,hora_final,id_profesor, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_profesor.agregarHorarioProfesor(dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_profesor.agregarHorarioProfesor
        }//. else if (row.length == 0)
    }//.else
  });//.horario_profesor.buscarHorarioProfesorExistente
});//.router.post('/agregarHorarioProfesor', function(req,res,next){


router.post('/updateHorarioProfesor',  function(req,res,next){
  var dia_semana = req.body.dia;
  var hora_inicio = req.body.hora_inicio;
  var hora_final = req.body.hora_final;
  var id_profesor = req.body.profesor;
  var id_horario_grupo = req.body.id_horario_grupo;
  var id_horario_profesor = req.body.id_horario_profesor;      
    horario_profesor.buscarHorarioProfesorExistente(dia_semana,hora_inicio,hora_final,id_profesor, function (error,row) {
    if (error) {
      res.send({err:'bd'});
      throw error;
    } else{
        if (row.length>0){
         res.send({err:'existe'});
        } else {
          horario_profesor.modificarHorarioProfesor(id_horario_profesor,dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo, function (error,row) {
              if (error) {
                res.send({err:'bd'});
                throw error;
              } else{ 
                res.send(row);
              }//.else
          });//.horario_profesor.modificarHorarioProfesor
        }//. else if (row.length == 0)
    }//.else
  });//.horario_profesor.buscarHorarioProfesorExistente
});//.router.post('/updateHorarioProfesor',  function(req,res,next){

router.post('/buscarHorarioProfesorNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  horario_profesor.buscarHorarioProfesorPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//horario_profesor.buscarHorarioProfesorPorNombre
});//router.post('/buscarHorarioGrupoNombre', function(req,res,next) {

router.post('/buscarHorarioProfesorPorId', function(req,res,next) {
  var id_horario_profesor = req.body.id_horario_profesor;
  horario_profesor.buscarHorarioProfesorPorId(id_horario_profesor, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//grupo.buscarGrupoPorId
});//router.post('/buscarGrupoPorId', function(req,res,next) {

router.post('/borrarHorarioProfesor', function(req,res,next){
  var id_horario_profesor = req.body.id_horario_profesor;
  horario_profesor.borrarHorarioProfesor(id_horario_profesor, function(error,row) {
    if (error) {
      throw error;
    }else{
      //console.log(row);
      res.send(row);
    }
  })//borrarGrupo
});//router.post('/borrarGrupo', function(req,res,next){

router.post('/mostrarTodosLosProfesoresIdNombreApellidos', function(req,res,next){
  profesor.mostrarTodosLosIdNombreApellidosProfesor(function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//.profesor.mostrarTodosLosIdNombreApellidosProfesor
});//.router.post('/mostrarTodosLosProfesoresIdNombreApellidos', function(req,res,next){

module.exports = router;