/*
*	Produto Comanda
*/
var produtos = [];

function Produto(sequencia, cod, ean, desc, complemento, preco, quantidade){
	this.sequencia = sequencia;
	this.codigo = cod;
	this.ean = ean;
	this.descricao = desc;
	this.complemento = complemento;
	this.preco = preco;
	this.quantidade = quantidade;
}
