/*
*	prevenda
*/

var itens = [];
var pedCom = [];
var pedF = [];

/*
* Declaração de Função
*/
function onLoad(){
	var comanda = obterComanda();
	$("#txt-comanda").text(comanda);
	var storage = window.localStorage;
	var teste = storage.getItem("pedidoP"+comanda);
	var com = "["+teste+"]";
	var hey = JSON.parse(com);
	if(com == null){
		var tr = $("<tr>").append($("<td class='coluna-descricao'>"));
			tr.find(".coluna-descricao").text(com.codigo + " " + "-" + " " + com.descricao);
			$(tr).append($("<td class='coluna-preco'>"));
			tr.find(".coluna-preco").text(com.preco);
			$(tr).append($("<td class='coluna-qtd'>"));
			tr.find(".coluna-qtd").text(com.quantidade);
			$(tr).append($("<td class='coluna-infAdd'>"));
			tr.find(".coluna-infAdd").text(com.infAdd);
			$(tr).appendTo($("#tb-prods"));
	} else{
		for(var i = 0; i<hey.length; i++){
			var tr = $("<tr>").append($("<td class='coluna-descricao'>"));
			tr.find(".coluna-descricao").text(hey[i].codigo + " " + "-" + " " + hey[i].descricao);
			$(tr).append($("<td class='coluna-preco'>"));
			tr.find(".coluna-preco").text(hey[i].preco);
			$(tr).append($("<td class='coluna-qtd'>"));
			tr.find(".coluna-qtd").text(hey[i].quantidade);
			$(tr).append($("<td class='coluna-infAdd'>"));
			tr.find(".coluna-infAdd").text(hey[i].infAdd);
			$(tr).appendTo($("#tb-prods"));
		}
	}
}


function definirCategoria(cat) {
	var storage = window.localStorage;
	storage.setItem("controle", JSON.stringify(cat));
	window.location.replace("pesquisa.html");
}

function finaliza(){
	adiciona("dash.html");
}

function visualiza(){
	adiciona("dash.html");
}


function pesquisar() {
	var storage = window.localStorage;
	var pesquisa = "";
	var it = storage.getItem("itsCom");
	var its = "["+it+"]";
	var itens = JSON.parse(its);
	var com = obterComanda();

	if($(".coluna-descricao").text() == ""){
		var prod = $("#txt-ean").val();
		var item = prod.toUpperCase();
		storage.setItem("controle", JSON.stringify(pesquisa));
		storage.setItem("produto", JSON.stringify(item));
		storage.setItem("pedidoP"+com, "");
		window.location.replace("pesquisa.html");
	} else{

		if(itens == ""){
			var prod = $("#txt-ean").val();
			var item = prod.toUpperCase();
			storage.setItem("controle", JSON.stringify(pesquisa));
			storage.setItem("produto", JSON.stringify(item));
			storage.setItem("pedidoP"+com, "");
			window.location.replace("pesquisa.html");
		} else{
			storage.setItem("pedidoP" + com, JSON.stringify(itens));
			var prod = $("#txt-ean").val();
			var item = prod.toUpperCase();
			storage.setItem("controle", JSON.stringify(pesquisa));
			storage.setItem("produto", JSON.stringify(item));
			storage.setItem("pedidoP"+com, "");
			window.location.replace("pesquisa.html");
		}

	}
}

/*
function abrePainel(codigo) {
	var storage = window.localStorage;
	var com = obterComanda();
	bootbox.confirm({
	size: "small",
	title: "Exclusão de item",
	message: "Excluir item selecionado?",
	callback:function(result){
			if(result == true){

			} else{

			}
		}
	});
}
*/

function adiciona(destino) {
	var itensComanda = [];
	var storage = window.localStorage;
	//var endServ = removerAspas(storage.getItem("endereco-servidor"));
    var endServ = removerAspas(enderecoFormatado());
	var comanda = removerAspas(storage.getItem("comanda"));
	var pedAnt = storage.getItem("itsComanda");
	if(pedAnt == ""){
		var comand = storage.getItem("itsCom");
		var coma = "["+comand+"]";
		var com = JSON.parse(coma);

	}else{
		var comand = storage.getItem("itsCom");
		var pedido = pedAnt.concat(",").concat(comand);
		var coma = "["+pedido+"]";
		var com = JSON.parse(coma);

	}

	var envio = 0;

	for(var i = 0; i<com.length; i++){
		itensComanda.push(new ItemComanda(i, comanda,(i+1) ,com[i].codigo, com[i].ean,com[i].descricao,com[i].codigoVend,com[i].tipoPreco,com[i].quantidade,com[i].preco,com[i].percentualDesconto,com[i].percentualAcrescimo,com[i].descontoMultiplo,com[i].infAdd,com[i].cancelado,com[i].valorDesconto,com[i].valorAcrescimo,com[i].impresso));
	}
	toastInfoNoHide("Enviando comanda...aguarde!");
	$.ajax({
		url: "http://"+endServ+"/services/comanda/enviar",
		method:"POST",
			headers: {
				"Content-Type":"application/x-www-form-urlencoded",
				"Accept":"application/json"
			},
			data: {
				"data":JSON.stringify(itensComanda)
			},

			success: function (resposta) {
				var isOk = resposta.ok;
					if(isOk) {
						toastInfo("Comanda Enviada com sucesso!");
						storage.removeItem("itsCom");
						storage.removeItem("pedidoP"+comanda);

						storage.setItem("ultimaComanda", JSON.stringify(comanda));
						storage.removeItem("comanda");
						window.location.replace(destino);
					}else{
						toastError("Não foi possível enviar comanda!");
					}
			},
			error: function (erro) {
				toastError("Não foi possível realizar o envio! Verifique Internet");
			}
	});

}

/*
*	Fim das declarações
*/

/*
$("#tb-prods").on("click", '.coluna-descricao', function(event){
	var index = $(this).index();
	var col1value = $(this).parent().find(".coluna-descricao").first().text();
	var teste = col1value.trim();
	alert(teste);
	var codigo = teste.split(" ", 1);
	//var produto = getProduto(codigo);
	alert(codigo);
	abrePainel(codigo);
});
*/
/*
*	Botão na tela de Prevenda que carrega a finalização
*/

$("#btn-finalizar").click(function (e) {
    finaliza();
});

$("#btn-pesq").click(function (e) {
    pesquisar();
});

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
