/*
	Pesquisa

	Página que realizará pesquisas no banco
*/


/*
	Definição do array que irá conter os os itens já selecionados anteriormente.
*/
var itens = [];
/*
		Função onload

	Função que é realizada uma única vez pelo programa para definir o que será pesquisado,
	a função pode ser realizada mais vezes, porém ela é chamada pela própria página quando iniciada.
*/
function onLoad(){
	var storage = window.localStorage;
	var controle = JSON.parse(storage.getItem("controle"));
	if(controle == "c") {
		toastInfo("O item: Combos foi selecionado!");
		storage.setItem("produto", JSON.stringify("COMBOS"));
		pesquisar();
		storage.removeItem("controle");
	} else if(controle == "s") {
		toastInfo("O item: Salgados foi selecionado!");
		storage.setItem("produto", JSON.stringify("SALGADOS"));
		pesquisar();
		storage.removeItem("controle");
	} else if(controle == "b") {
		toastInfo("O item: Bebidas foi selecionado!");
		storage.setItem("produto", JSON.stringify("BEBIDAS"));
		pesquisar();
		storage.removeItem("controle");
	} else if(controle == "l") {
		toastInfo("O item: Lanches foi selecionado!");
		storage.setItem("produto", JSON.stringify("LANCHES"));
		pesquisar();
		storage.removeItem("controle");
	} else if(controle == "sp") {
		toastInfo("O item: Sopas foi selecionado!");
		storage.setItem("produto", JSON.stringify("SOPAS"));
		pesquisar();
		storage.removeItem("controle");
	} else if(controle == "") {
		storage.removeItem("controle");
		pesquisar();
	}
}
/*
		Pesquisa do Produtos

	Dados requisitados:
	- nenhum > Função pega as informações sem a nescessidade de parâmetros;

	Dados resultantes:
	- Atualização de tela > Carregamento na tela os produtos encontrados;

	OBS:
	- se o campo produto estiver em branco a função realizará uma requisição grande, mensagem de erro avisa os clientes;

*/
function pesquisar() {
	var storage = window.localStorage;
	var produto = JSON.parse(storage.getItem("produto"));
	var endServ = removerAspas(storage.getItem("endereco-servidor"));

	if(produto == ""){
		toastInfoNoHide("Aguarde... pesquisando!");
		//toastError("Grande Fluxo de dados! Operação lenta!");
		consultaDescricao();
	}else {
		if(isNaN(produto)){
			toastInfoNoHide("Aguarde... pesquisando!");
				consultaDescricao(endServ,produto);
				carregarItens(produtos);
		}else{
			toastInfoNoHide("Aguarde... pesquisando!");
			consultaCodigo();
		}
	}
}
/*
		Abre painel função que carrega o bootbox

	Dados requisitados:
	- codigo > Código do produto que foi escolhido na tabela demonstrada;

	Dados resultantes:
	- qtd > quantidade do produto selecionado;
	- InfAdd > Informações adicionais que o cliente requisitou;

	OBS:
	- O código do produto é retirado da tabela demonstrada e separado da descrição;

*/
function abrePainel(codigo) {

	var cod = codigo;
	var rQtd;
	var infAdd;
	var storage = window.localStorage;
	/*
		BootBox que solicita a quantidade
	*/
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
			storage.setItem("qtdTemp", JSON.stringify(resultQtd));
			rQtd = JSON.parse(storage.getItem("qtdTemp"));
			infAdd = JSON.parse(storage.getItem("infAddTemp"));

			for(var i = 0; i<rQtd; i++){
				item.infAdd = infAdd;
				item.quantidade = "1";
				itens.push(item);
			}
			//Remoção de variaveís do storage
			storage.removeItem("indAddTemp");
			storage.removeItem("qtdTemp");

			//Adiciona os itens a tela de lançamento
			adiciona();
		}
	  }
	});
	/*
		Bootbox que solicita as informações adicionais.
	*/
	bootbox.prompt({
	  title: "Informações adicionais",
	  inputType: 'text',
	  message: "Mais informações:",
	  size: "small",
	  callback: function(resultInfAdd){

		if(resultInfAdd == null || resultInfAdd == ""){
			//toastWarning("Produto sem Informações Adicionais!");
			storage.setItem("infAddTemp", JSON.stringify("-"));
		} else{
			var resultadoInfAdd = resultInfAdd.split(" ");
			var result = resultInfAdd.toUpperCase();
			storage.setItem("infAddTemp", JSON.stringify(result));
		}

	  }
	});
}
/*
		Adiciona Produtos

	Dados requisitados:
	- nenhum > As informações são obtidas pela própria função;

	Dados resultantes:
	- itsCom > Itens da Comanda recém adicionados;

	OBS:
	- Após criar a variavél itsCom na memória do aparelho, um retorno a página prevenda.html é realizada;

*/
function adiciona() {
	var comand = [];
	var pedido = [];
	var storage = window.localStorage;
	var comanda = removerAspas(JSON.parse(storage.getItem("comanda")));
	var endServ = removerAspas(storage.getItem("endereco-servidor"));
	pedido.push(storage.getItem("itsCom"));
	
	alert(pedido);

	if(pedido == ""){
		comand.push(itens);
		storage.setItem("pedidoP"+comanda, comand);
		storage.setItem("itsCom", comand);
	}else{
		var com = pedido.concat(itens);
		storage.setItem("pedidoP"+comanda, com);
		storage.setItem("itsCom", com);
	}
	window.location.replace("prevenda.html");
}

/*
		Botão de retorno da pesquisa

	Realiza um relocação de página onde,
	caso não exista nenhum produto com o que foi pesquisado,
	tornando-se possível voltar a página anterior

*/
$("#btn-voltar").click(function (e) {
	window.location.replace("prevenda.html");
});
/*
		Escolha do produto

	Nesta "Função" é realizado o processo de escolha de produtos,
	onde o cliente ao clicar sobre o produto é automaticamente pego:

	- Sua Descrição;

	Após sua descrição ser atribuída a uma variável, é cortado a descrição,
	e comparado com o seu "Produto" original no array Produtos.

*/
$("#tb-prods").on("click", '.coluna-descricao', function(event){
	var index = $(this).index();
	var col1value = $(this).parent().find(".coluna-descricao").first().text();
	var codigo = col1value.split(" ", 1);
	var cod = removerAspas(JSON.stringify(codigo[0]));
	var codLimp = removerAspas(cod);

	var i = $(this).parent().find(".coluna-id").first().text();

	var itn = removerAspas(JSON.stringify(produtos[i].codigo));

	if(cod == itn ){
		item.push(JSON.stringify(produtos[i]))
	}
	abrePainel(codigo);
});
