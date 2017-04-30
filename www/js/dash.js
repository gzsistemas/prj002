/*
* Dash
*/

/*
*	Declaração da Função da pesquisa da comanda
*/
function pesquisa(){
	var storage = window.localStorage;
	var endServ = storage.getItem("endereco-servidor");
	var comanda = $("#txt-com").val();
	
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
						  title: "Erro de comanda!",
						  message: "Comanda não cadastrada",
						  size: "small",	
						  callback: function(result){						  
							if(result == null || result == ""){
								toastWarning("Comanda não cadastrada!");
							} else{
								toastWarning("Comanda não cadastrada!");
							}
							
						  }
						});							
							toastError("Comanda não cadastrada");
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

/*
*	Botão de Pesquisa no dash
*/
$("#btn-ok").click(function (e) {
    pesquisa();
});
