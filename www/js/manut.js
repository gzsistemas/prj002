/*
* Manutenção de comanda
*/

var pedCom = [];


function onLoad(){
	// inicializar banco de dados
	//inicializar();
	
	var storage = window.localStorage;
	var nCom = obterComanda();
	
	$("#txt-comanda").text(nCom);
	pedCom = JSON.parse(storage.getItem("pedidoF"+ nCom));
	
	
	var superV = JSON.parse(storage.getItem("supervisor"));
	if(superV == "liberarLimpeza"){
		storage.removeItem("pedidoF"+ nCom);
		storage.removeItem("supervisor");	
		storage.removeItem("liberarLimpeza");	
		window.location.replace("manut.html");
	} else if(superV == "liberar"){
		window.location.replace("dash.html");	
	}else if(superV == "liberarAlt"){
		var result = JSON.parse(storage.getItem("resultado"));
		var produto = JSON.parse(storage.getItem("codigo"));
		        if(result <= "0"){
					var cod = [];
					for(var i = 0; i<pedCom.length; i++){
						cod.push(pedCom[i].codigo);
					}
					var index = cod.indexOf(produto.codigo);
					pedCom.splice(index, 1);	
					storage.setItem("pedidoF" + nCom, JSON.stringify(pedCom));
					window.location.replace("manut.html");
				} else{
					for(var i = 0; i<pedCom.length; i++){
						if(pedCom[i].codigo == produto.codigo){
							pedCom[i].quantidade = result;
							storage.setItem("pedidoF" + nCom, JSON.stringify(pedCom));
							window.location.replace("manut.html");	
						}	
					}
				}
		storage.removeItem("liberarAlt");
		storage.removeItem("supervisor");
		storage.removeItem("codigo");
		storage.removeItem("resultado");
	}	
	if(pedCom != null){
		carregarCom();	
	}
}
/*
*	Ínicio das declarações de funções
*/

/*
*	função que salva alterações da comanda e atualiza a página
*/
function confirmar() {
	var storage = window.localStorage;
	var com = $("#txt-comanda").text();
	var comanda = "";
	
	//storage.setItem("pedidoP" + com, JSON.stringify(itens));
	
	toastInfoNoHide("Finalizado, pedido enviado!");	
	
	//pedCom = JSON.parse(storage.getItem("pedidoP"+com));
	//pedF = JSON.parse(storage.getItem("pedidoF"+com));
	//if(pedF != null){
		//pedCom = pedCom.concat(pedF);	
		//storage.setItem("pedidoF" + com, JSON.stringify(pedCom));
	//}	else{	
	storage.setItem("pedidoF" + com, JSON.stringify(pedCom));
	//}
	//storage.removeItem("pedidoP"+com);
	//storage.removeItem("produtos");
	guardarComanda(comanda);
	storage.setItem("ultimaComanda", JSON.stringify(com));
	window.location.replace("dash.html");
}

function carregarCom(){
	var valor = $("#txt-preco").text();
	pedCom.forEach(function(itm, i){
		var tr = $("<tr>").append($("<td class='coluna-descricao'>"));
		tr.find(".coluna-descricao").text(itm.codigo + " " + "-" + " " + itm.descricao);
		$(tr).append($("<td class='coluna-preco'>"));
		tr.find(".coluna-preco").text(itm.preco);
		$(tr).append($("<td class='coluna-qtd'>"));
		tr.find(".coluna-qtd").text(itm.quantidade);
		$(tr).append($("<td class='coluna-infAdd'>"));
		tr.find(".coluna-infAdd").text(itm.infAdd);
		$(tr).appendTo($("#tb-prods"));
		if(valor == ""){
			valor = Number(itm.preco) * Number(itm.quantidade);			
		} else{
			valor = Number(valor) + (Number(itm.preco) * Number(itm.quantidade));
		}
	});
	$("#txt-preco").text(valor);
}

function adicionar() {
	var storage = window.localStorage;
	var comanda = $("#txt-comanda").text();
	guardarComanda(comanda);
	pedCom = JSON.parse(storage.getItem("pedidoF"+comanda));
	storage.setItem("pedidoP" + comanda, JSON.stringify(pedCom));
	window.location.replace("prevenda.html");
}

function visualizar(){
	var storage = window.localStorage;
	var com = $("#txt-comanda").text();
	//var comanda = "";
	//storage.setItem("pedidoP" + com, JSON.stringify(pedCom));
	toastInfoNoHide("Finalizado, pedido enviado!");	
	//pedCom = JSON.parse(storage.getItem("pedidoP"+com));
	storage.setItem("pedidoF" + com, JSON.stringify(pedCom));
	//storage.removeItem("pedidoP"+com);
	//storage.removeItem("produtos");
	//guardarComanda(comanda);
	storage.setItem("ultimaComanda", JSON.stringify(com));
	window.location.replace("manut.html");
}

function abreCom() {
	var storage = window.localStorage;
	bootbox.prompt({ 
	  title: "Comanda",
	  inputType: 'number',
	  message: "Número da Comanda:", 
	  size: "small",
	  callback: function(result){
		if(result == null || result == ""){
			window.location.replace("manut.html");
			storage.removeItem("comanda");
		}else {
			guardarComanda(result);
			window.location.replace("manut.html");
		}
	  }
	});
}

function abrePainel() {
	var storage = window.localStorage;
	var com = obterComanda();
	bootbox.confirm({
	size: "small",
	title: "Exclusão de item",
	message: "Excluir item selecionado?",
	callback:function(result){
				if(result == true){
				storage.setItem("liberarAlt", JSON.stringify("Sim"));
				window.location.replace("login-supervisor.html");
				} else{
					window.location.replace("manut.html");
				}
			}
	});	
}
/*
*	Fim da declaração de funções
*/


/*
*	O botão confirmar salva as alterações feitas na comanda e atualiza a página de manutenção de comanda
*/
$("#btn-confirmar").click(function (e) {
    confirmar();
});

/*
*	O botão adicionar redireciona o usuário para a página de prevenda ou lançamentos de produtos
*/
$("#btn-add").click(function (e) {
	adicionar();	
});

/*
*	O botão limpar executa a limpeza efetiva da comanda
*/
$("#btn-limpar").click(function (e) {
	var storage = window.localStorage;
	storage.setItem("liberarLimpeza", JSON.stringify("Sim"));
	window.location.replace("login-supervisor.html");	
});

$("#btn-pesquisa").click(function (e) {
	abreCom();
});

$("#btn-visualizar").click(function (e) {
	visualizar();
});

$("#btn-uCom").click(function (e) {
	var storage = window.localStorage;
	var com = JSON.parse(storage.getItem("ultimaComanda"));	
	$("#txt-comanda").text(com);
	guardarComanda(com);
	window.location.replace("manut.html");
});

$("#btn-menu").click(function (e) {
	var storage = window.localStorage;
	var com = $("#txt-comanda").text();
	var comanda = "";	
	storage.setItem("ultimaComanda", JSON.stringify(com));
	guardarComanda(comanda);	
	window.location.replace("dash.html");
});

$("#tb-prods").on("click", '.coluna-descricao', function(event){
	var index = $(this).index();
	var col1value = $(this).parent().find(".coluna-descricao").first().text();
	var codigo = col1value.split(" ", 1);
	var produto = getProduto(codigo);
	var storage = window.localStorage;+
	storage.setItem("codigo", JSON.stringify(produto));
	abrePainel();
});

function getProduto(codigo){
	var prodTmp;
	produtos.forEach(function(produto, i){
		if(produto.codigo == codigo){
			prodTmp = produto;
		}
	});
	return prodTmp;
}