var time = {};
var diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
var cron = require('node-schedule');
var cron2 = require('node-schedule');
var horario_grupo = require('../models/horario_grupo');
/*cron*/
var rule = new cron.RecurrenceRule();
var dates;
var fecha;

rule.dayOfWeek = new cron.Range(1,5);
rule.hour = 9;
rule.minute = 12;
/*var date = new Date(2016, 0, 29, 8, 53, 0);
var date2 = new Date(2016, 0, 29, 8, 54, 0);
var date3 = new Date(2016, 0, 29, 8, 55, 0);*/
cron.scheduleJob(rule, function(){
	var dia;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
		}else{
			dia = data;
		}
	})
    console.log(new Date());
    horario_grupo.buscarHoraFinalPorDia(dia,function (error,data) {
    	if (error) {
    		throw error;
    	}else{
    		dates = [];
    		time.diaCompleto(function (error,data) {
    			fecha = data.split("-");
    			console.log(fecha);
    		})//diaCompleto
    		for (var i = 0; i < data.length; i++) {
    			var hora = data[i].hora_final.split(":");
    			var date = new Date(fecha[0],fecha[1]-1,fecha[2],hora[0],hora[1],hora[2]);
    			dates.push(date);
    		};
    		console.log(dates);
    		
    	}//elseError
    })//buscarHoraFinalPorDia



    cron2.scheduleJob(dates,function() {
    	console.log("son las 9:50 Ieeeeeeeepaaaaaaaa");
    });
});


/*fin cron*/

/*
*	devuelve la hora del sistema hh:mm:ss
*/
time.horaActual = function(callback) {
	var now = new Date();
	now.setHours(now.getUTCHours()+1);
	var curr_time;
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	if (hour < 10) {
		hour = "0"+hour;
	};//.if
	if (min < 10) {
		min = "0"+min;
	};//.if
	if (sec < 10) {
		sec = "0"+sec;
	};//.if
	curr_time = hour+":"+min+":"+sec;
	console.log(curr_time);
	if (curr_time) {
		callback(null,curr_time);
	}else{
		console.log("error obteniendo la hora");
	}//.else
}//.time.horaActual

/*
*	devuelve el dia de la semana
*/
time.diaDeLaSemana = function (callback) {
	var now = new Date();
	var day = diasSemana[now.getDay()];
	if (day) {
		callback(null,day);
	}else{
		console.log("Error obteniendo dia");
	}//.else
}//.time.diaDeLaSemana 

/*
*	devuelve el dia completo año,mes,dia xxxx-xx-xx
*/
time.diaCompleto = function (callback) {
	var now = new Date();
	var ano = now.getFullYear();
	var mes = now.getMonth()+1;
	if (mes < 10) {
		mes = "0"+mes;
	};//.if
	var dia = now.getDate();
	var diaCompleto = ano+"-"+mes+"-"+dia;
	if (diaCompleto) {
		callback(null,diaCompleto);
	}else{
		console.log("Error obteniendo dia completo");
	}//.else
}//.time.diaCompleto 

module.exports = time;