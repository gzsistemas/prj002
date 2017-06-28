/*
*	prevenda
*/

function onLoad(){
	var storage = window.localStorage;
	$("#txt-comanda").text(getComanda());
	pesquisar();
}

function pesquisar(){
	var storage = window.localStorage;
	var status = getStatus();
	var ssl = getSSL();
	// Criação do token
	var token = gerarToken();
	console.log(token);
	var empresa = getEmpresa();
	var comanda = getComanda();
	// ------
	var URL = "";
	// Parte que decide qual url usar
	// Status define se é cloud ou não
	if(status == true){
		var url = getUrlbase();
		URL = url + "/services/prevenda_mobile/comanda/consultar?token=" + token + "&empresa=" + empresa + "&comanda=" + comanda;
	} else{
		var url = getUrlbase();
		var protocolo = "http";
		if(ssl == true){
		 procotolo = protocolo + "s";
		}
		protocolo = protocolo + "://";
		var URL = protocolo + url + "/" + "/services/prevenda_mobile/comanda/consultar?token=" + token + "&empresa=" + empresa + "&comanda=" + comanda
	}

	if(checarVazio(comanda) != true){
		toastInfoNoHide("Pesquisando comanda...Aguarde!");
			$.ajax({
				url: URL,
				headers: {
					"Accept":"application/json"
				},
				data: {

				},
				success: function (resposta) {
					var isOk = resposta.ok;
						if(isOk) {
							var prods = [];
							// Produtos que estão na comanda
							prods = resposta.extra.comanda.comanda_item;
							// Criação dos produtos
							for(var i = 0; i<prods.length; i++){
								produtos.push(new Produto(prods[i].sequencia, prods[i].codigo, prods[i].ean, prods[i].descricao,prods[i].complemento, prods[i].precoVenda, prods[i].quantidade));
							}
							if(produtos == null){
								toastInfoNoHide("Não itens na comanda!");
							} else{
								for(var i = 0; i<produtos.length; i++){
									var tr = $("<tr>").append($("<td class='coluna-descricao'>"));
									tr.find(".coluna-descricao").text(produtos[i].ean + " " + "-" + " " + produtos[i].descricao);
									$(tr).append($("<td class='coluna-preco'>"));
									tr.find(".coluna-preco").text(produtos[i].preco);
									$(tr).append($("<td class='coluna-qtd'>"));
									tr.find(".coluna-qtd").text(produtos[i].quantidade);
									$(tr).append($("<td class='coluna-infAdd'>"));
									tr.find(".coluna-infAdd").text(produtos[i].complemento);
									$(tr).appendTo($("#tb-prods"));
								}
							}
						}else{
							toastError("Não foi possível encontrar a comanda!");
						}
				},
				error: function (erro) {
					toastError("Não foi possível pesquisar a comanda!");
				}
			});

	}else{

	}
}

function pesquisa() {
	var pesquisa = "";
	var com = getComanda();
	var desc = $("#txt-ean").val();
	var produto = desc.toUpperCase();
	setProduto(Produto);
	window.location.replace("pesquisa.html");
}

$("#btn-finalizar").click(function (e) {
  window.location.replace("dash.html");
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
