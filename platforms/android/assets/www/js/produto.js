/*
*	Produtos
*/

function Produto(id, cod, ean, desc, codVend, tPreco, qtde, preco, percentualDesc, percentualAcres, descontMulti, infAdd, cancel, valDesc, valAcres, impres){
	this.id = id;	
	this.codigo = cod;
	this.ean = ean;
	this.descricao = desc;
	this.codigoVend = codVend;
	this.tipoPreco = tPreco;
	this.quantidade = qtde;
	this.preco = preco;
	this.percentualDesconto = percentualDesc;
	this.percentualAcrescimo = percentualAcres;
	this.descontoMultiplo = descontMulti;
	this.infAdd = infAdd;
	this.cancelado = cancel;
	this.valorDesconto = valDesc;
	this.valorAcrescimo = valAcres;
	this.impresso = impres;
}