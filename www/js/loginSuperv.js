/*
* login supervisor
*/
function liberar(){
	var storage = window.localStorage;	
	var liberarLimpeza = JSON.parse(storage.getItem("liberarLimpeza"));
	var liberarAlt = JSON.parse(storage.getItem("liberarAlt"));
	if(liberarLimpeza == "Sim"){
		storage.setItem("supervisor", JSON.stringify("liberarLimpeza"));	
	} else if(liberarAlt == "Sim"){
		storage.setItem("supervisor", JSON.stringify("liberarAlt"));
	} else{
		storage.setItem("supervisor", JSON.stringify("liberar"));	
	}
	window.location.replace("manut.html");
}

$("#btn-supervisor-1").click(function (e) {
    liberar();
});

$("#btn-supervisor-2").click(function (e) {
    liberar();
});

$("#btn-supervisor-3").click(function (e) {
    liberar();
});

$("#btn-supervisor-4").click(function (e) {
    liberar();
});

$("#btn-cancelar").click(function (e) {
	var storage = window.localStorage;	
	storage.setItem("supervisor", JSON.stringify("negado"));
    window.location.replace("manut.html");
});