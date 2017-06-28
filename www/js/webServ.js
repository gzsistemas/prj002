/*
*	Metódos relacionados ao WebService
*/

/*
		Consulta de Produtos descrição

	Dados requisitados:
	- endServ > Enderço do servido onde está alocado o WebService;

	- produto > Resultado do campo onde o cliente digitou;

	Dados resultantes:
	- produtos > Array dos itens que resultaram da pesquisa feita com a descrição buscada;

	OBS:
	- Todos os toast indicam como está a comunicação com o WebService;
*/

function consultaDescricao(){
	var storage = window.localStorage;
	var produto = getProduto();
	var status = getStatus();
	var ssl = getSSL();
	// Criação do token
	var token = gerarToken();
	console.log(token);
	var empresa = getEmpresa();
	var comanda = $("#txt-com").val();
	// ------
	var URL = "";
	// Parte que decide qual url usar
	// Status define se é cloud ou não
	if(status == true){
		var url = getUrlbase();
		URL = url + "/services/prevenda_mobile/cadastro/produto/listar?token=" + token + "&empresa=" + empresa + "&descricao=" + produto;
	} else{
		var url = getUrlbase();
		var protocolo = "http";
		if(ssl == true){
		 procotolo = protocolo + "s";
		}
		protocolo = protocolo + "://";
		var URL = protocolo + url + "/" + "/services/prevenda_mobile/cadastro/produto/listar?token=" + token + "&empresa=" + empresa + "&comanda=" + comanda
	}

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
					prods = resposta.extra.produto.produto;
						if(prods == ""){
							toastError("Não há produtos com essa pesquisa!");
						}else{
							for(var i = 0; i<prods.length; i++){
								produtos.push(new Produtos(prods[i].codigo, prods[i].ean, prods[i].descricao, prods[i].preco));
							}
							carregarItens(produtos);
						}
				}else{
					toastError("Não há produtos com essa pesquisa!");
				}
		},
		error: function (erro) {
			toastError("Não foi possível realizar a pesquisa!");
		}
	});
}
/*
		Consulta de Produtos Código

	Dados requisitados:
	- endServ > Enderço do servido onde está alocado o WebService;

	- produto > Resultado do campo onde o cliente digitou;

	Dados resultantes:
	- produtos > Array do item que resultou da pesquisa feita com o código buscado;

	OBS:
	- Todos os toast indicam como está a comunicação com o WebService;

*/
function consultaCodigo(){
	var storage = window.localStorage;
	var produto = getProduto();
	var status = getStatus();
	var ssl = getSSL();
	// Criação do token
	var token = gerarToken();
	console.log(token);
	var empresa = getEmpresa();
	var comanda = $("#txt-com").val();
	// ------
	var URL = "";
	// Parte que decide qual url usar
	// Status define se é cloud ou não
	if(status == true){
		var url = getUrlbase();
		URL = url + "/services/prevenda_mobile/cadastro/produto?token=" + token + "&empresa=" + empresa + "&codigo=" + produto;
	} else{
		var url = getUrlbase();
		var protocolo = "http";
		if(ssl == true){
		 procotolo = protocolo + "s";
		}
		protocolo = protocolo + "://";
		var URL = protocolo + url + "/" + "/services/prevenda_mobile/cadastro/produto?token=" + token + "&empresa=" + empresa + "&codigo=" + comanda
	}

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
					prods = resposta.extra.produto.produto;
						if(prods == ""){
							toastError("Não há produtos com essa pesquisa!");
						}else{
							for(var i = 0; i<prods.length; i++){
								produtos.push(new Produtos(prods[i].codigo, prods[i].ean, prods[i].descricao, prods[i].preco));
							}
							carregarItens(produtos);
						}
				}else{
					toastError("Não há produtos com essa pesquisa!");
				}
		},
		error: function (erro) {
			toastError("Não foi possível realizar a pesquisa!");
		}
	});
}

/*
		Carregamento dos Produtos

	Dados requisitados:
	- arr > Array dos produtos que serão carregados;

	Dados resultantes:
	- Nenhum > Carregamento na tela;

	OBS:
	- Deve haver uma table na página que será carregada;

*/
function carregarItens(arr){
	arr.forEach(function(arr, i){
		var tr = $("<tr>").append($("<td class='coluna-id'>"));
		tr.find(".coluna-id").text(i);
		$(tr).append($("<td class='coluna-descricao'>"));
		tr.find(".coluna-descricao").text(arr.ean + " " + "-" + " " + arr.descricao);
		$(tr).append($("<td class='coluna-preco'>"));
		tr.find(".coluna-preco").text(arr.preco);
		$(tr).appendTo($("#tb-prods"));
	});
}
/*
		Carregamento da Comanda

	Dados requisitados:
	- arr > Array da Comanda que será carregada;

	Dados resultantes:
	- Nenhum > Carregamento na tela;

	OBS:
	- Deve haver uma table na página que será carregada;

*/
/*
function carregarComanda(arr){
	arr.forEach(function(arr, i){
		var tr = $("<tr>").append($("<td class='coluna-descricao'>"));
		tr.find(".coluna-descricao").text(arr[0][i].codigo + " " + "-" + " " + arr[0][i].descricao);
		$(tr).append($("<td class='coluna-preco'>"));
		tr.find(".coluna-preco").text(arr[0][i].preco);
		$(tr).append($("<td class='coluna-qtd'>"));
		tr.find(".coluna-qtd").text(arr[0][i].quantidade);
		$(tr).append($("<td class='coluna-infAdd'>"));
		tr.find(".coluna-infAdd").text(arr[0][i].infAdd);
		$(tr).appendTo($("#tb-prods"));
	});

}
*/
/*

	Lançar produto

	Dados requisatados:
	- item > item selecionado pelo cliente;

	Dados resultantes:
	- Nenhum > confirmação do item no web services

	OBS:

 */

function lancaProduto(item){

}

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
