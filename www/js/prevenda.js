/*
*	prevenda
*/

function onLoad(){
	var storage = window.localStorage;
	$("#txt-comanda").text(getComanda());
	$("#txt-vendedor").text(getVendedorNome());
	pesquisaComanda();
}



function pesquisa() {
	var pesquisa = "";
	var com = getComanda();
	var desc = $("#txt-ean").val();
	var produto = desc.toUpperCase();
	setProd(produto);
	window.location.replace("pesquisa.html");
}

function confirmar(){
	var storage = window.localStorage;
	setUltimaComanda(getComanda());
	navigator.vibrate(1000);
	storage.removeItem("comanda");
	sleep(1000);
	window.location.replace("dash.html");
}

$("#btn-finalizar").click(function (e) {
  confirmar();
});

$("#btn-pesq").click(function (e) {
  pesquisa();
});

/*
function definirCategoria(cat) {
	var storage = window.localStorage;
	storage.setItem("controle", JSON.stringify(cat));
	window.location.replace("pesquisa.html");
}

$("#btn-visualizar").click(function (e) {
    visualiza();
});

$("#btn-combo").click(function (e) {
    definirCategoria("c");
});

$("#btn-salgados").click(function (e) {
    definirCategoria("s");
});

$("#btn-bebidas").click(function (e) {
    definirCategoria("b");
});

$("#btn-lanches").click(function (e) {
    definirCategoria("l");
});

$("#btn-sopas").click(function (e) {
	definirCategoria("sp");
});
*/
