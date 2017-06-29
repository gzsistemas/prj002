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
	var produto = getProd();
	var status = getStatus();
	var ssl = getSSL();
	// Criação do token
	var token = gerarToken();
	console.log(token);
	var empresa = getEmpresa();

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
							$('.datatables').dataTable({
								"sDom": "<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'<'col-xs-6'i><'col-xs-6'p>>",
									"iDisplayLength": 5,
									"aLengthMenu": [[5, 10, 20, 30, 50, -1], [5, 10, 20, 30, 50, "All"]],
									"sPaginationType": "bootstrap",
									"oLanguage": {
											"sLengthMenu": "_MENU_ Registros por página",
											"sEmptyTable": "Não há registros para o produto requisitado",
											"sSearch": "",
											"sInfo": "Mostrando _START_ para _END_ de _TOTAL_ registros",
											"sInfoEmpty":"Mostrando 0 para 0 de 0 registros",
											"sInfoFiltered": "(Filtrado de _MAX_ do total de registros)",
											"sZeroRecords": "Nenhum registro encontrado",
									"oPaginate": {
										"sPrevious": "Anterior",
										"sNext": "Próximo"
										}

									}

							});
							$('.dataTables_filter input').addClass('form-control').attr('placeholder','Procurar...');
							$('.dataTables_length select').addClass('form-control');
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
	var produto = getProd();
	var status = getStatus();
	var ssl = getSSL();
	// Criação do token
	var token = gerarToken();
	console.log(token);
	var empresa = getEmpresa();
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
							$('.datatables').dataTable({
								"sDom": "<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'<'col-xs-6'i><'col-xs-6'p>>",
									"iDisplayLength": 5,
									"aLengthMenu": [[5, 10, 20, 30, 50, -1], [5, 10, 20, 30, 50, "All"]],
									"sPaginationType": "bootstrap",
									"oLanguage": {
											"sLengthMenu": "_MENU_ Registros por página",
											"sEmptyTable": "Não há registros para o produto requisitado",
											"sSearch": "",
											"sInfo": "Mostrando _START_ para _END_ de _TOTAL_ registros",
											"sInfoEmpty":"Mostrando 0 para 0 de 0 registros",
											"sInfoFiltered": "(Filtrado de _MAX_ do total de registros)",
											"sZeroRecords": "Nenhum registro encontrado",
									"oPaginate": {
										"sPrevious": "Anterior",
										"sNext": "Próximo"
										}

									}

							});
							$('.dataTables_filter input').addClass('form-control').attr('placeholder','Procurar...');
							$('.dataTables_length select').addClass('form-control');

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

	Lançar produto

	Dados requisatados:
	- Nenhum > todos os parâmetros são pegos pelo prórpio método;

	Dados resultantes:
	- Nenhum > confirmação do item no web services

	OBS:

 */

function lancaProduto(){
	var storage = window.localStorage;
	var status = getStatus();
	var ssl = getSSL();
	// Criação do token
	var token = gerarToken();
	console.log(token);
	var empresa = getEmpresa();
	var comanda = getComanda();
	var vendedor = getVendedorCodigo();
	if(vendedor == null){
		vendedor = 0;
	}
	var operacao = "INCLUIR";
	var impresso = false;
	var sequencia = getSequencia() + 1;
  var quantidade = getQuantidade();
	var complemento = getComplemento();
	var produto = getProduto();
	var ean = getEan();
	var preco = getPreco();


	var URL = "";
	// Parte que decide qual url usar
	// Status define se é cloud ou não
	if(status == true){
		var url = getUrlbase();
		URL = url + "/services/prevenda_mobile/comanda/lancamento";
	} else{
		var url = getUrlbase();
		var protocolo = "http";
		if(ssl == true){
		 procotolo = protocolo + "s";
		}
		protocolo = protocolo + "://";
		var URL = protocolo + url + "/" + "/services/prevenda_mobile/comanda/lancamento";
	}

	$.ajax({
		url: URL,
		method:"POST",
			headers: {
				"Content-Type":"application/x-www-form-urlencoded",
				"Accept":"application/json"
			},
			data: {
				"token": token,
				"empresa": empresa,
				"comanda": comanda,
				"sequencia": sequencia,
				"produto": produto,
				"ean": ean,
				"vendedor": vendedor,
				"preco": preco,
				"quantidade": quantidade,
				"complemento": complemento,
				"impresso": impresso,
				"operacao": operacao
			},

			success: function (resposta) {
				var isOk = resposta.ok;
					if(isOk) {
						toastInfoNoHide("Comanda enviada com sucesso!");
						limparItens();
						window.location.replace("prevenda.html");
					}else{
						toastError("Não foi possível enviar o item!");
					}
			},
			error: function (erro) {
				toastError("Não foi possível realizar o envio! Verifique Internet");
			}
	});
}
