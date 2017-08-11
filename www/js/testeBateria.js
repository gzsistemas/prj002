
setInterval(function() {
  testeBateria();
}, 1000);


$(document).ready(function() {
  testeBateria();
});


function testeBateria(){
  navigator.getBattery().then(function(battery) {
    var level = battery.level;

    var charge = battery.charging;

    if (charge == true) {
      $("#bateria").removeClass("fa-battery-0");
      $("#bateria").removeClass("fa-battery-1");
      $("#bateria").removeClass("fa-battery-2");
      $("#bateria").removeClass("fa-battery-3");
      $("#bateria").removeClass("fa-battery-4");
      $("#bateria").addClass("fa-bolt");
    }else {
      if(level <= 0.0){
        $("#bateria").removeClass("fa-battery-0");
        $("#bateria").removeClass("fa-battery-1");
        $("#bateria").removeClass("fa-battery-2");
        $("#bateria").removeClass("fa-battery-3");
        $("#bateria").removeClass("fa-battery-4");
        $("#bateria").addClass("fa-battery-0");  
      }else if(level <= 0.2){
        $("#bateria").removeClass("fa-battery-0");
        $("#bateria").removeClass("fa-battery-1");
        $("#bateria").removeClass("fa-battery-2");
        $("#bateria").removeClass("fa-battery-3");
        $("#bateria").removeClass("fa-battery-4");
        $("#bateria").addClass("fa-battery-1");
      } else if (level <= 0.5) {
        $("#bateria").removeClass("fa-battery-0");
        $("#bateria").removeClass("fa-battery-1");
        $("#bateria").removeClass("fa-battery-2");
        $("#bateria").removeClass("fa-battery-3");
        $("#bateria").removeClass("fa-battery-4");
        $("#bateria").addClass("fa-battery-2");
      }else if(level <= 0.9){
        $("#bateria").removeClass("fa-battery-0");
        $("#bateria").removeClass("fa-battery-1");
        $("#bateria").removeClass("fa-battery-2");
        $("#bateria").removeClass("fa-battery-3");
        $("#bateria").removeClass("fa-battery-4");
        $("#bateria").addClass("fa-battery-3");
      }else if(level <= 1.0 ){
        $("#bateria").removeClass("fa-battery-0");
        $("#bateria").removeClass("fa-battery-1");
        $("#bateria").removeClass("fa-battery-2");
        $("#bateria").removeClass("fa-battery-3");
        $("#bateria").removeClass("fa-battery-4");
        $("#bateria").addClass("fa-battery-4");
      }
    }
  });
}
