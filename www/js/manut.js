/*
* Manutenção de comanda
*/
function onLoad(){
  var vendedor = getVendedorNome();
  if(vendedor == null){
    $("#txt-vendedor").text("Nenhum");
  } else{
    $("#txt-vendedor").text(vendedor);
  }

  var comanda = getComanda();
  if(comanda == null | comanda == ""){
    $("#txt-comanda").text("");
  } else{
    $("#txt-comanda").text(comanda);
    pesquisaComanda();
  }
}

function confirmar() {
  toastSuccess("Comanda salva com sucesso!");
  window.location.replace("dash.html");
}

function comanda() {
	bootbox.prompt({
	  title: "Comanda",
	  inputType: 'number',
	  message: "Número da Comanda:",
	  size: "small",
	  callback: function(result){
  		if(result == null || result == ""){
  			toastError("Nenhuma comanda encontrada!");
  		}else {
  			setComanda(result);
        window.location.replace("manut.html");
  		}
	  }
	});
}

function abrePainel(){
  var produto = getDescricao();
  bootbox.prompt({
	  title: "Quantidade",
	  value: getQuantidade(),
	  size: "small",
	  inputType: 'number',
	  message: "Mais informações:",
    buttons: {
        confirm: {
            label: 'Alterar',
            className: 'btn-primary'
        },
        cancel: {
            label: 'Excluir',
            className: 'btn-danger'
        }
    },
	  callback: function(resultQtd){
			if(resultQtd == null || resultQtd == "" || resultQtd == 0)
			{
        toastInfoNoHide("Cancelando Item...");

        cancelaItem();

			} else{
				if(
          getQuantidade() == resultQtd){
          toastWarning("Quantidade não alterada!");
        } else{
          toastInfoNoHide("Alterando Item...");
          setQuantidade(resultQtd);
          alteraItem();
        }
			}
		}
	});
}

$("#tb-prods").on("click", '.coluna-descricao', function(event){
  var status = false;
	var index = $(this).index();
	var col1value = $(this).parent().find(".coluna-sequencia").first().text();

	//var codigo = col1value.split(" ", 1);

	for(var i = 0; i<produto.length; i++){
		if(col1value == produto[i].sequencia){
			setProduto(produto[i].codigo);
			setEan(produto[i].ean);
			setPreco(produto[i].preco);
      setDescricao(produto[i].descricao);
      setQuantidade(produto[i].quantidade);
      setSequencia(produto[i].sequencia);
      if(produto[i].status == true){
        status = true;
      }
			break;
		}
	}
  if(status == true){
    toastError("Produto já cancelado!");
  } else{
    abrePainel();
  }
});

$("#btn-limpar").click(function (e) {

});

$("#btn-confirmar").click(function (e) {
  confirmar();
});

$("#btn-pesquisa").click(function (e) {
	comanda();
});

$("#btn-uCom").click(function (e) {
	setComanda(getUltimaComanda());
  window.location.replace("manut.html");
});

$("#btn-menu").click(function (e) {
	window.location.replace("dash.html");
});
