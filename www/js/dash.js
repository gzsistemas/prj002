/*
* Dash
*/

/*
*	Declaração da Função da pesquisa da comanda
*/
function pesquisa(){
	var storage = window.localStorage;
	//var endServ = storage.getItem("endereco-servidor");
  var endServ = enderecoFormatado();
	var comanda = $("#txt-com").val();

	var conecSeg = storage.getItem("ConecSeg");

	var URL = "";

	if(conecSeg == "true"){
		URL = "https://"+endServ+"/services/comanda/consultar?numero="+comanda+"";
	}else {
		URL = "http://"+endServ+"/services/comanda/consultar?numero="+comanda+"";
	}

 	//alert(URL);

	if(checarVazio(comanda) != true){
		toastInfoNoHide("Pesquisando comanda...Aguarde!");
			$.ajax({
				url: "http://"+endServ+"/services/comanda/consultar?numero="+comanda+"",
				headers: {
					"Accept":"application/json"
				},
				mensagem: function(resposta){
					var message = resposta.message;

				},
				data: {

				},
				success: function (resposta) {
					var isOk = resposta.ok;
						if(isOk) {
							var storage = window.localStorage;
							storage.setItem("comanda", JSON.stringify(comanda));

							var prods = [];
							prods = resposta.extra.lista_itenscomanda.itemcomanda;

							for(var i = 0; i<prods.length; i++){
								itsComanda.push(new Produto(i, prods[i].codigoInterno, prods[i].codigoEAN,prods[i].descricao,prods[i].codigoVend,prods[i].tipoPreco,prods[i].quantidade,prods[i].precoUnitario,prods[i].percentualDesconto,prods[i].percentualAcrescimo,prods[i].descontoMultiplo,prods[i].complemento,prods[i].cancelado,prods[i].valorDesconto,prods[i].valorAcrescimo,prods[i].impresso));
							}

							var comand = JSON.stringify(itsComanda).replace("[", "").replace("]", "");


							storage.setItem("pedidoP"+comanda, comand);
							storage.setItem("itsComanda", comand);
							window.location.replace("prevenda.html");
						}else{
							bootbox.confirm({
                                title: "Aviso",
                                message: resposta.mensagem,
                                size: "small",
                                callback: function(result){

                                }
                            });
						}
				},
				error: function (erro) {
					toastError("Não foi possível pesquisar a comanda!");
				}
			});

	}else{
		toastError("Digite uma comanda para continuar!");
		document.getElementById("txt-com").select();
	}
}

function onLoad() {
	var storage = window.localStorage;
	var ip = storage.getItem("endereco-servidor");
	var cod = storage.getItem("vendedor");
	var nome = "Franscico";
	$("#txt-servidor").text(enderecoFormatado());
	$("#txt-vendedor").text(cod +" - " + nome);
}

function troca() {
	window.location.replace("trocaOperador.html");
}

/*
*	Botão de Pesquisa no dash
*/
$("#txt-vendedor").click(function (e) {
	troca();
});

$("#btn-ok").click(function (e) {
    pesquisa();
});
