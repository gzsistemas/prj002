$(function(){
	carregaOpcoes();
});

function carregaOpcoes() {
	// Coloque aqui os códigos para carregar as opções.
}

/*
// Botão APLICAR da limpeza de dados
*/
$("#btn-limpardados").click(function (e) {
	window.localStorage.clear();
	window.location.href = "login.html";
});

/*
// Botão APLICAR do botão de configurações do PDV
*/
$("#btn-configurar").click(function (e) {
	window.localStorage.clear();
	window.location.href = "pdvconf.html";
});