
function home()
{	
	$("#content").html("");
	
    $("#content").append("<div id='header_img'><img src='img/feria.jpg' alt='paseo' width='100%' class='img_header'/></div>");
    $("#content").append("<section class='title'><h3>Inicio</h3>");
        $("#content").append("<article class='description'><p>Aquí podrás encontrar toda la información sobre la Feria 2014 de Fuensanta de Martos.</p></article>");
    $("#content").append("</section>");
    $("#content").append("<section class='title'><h3>Instalación en iPhone</h3>");
    $("#content").append("<article class='description' style='padding-left: 40px;'>"
    		+ "<ul>"
    		+ "<li>Busca en Google: tonicont.hostinazo.com</li>"
    		+ "<li>En la barra de opciones inferior pulsar sobre el icono <img class='icon' src='img/opt.png'/>.</li>"
    		+ "<li>Seleccionar la opción: Añadir a pantalla de inicio</li>"
    		+ "</ul></article>");
    $("#content").append("</section>");
    	
    		

	resize();
	
}

function schedule()
{
	showMenu();
    $.ajax({
        url:'http://tonicont.hostinazo.com/fiestas.php?option=getall',
        type: 'POST',
        dataType: 'json',
        error: function(jqXHR, text_status, strError){
            alert('ERROR: ' + text_status + ": " + strError );},
        timeout: 60000,
        success: function(data){
            $("#content").html("");
            var dias_semana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
            var date = new Date(data[0].fecha + "T" + data[0].hora);
            $("#content").append("<div id='header_img'><img src='img/fuente.jpg' alt='paseo' width='100%' class='img_header'/></div>");
            $("#content").append("<section class='title'><h3>" + dias_semana[date.getDay()] + " " + date.getDate() + "</h3></section>");
            for(var i in data)
            {
                var day = new Date(data[i].fecha).getDay();
                var newdate = new Date(data[i].fecha + "T" + data[i].hora);
                var hora =((newdate.getUTCHours()<10?'0':'') + newdate.getUTCHours()) + ":" + ((newdate.getMinutes()<10?'0':'') + newdate.getMinutes());
                if(newdate.getUTCDate() != date.getUTCDate())
                {
                    date = newdate;
                    $("#content").append("<section class='title'><h3>" + dias_semana[date.getUTCDay()] + " " + date.getUTCDate() + "</h3></section>");
                }
                
                $("#content").append("<article>");
                    
                    $("#content").append("<section class='date'><span>" + hora + " - <b>" + data[i].titulo + "</b></span></section>");
                    $("#content").append("<section class='description'><p>" + data[i].descripcion + "</p></section>");
                $("#content").append("</article>");
            }
            resize();
        }
    });
}

function events()
{
	showMenu();
    $.ajax({
        url:'http://tonicont.hostinazo.com/fiestas.php?option=getEvents',
        type: 'POST',
        dataType: 'json',
        error: function(jqXHR, text_status, strError){
            alert('ERROR: ' + text_status + ": " + strError );},
        timeout: 60000,
        success: function(data){
            $("#content").html("");
            var dias_semana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
            var date = new Date(data[0].fecha);
            $("#content").append("<div id='header_img'><img src='img/fuente.jpg' alt='paseo' width='100%' class='img_header'/></div>");
            $("#content").append("<section class='title'><h3>" + dias_semana[date.getDay()] + " " + date.getDate() + "</h3></section>");
            for(var i in data)
            {
                var day = new Date(data[i].fecha).getDay();
                var newdate = new Date(data[i].fecha);
                if(newdate.getUTCDate() != date.getUTCDate())
                {
                    date = newdate;
                    $("#content").append("<section class='title'><h3>" + dias_semana[date.getUTCDay()] + " " + date.getUTCDate() + "</h3></section>");
                }
                
                $("#content").append("<article>");
                    
                    $("#content").append("<section class='date'><span> <b>" + data[i].local + ":</b> " + data[i].titulo +"</span></section>");
                    $("#content").append("<section class='description'><p>" + data[i].descripcion + "</p></section>");
                $("#content").append("</article>");
            }
            resize();
        }
    });
}


function showMenu(){
	
    if($("#menu").hasClass("right"))
    {
        $("#content").addClass("left");
          $("#menu").addClass("left");
        $("#menu").removeClass("right");
        $("#content").removeClass("right");   
    }
    else
    {
    	$("#menu").addClass("right");
        $("#content").addClass("right");   
        $("#menu").removeClass("left");
        $("#content").removeClass("left"); 
        
    }
    /*
    if($("#menu").css("left") === "0px"){
        $("#menu").css("left", "-100px");
        $("#content").css("left","0px");
    }
    else
    {
        $("#menu").css("left", "0px");
        $("#content").css("left","100px");
    }
    */
}

function resize(){
    var newheight = $("#content").css("height");
    $("#menu").css("height", newheight);
}

$(function(){
    $('#slider div:gt(0)').hide();
    setInterval(function(){
      $('#slider div:first-child').fadeOut(0)
         .next('div').fadeIn(1000)
         .end().appendTo('#slider');}, 4000);
});

      
function map(){ 
    showMenu();
    $("#content").html("");
    $("#content").append("<div id='header_img'><img src='img/fuente.jpg' alt='paseo' width='100%' class='img_header'/></div>");
    $("#content").append("<section class='title'><h3>Localización</h3></section>");
    $("#content").append("<div id='map'></div>");
    var map;
    map = new GMaps({
        div: '#map',
        lat: 37.64703235239319,
        lng: -3.905537,
        zoom: 18
    });    
    map.addMarker({
    	  lat: 37.647137, 
    	  lng: -3.905539,
    	  title: 'Caseta Magdalena',
    	  infoWindow: {
    		  content: '<p>Caseta Magdalena</p>'
    		}
    });
    map.addMarker({
  	  lat: 37.647216, 
  	  lng: -3.905419,
  	  title: 'Entrada Feria',
  	  infoWindow: {
  		  content: '<p>Entrada a la Feria</p>'
  		}
  	});
    map.addMarker({
    	  lat: 37.646986, 
    	  lng: -3.904988,
    	  title: 'Lugar Juventud',
    	  infoWindow: {
    		  content: '<p>Lugar de concentración de la Juventud</p>'
    		}
    });
    map.addMarker({
  	  lat: 37.646969,
  	  lng: -3.904826,
  	  title: 'Fuente Negra',
  	  infoWindow: {
  		  content: '<p>Fuente de la Negra</p>'
  		}
    });
    map.addMarker({
    	  lat: 37.646909,
    	  lng: -3.905807,
    	  title: 'Atracciones',
    	  infoWindow: {
    		  content: '<p>Atracciones</p>'
    		}
    });
    map.addMarker({
  	  lat: 37.645722,
  	  lng: -3.907023,
  	  title: 'Mercadillo',
  	  infoWindow: {
  		  content: '<p>Mercadillo</p>'
  		}
    });
    map.addMarker({
    	  lat: 37.646704,
    	  lng: -3.905848,
    	  title: 'Caseta Municipal',
    	  infoWindow: {
    		  content: '<p>Caseta Municipal</p>'
    		}
    });
    
    resize();
}