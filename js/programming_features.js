//Método para la traza
print = function (txt)
{
	if(testing)
	{
		console.log(txt);
	}
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
