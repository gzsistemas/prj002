/*
	Pesquisa.js
*/

/*
	Função onLoad();

		- Função que é executada ao carregar a página.

		OBS: a definição da função é feita no body da página
*/
function onLoad(){
	pesquisar();
}

/*
	Função pesquisar();

	- Função que realizará as pesquisas no WebService;

*/

function pesquisar() {
	var produto = getProd();
	if(produto == ""){
		toastInfoNoHide("Aguarde... pesquisando!");
		//toastError("Grande Fluxo de dados! Operação lenta!");
		consultaDescricao();
	}else {
		if(isNaN(produto)){
			toastInfoNoHide("Aguarde... pesquisando!");
			consultaDescricao();
			carregarItens(produtos);
		}else{
			toastInfoNoHide("Aguarde... pesquisando!");
			consultaCodigo();
		}
	}
}

/*
	Função abrePainel();

	-Função que gera um bootbox para definir quantidade e complementos;
*/

function abrePainel() {
	bootbox.prompt({
	  title: "Quantidade",
	  value: "1",
	  size: "small",
	  inputType: 'number',
	  message: "Mais informações:",
	  callback: function(resultQtd){
			if(resultQtd == null || resultQtd == "")
			{
				toastError("Produto sem quantidade, não adicionado!");
			} else{
				setQuantidade(resultQtd);
			}
			lancaProduto();
		}
	});
	bootbox.prompt({
	  title: "Informações adicionais",
	  inputType: 'text',
	  message: "Mais informações:",
	  size: "small",
	  callback: function(resultInfAdd){
			if(resultInfAdd == null || resultInfAdd == ""){
				var vazio = null;
				setComplemento(vazio);
			} else{
				var resultadoInfAdd = resultInfAdd.split(" ");
				var result = resultInfAdd.toUpperCase();
				setComplemento(result);
			}
	  }
	});
}

/*
	#btn-voltar

	Botão flutuante que permite retornar a tela prevenda, quando não há produtos;

*/

$("#btn-voltar").click(function (e) {
	window.location.replace("prevenda.html");
});

/*
	#tb-prods

	Define qual produto pegar para enviar
*/

$("#tb-prods").on("click", '.coluna-descricao', function(event){
	var index = $(this).index();
	var col1value = $(this).parent().find(".coluna-descricao").first().text();
	var codigo = col1value.split(" ", 1);

	for(var i = 0; i<produtos.length; i++){
		if(codigo == produtos[i].ean){
			setProduto(produtos[i].codigo);
			setEan(produtos[i].ean);
			setPreco(produtos[i].preco);
			break;
		}
	}

	abrePainel();
});
