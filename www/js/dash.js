/*
* Dash
*/

/*
*	Declaração da Função da pesquisa da comanda
*/
function pesquisa(){
	var storage = window.localStorage;
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
				mensagem: function(resposta){
					var message = resposta.message;
				},
				data: {

				},
				success: function (resposta) {
					var isOk = resposta.ok;
						if(isOk) {
							setComanda(comanda);														
							window.location.replace("prevenda.html");
						}else{
							var vazio = "";
							$("#txt-com").val(vazio);
							$("#txt-com").focus();
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
	var nomeVend = getVendedorNome();
	if(nomeVend == null){
		$("#txt-vendedor").text("Nenhum");
	} else{
		var cod = getVendedorCodigo();
		$("#txt-vendedor").text(cod +" - " + nomeVend);
	}

	var status = getStatus();
	if(status == true){
		var server = "www.gzcloud.com.br";
	}else {
		var server = getUrlbase();
	}
	$("#txt-servidor").text(server);
}

function troca() {
	window.location.replace("trocaOperador.html");
}

/*
*	Botão de Pesquisa no dash
*/
$("#vendedor").click(function (e) {
	troca();
});

$("#btn-ok").click(function (e) {
    pesquisa();
});
