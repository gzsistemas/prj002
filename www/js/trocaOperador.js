/**
 *
 *  trocaOperador.js
 *
 * última atualização 23/05/2017
 */

function alterar() {
  var storage = window.localStorage;
  var codigo = $("#txt-cod").val();
  if(codigo == ""){
    toastError("Código do vendedor, não pode ser nulo ou ter letras!")
  } else{
    toastInfoNoHide("Vendedor alterado com sucesso!");
    storage.setItem("vendedor", codigo);
    window.location.replace("dash.html");
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
