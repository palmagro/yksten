//Método para la traza
print = function (txt)
{
//	if(testing)
//	{
		//console.log(txt);
//	}
}

//Método para random int
randomInt = function (a)
{
	return Math.floor(Math.random()*(a-1));
}

//Método añadido a JQuery para centrar divs onthe screen
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();


String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};


String.prototype.quitarArt = function () {
    var str = this;
   return str.replace('un ',"").replace("uno ","").replace("unos ","").replace("una ","").replace("unas ","").replace("Uno ","").replace("Unos ","").replace("Una ","").replace("Unas ","").replace("la ","").replace("el ","").replace("La ","").replace("El ","").replace("Los ","").replace("Las ","").replace("las ","").replace("los ","");
};

//send answer if press enter
function myscript(e){
    if(e.keyCode == 13){
        send();
    }
}
