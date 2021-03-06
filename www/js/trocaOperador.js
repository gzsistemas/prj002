/**
 *
 *  trocaOperador.js
 *
 */

function alterar() {
  if($("#txt-cod").val() == ""){
    toastError("A campo não pode ser em branco!");
    $("#cod").addClass("has-error");
  } else{
    $("#cod").removeClass("has-warning");
    var storage = window.localStorage;
    toastInfoNoHide("Aguarde...Validando!");
    var status = getStatus();
    var ssl = getSSL();
    // Criação do token
    var token = gerarToken();
    console.log(token);
    var empresa = getEmpresa();
    var codigo = $("#txt-cod").val();
    // ------
    var URL = "";
    // Parte que decide qual url usar
    // Status define se é cloud ou não
    if(status == true){
      var url = getUrlbase();
      URL = url + "/services/cadastro/vendedor?token=" + token + "&empresa=" + empresa + "&codigo=" + codigo;
    } else{
      var url = getUrlbase();
      var protocolo = "http";
      if(ssl == true){
       procotolo = protocolo + "s";
      }
      protocolo = protocolo + "://";
      var URL = protocolo + url + "/services/cadastro/vendedor?token=" + token + "&empresa=" + empresa + "&codigo=" + codigo;
    }
    $.ajax({
      url:URL,
      headers: {
        "Accept":"application/json"
      },
      data: {
      },
      success: function (resposta) {

        var isOk = resposta.ok;
        if(isOk) {
          var vendedor = resposta.extra.lista_vendedor.vendedor;
          if(vendedor == ""){
            toastr.clear();
            toastError("Vendedor não encontrado!");
            var vazio = "";
            $("#cod").addClass("has-error");
            $("#txt-cod").val(vazio);
            $("#txt-cod").focus();
          } else {
            var nome = resposta.extra.lista_vendedor.vendedor[0].nome;
            var codigo = resposta.extra.lista_vendedor.vendedor[0].codigo;
            setVendedorNome(nome);
            setVendedorCodigo(codigo);
            window.location.replace("dash.html");
          }
        }else{
          toastError("vendedor inválido! Verificar cadastro!");
        }
      },
      error: function (erro) {
        toastError("Não foi possível estabelecer conexão com o servidor!");
      }
    });
  }
}

 /**
  *
  * Definições dos botões
  *
  */

 $("#btn-alterar").click(function (e) {
     alterar();
 });

 $("#btn-cancelar").click(function (e) {
     window.location.replace("dash.html");
 });
