/*
	Login.JS - Precisa de verificação caso seja primeiro acesso.
	Último update: 30/12/2016
*/

/*
 * DECLARAÇÃO DE FUNÇÕES
 */

function login() {
    toastInfoNoHide("Aguarde... Fazendo login.");
    
    var storage = window.localStorage;
    var conecSeg = storage.getItem("ConecSeg");

  	var URL = "";

    <url base>/services/mobile/login?token=<token>

  	if(conecSeg == "true"){
  		URL = "https://"+enderecoFormatado()+"/services/login";
  	}else {
  		URL = "http://"+enderecoFormatado()+"/services/login";
  	}

    $.ajax({
        url:URL,
        headers: {
            "Accept":"application/json"
        },
        data: {
            usuario: $("#txt-usuario").val(),
            senha: $("#txt-senha").val()
        },
        success: function (resposta) {
            $.toast().reset("all");
            var isOk = resposta.ok;
            if(isOk) {
                var usuario = resposta.extra.usuario;
                guardarUsuario(usuario);
                window.location.replace("dash.html");
            }else{
                toastError("Login inválido!");
            }
        },
        error: function (erro) {
            $.toast().reset("all");
            toastError("Não foi possível estabelecer conexão com o servidor!");
        }
    });
}
function onLoad() {
    $("#txt-cnpj").val(getEnderecoServidor());
    var usuario = getUsuario();
    $("#txt-usuario").val(usuario.nomeUsuario);
}

function configs() {
  window.location.replace("configs.html");
}
/*
 * FIM DA DECLARAÇÃO DE FUNÇÕES
 */

/*
 * COMANDOS EXECUTADOS AO CARREGAR O SCRIPT
 */
$("#btn-login").click(function (e) {
    login();
});

$("#btn-configs").click(function (e) {
    configs();
});
