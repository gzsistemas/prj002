/*
*	prevenda
*/

function onLoad(){
	var storage = window.localStorage;
	$("#txt-comanda").text(getComanda());
	$("#txt-vendedor").text(getVendedorNome());
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
								produto.push(new Produto(prods[i].sequencia, prods[i].codigo, prods[i].ean, prods[i].descricao,prods[i].complemento, prods[i].precoVenda, prods[i].quantidade));
								setSequencia(prods[i].sequencia);
							}
							if(produto == null){
								toastInfoNoHide("Não itens na comanda!");
							} else{
								for(var i = 0; i<produto.length; i++){
									var tr = $("<tr>").append($("<td class='coluna-descricao'>"));
									tr.find(".coluna-descricao").text(produto[i].ean + " " + "-" + " " + produto[i].descricao);
									$(tr).append($("<td class='coluna-preco'>"));
									tr.find(".coluna-preco").text(produto[i].preco);
									$(tr).append($("<td class='coluna-qtd'>"));
									tr.find(".coluna-qtd").text(produto[i].quantidade);
									$(tr).append($("<td class='coluna-infAdd'>"));
									tr.find(".coluna-infAdd").text(produto[i].complemento);
									$(tr).appendTo($("#tb-prods"));
								}
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
	setProd(produto);
	window.location.replace("pesquisa.html");
}

function confirmar(){
	var storage = window.localStorage;
	setUltimaComanda(getComanda());
	storage.removeItem("comanda");
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
