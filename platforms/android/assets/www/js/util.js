/*
	Util.JS
	Último update: 14/08/2017
*/
toastr.options = {
	  "closeButton": false,
	  "debug": false,
	  "newestOnTop": true,
	  "progressBar": true,
	  "positionClass": "toast-bottom-center",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "1000",
	  "hideDuration": "1000",
	  "timeOut": "1500",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
}

function myToast(tipo, mensagem) {
	if(tipo == "success") {
		toastr.success(mensagem);
	} else if(tipo == "warning") {
		toastr.warning(mensagem);
	} else if(tipo == "info") {
		toastr.info(mensagem);
	} else if(tipo == "error") {
		toastr.error(mensagem);
	}
}

function myToastNoHide(tipo, mensagem) {
	myToast(tipo, mensagem);
}

function toastSuccess(mensagem) {
    myToast("success", mensagem);
}

function toastInfo(mensagem) {
    myToast("info", mensagem);
}

function toastInfoNoHide(mensagem) {
    myToastNoHide("info", mensagem);
}

function toastError(mensagem) {
    myToast("error", mensagem);
}

function toastWarning(mensagem) {
    myToast("warning", mensagem);
}

function valorEmReais(valor){
	return valor.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

function checarVazio(valor){
    return !valor || !/[^\s]+/.test(valor);
}

function checarNegativo(valor){
	if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
    }
}

function removerAspas(strg){
	var str = strg.replace(/"/g, "");
	var string = str.replace(/^\s+|\s+$/g, "");
	return string;
}

function removerConcha(strg){
	//var string = str.replace(/"/g, "");
	//var string = str.replace(/"/g, "");
	var str = strg.replace(/[]/g, "");
	var string = str.replace(/"/g, "");
	return string;
}


// Novas funções que realizam o novo fluxo
function getUser(){
	var storage = window.localStorage;
	var usuario = JSON.parse(storage.getItem("user"));
	return usuario;
}

function setUser(user){
	var storage = window.localStorage;
	storage.setItem("user", JSON.stringify(user));
}

function getSenha(){
	var storage = window.localStorage;
	var senha = JSON.parse(storage.getItem("password"));
	return senha;
}

function setSenha(senha){
	var storage = window.localStorage;
	storage.setItem("password", JSON.stringify(senha));
}

function getEmpresa(){
	var storage = window.localStorage;
	var empresa = JSON.parse(storage.getItem("empresa"));
	return empresa;
}

function setEmpresa(empresa){
	var storage = window.localStorage;
	storage.setItem("empresa", JSON.stringify(empresa));
}

function getUrlbase(){
	var storage = window.localStorage;
	var url = JSON.parse(storage.getItem("urlbase"));
	return url;
}

function setUrlbase(url){
	var storage = window.localStorage;
	storage.setItem("urlbase", JSON.stringify(url));
}
// O status serve para separar usuários cloud de usuários com servidor interno --
function getStatus(){
	var storage = window.localStorage;
	var status = JSON.parse(storage.getItem("status"));
	return status;
}

function setStatus(status){
	var storage = window.localStorage;
	storage.setItem("status", JSON.stringify(status));
}
// ------------------------------------------------------------------------------

function getSSL(){
	var storage = window.localStorage;
	var ssl = JSON.parse(storage.getItem("ssl"));
	return ssl;
}

function setSSL(ssl){
	var storage = window.localStorage;
	storage.setItem("ssl", JSON.stringify(ssl));
}

function getVendedorNome(){
	var storage = window.localStorage;
	var vendedor = JSON.parse(storage.getItem("vendedorNome"));
	return vendedor;
}

function setVendedorNome(vendedor){
	var storage = window.localStorage;
	storage.setItem("vendedorNome", JSON.stringify(vendedor));
}

function getVendedorCodigo(){
	var storage = window.localStorage;
	var codigo = JSON.parse(storage.getItem("vendedorCodigo"));
	return codigo;
}

function setVendedorCodigo(codigo){
	var storage = window.localStorage;
	storage.setItem("vendedorCodigo", JSON.stringify(codigo));
}

function getProd(){
	var storage = window.localStorage;
	var prod = JSON.parse(storage.getItem("prod"));
	return prod;
}

function setProd(prod){
	var storage = window.localStorage;
	storage.setItem("prod", JSON.stringify(prod));
}

function getComanda(){
	var storage = window.localStorage;
	var comanda = JSON.parse(storage.getItem("comanda"));
	return comanda;
}

function setComanda(comanda){
	var storage = window.localStorage;
	storage.setItem("comanda", JSON.stringify(comanda));
}

function getUltimaComanda(){
	var storage = window.localStorage;
	var ultima = JSON.parse(storage.getItem("ultimaComanda"));
	return ultima;
}

function setUltimaComanda(ultima) {
	var storage = window.localStorage;
	storage.setItem("ultimaComanda", JSON.stringify(ultima));
}

function getSequencia(){
	var storage = window.localStorage;
	var sequencia = JSON.parse(storage.getItem("sequencia"));
	return sequencia;
}

function setSequencia(sequencia) {
	var storage = window.localStorage;
	storage.setItem("sequencia", JSON.stringify(sequencia));
}

function getQuantidade(){
	var storage = window.localStorage;
	var quantidade = JSON.parse(storage.getItem("quantidade"));
	return quantidade;
}

function setQuantidade(quantidade){
	var storage = window.localStorage;
	storage.setItem("quantidade", JSON.stringify(quantidade));
}

function getComplemento(){
	var storage = window.localStorage;
	var complemento = JSON.parse(storage.getItem("complemento"));
	return complemento;
}

function setComplemento(complemento){
	var storage = window.localStorage;
	storage.setItem("complemento", JSON.stringify(complemento));
}

function getProduto(){
	var storage = window.localStorage;
	var produto = JSON.parse(storage.getItem("produto"));
	return produto;
}

function setProduto(produto) {
	var storage = window.localStorage;
	storage.setItem("produto", JSON.stringify(produto));
}

function getEan(){
	var storage = window.localStorage;
	var ean = JSON.parse(storage.getItem("ean"));
	return ean;
}

function setEan(ean) {
	var storage = window.localStorage;
	storage.setItem("ean", JSON.stringify(ean));
}

function getPreco(){
	var storage = window.localStorage;
	var preco = JSON.parse(storage.getItem("preco"));
	return preco;
}

function setPreco(preco) {
	var storage = window.localStorage;
	storage.setItem("preco", JSON.stringify(preco));
}

function getDescricao(){
	var storage = window.localStorage;
	var descricao = JSON.parse(storage.getItem("descricao"));
	return descricao;
}

function setDescricao(descricao){
	var storage = window.localStorage;
	storage.setItem("descricao", JSON.stringify(descricao));
}

function limparItens(){
	var storage = window.localStorage;
	storage.removeItem("complemento");
	storage.removeItem("ean");
	storage.removeItem("preco");
	storage.removeItem("prod");
	storage.removeItem("produto");
	storage.removeItem("quantidade");
	storage.removeItem("sequencia");
}

function logout(){
	var storage = window.localStorage;
	storage.clear();
}

function gerarToken(){
	var usr = getUser();
	var senha = getSenha();
	var token = criarToken(usr,senha);
	return token;
}

// função a parte que identifica e demonstra erros no console
window.addEventListener('error', function(event){

		console.log("Erro de JS:");
		console.log("Mensagem: " + event.message);
		console.log("Em: " + event.filename);
		console.log("Linha: " + event.lineno);

		/*
    var boxError = document.createElement( 'div' );
    boxError.className  = 'box-error';

    boxError.innerHTML  = '<h4>Erro de JS:</h4>';
    boxError.innerHTML += '<p class="msg">'+ event.message +'</p>';
    boxError.innerHTML += '<p>Em: '+ event.filename +'</p>';
    boxError.innerHTML += '<p>Linha: '+ event.lineno +'</p>';

    document.body.appendChild( boxError );
		*/
	
		toastError("Ooops... Algo deu errado!");
    return false;
});

function datatables(){
	$('.datatables').dataTable({
		"sDom": "<'row'<'col-xs-6'l><'col-xs-6'f>r>t<'row'<'col-xs-6'i><'col-xs-6'p>>",
			"iDisplayLength": 5,
		"aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
			"sPaginationType": "bootstrap",
			"oLanguage": {
					"sLengthMenu": "_MENU_ Registros por página",
					"sEmptyTable": "Não há registros para o cliente requisitado",
					"sSearch": "",
					"sInfo": "Mostrando _START_ para _END_ de _TOTAL_ registros",
					"sInfoEmpty":"Mostrando 0 para 0 de 0 registros",
					"sInfoFiltered": "(Filtrado de _MAX_ do total de registros)",
					"sZeroRecords": "Nenhum registro encontrado",
			"oPaginate": {
				"sPrevious": "Anterior",
				"sNext": "Próximo"
				}

			}

	});
	$('.dataTables_filter input').addClass('form-control').attr('placeholder','Procurar...');
	$('.dataTables_length select').addClass('form-control');
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
