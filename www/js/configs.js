/**
 *
 *  Configs.js
 *
 */
 var conexaoSegura = false;

 $('.toggles').toggles({text:{on:'SIM', off:'NÃO'}});

 $('#tgl-conexao-segura').on('toggle', function(e, active) {
 	conexaoSegura = active;
 });

/*
  Definições das funções
 */
function onLoad() {
  var storage = window.localStorage;
  conexaoSegura = JSON.parse(storage.getItem("ConecSeg"));

  $('#tgl-conexao-segura').toggles({
		on: conexaoSegura
	});

  $('.carousel').carousel({
    interval: false
  });
}

function guardar(){
  var user = $("#txt-usuario-cloud").val();
  var senha = $("#txt-senha-cloud").val();
  var empresa = $("#txt-empresa").val();
  var url = "http://homologacao.gzcloud.com.br/flex-e";
  var status = true;
  setUser(user);
  setSenha(senha);
  setEmpresa(empresa);
  setUrlbase(url);
  setStatus(status);
  toastInfoNoHide("Configurações salvas!");
}

function salvar() {
  if($("#txt-empresa").val() == ""){
    toastError("Empresa / Loja não pode ser nula!");
  } else {
    if($("#txt-usuario-cloud").val() == "" | $("#txt-senha-cloud").val() == ""){
      if($("#txt-usuario").val() == "" | $("#txt-senha").val() == "" | $("#txt-url-base").val() == ""){
        toastError("Existem campos em branco!");
      } else{
        alert("teste");
        var user = $("#txt-usuario").val();
        var senha = $("#txt-senha").val();
        var empresa = $("#txt-empresa").val();
        var url = $("#txt-url-base").val();
        var status = false;
        setUser(user);
        setSenha(senha);
        setEmpresa(empresa);
        setUrlbase(url);
        setStatus(status);
        setSSL(conexaoSegura);
        toastInfoNoHide("Configurações salvas!");
        //logar(); ---- modelar no login.js
      }
    } else {
      var storage = window.localStorage;
      var user = JSON.parse(storage.getItem("user"));
      if(user == null){
        guardar();
        //logar(); ---- modelar no login.js
      } else{
        confirmar();
      }
    }
  }
}

function confirmar() {
  bootbox.confirm({
      message: "Utilizar dados Cloud ?",
      size: "small",
      buttons: {
          confirm: {
              label: 'Sim',
              className: 'btn-success'
          },
          cancel: {
              label: 'Não',
              className: 'btn-danger'
          }
      },
      callback: function (result) {
        if (result == true) {
          guardar();
          //logar(); ---- modelar no login.js
        } else {
          //logar(); ---- modelar no login.js
        }
      }
  });


}

/*
  Definições da funções que os botões irão chamar
 */
$("#btn-salvar").click(function (e) {
    salvar();
});

$("#btn-cancelar").click(function (e) {
    window.location.replace("login.html");
});
