var permitirTroca = false;
var impressaoRemota = false;
var local = false;

$('#tgl-permitir-troca, #tgl-impressao-remota').toggles({text:{on:'SIM',off:'NÃO'}});
$('.toggles').toggles({on:false});

/*
* Recupera o estado do toggles que é o switcher na tela do  pdvconfs
*/
$('#tgl-permitir-troca, #tgl-impressao-remota, #tgl-localizar').on('toggle', function(e, active) {
	permitirTroca = active;
	impressaoRemota = active;
	local = active;
});

function onLoad(){
	var storage = window.localStorage;
	var nT = JSON.parse(storage.getItem("numTerm"));// nT - número do terminal
	var v = JSON.parse(storage.getItem("vend")); // v - vendedor
	var ipS = JSON.parse(storage.getItem("endereco-servidor")); // ipS - ip do servidor
	var pmt = JSON.parse(storage.getItem("pmt")); // pmt - Permitir troca de Vendedor
	var ipr = JSON.parse(storage.getItem("ipr")); // ipr - Impressão Remota 
	var local = JSON.parse(storage.getItem("local")); // local - localizar 
	
	$("#txt-terminal").val(nT);
	$("#txt-atendente").val(v);
	$("#txt-ip").val(ipS);
	
	$('#tgl-permitir-troca').toggles({
		on: pmt
	});
	
	$('#tgl-impressao-remota').toggles({
		on: ipr
	});
	
	$('#tgl-localizar').toggles({
		on: local
	});
}

function salvarEstado() {
	var storage = window.localStorage;
	if(consistir() == true) {
		storage.setItem("numTerm", JSON.stringify($("#txt-terminal").val())); // numTerm - número do terminal
		storage.setItem("vend", JSON.stringify($("#txt-atendente").val())); // vend - vendedor
		storage.setItem("endereco-servidor", JSON.stringify($("#txt-ip").val()));// ipserv - ip do servidor
		storage.setItem("pmt", JSON.stringify(permitirTroca));// pmt - Permitir troca de Vendedor
		storage.setItem("ipr", JSON.stringify(impressaoRemota)); // ipr - Impressão Remota
		storage.setItem("local", JSON.stringify(local)); // local - localizar 
		toastInfo("Configuração salva!");
		return true;
	} else {
		toastError("Há campos em branco!");
		return false;
	}
}

function consistir() {
	var numTerm = $("#txt-terminal").val(); // numTerm - número do terminal
	var vend = $("#txt-atendente").val(); // vend - vendedor
	var ipserv = $("#txt-ip").val(); // ipserv - ip do servidor
	
	if(numTerm == ""){
		return false;
	}else if(vend == ""){
		return false;
	}else if(ipserv == ""){
		return false;
	}else{
		return true;
	}
}

$("#btn-salvar").click(function (e) {
	if(salvarEstado() == true){
		salvarEstado();
		window.location.replace("dash.html");		
	}
});

$("#btn-cancelar").click(function (e) {
	window.location.replace("dash.html");
});