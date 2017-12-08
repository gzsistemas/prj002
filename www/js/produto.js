/*
*	Produto Comanda
*/
var produto = [];

function Produto(sequencia, cod, ean, desc, complemento, preco, quantidade, status){
	this.sequencia = sequencia;
	this.codigo = cod;
	this.ean = ean;
	this.descricao = desc;
	this.complemento = complemento;
	this.preco = preco;
	this.quantidade = quantidade;
	this.status = status;
}
