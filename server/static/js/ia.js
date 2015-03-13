//Variable para activar las propiedades del modo testing
var testing = true;

//Idioma
var lang = 1;
//Variable para contar el numero de preguntas realizadas
var numquestions = 0;

//Variable que determina la probabilidad de preguntar por algo que no sabe
var learning_factor = 0.9;

var coef_evaporation = 1;

var forget_treshold = 15;

//Variable bandera para saber si estamos aprendiendo
var learning;

//Peso inicial conel que empiezan las aristas
var initial_weight = 30;

var answer;
var answerPrev;


//Variable para el Schema
var schema = {};

//Tipos de los datos involucrados en la pregunta

//Nodo huérfano sobre el que preguntar, actual y anterior
var orphan = "";
var orphanPrev = "";

//a: es lo que preguntamos (lo que esperamos del usuario), y esdonde se almacena el nodo creado si responde, actual y anterior
var a;
var aPrev;

//Tipo de el nodo a, actual y anterior
var a_type = "";
var a_typePrev = "";
//Tipo de la relación, actual y anterior
var rel_type = "";
var rel_typePrev = "";

//Tipo de el nodo huérfano, actual y anterior
var b_type = "";
var b_typePrev = "";

//Método para realizar una pregunta al usuario
search_question = function()
{
	if(Math.random()<learning_factor)
	{
		learning = true;
		var i = 0;
		while (orphan == "")
		{
			console.log(i);
			a_type = schema.data[i][0];
			rel_type = schema.data[i][1];
			b_type = schema.data[i][2];
			console.log(schema);
			console.log(rel_type);
			get_orphan(rel_type,b_type);		
			i = Math.round(Math.random()*(schema.data.length-1));
			console.log(i);
		}
		console.log(orphan);
		console.log(rel_type);
	}
	else
	{
		learning = false;
		i = Math.round(Math.random()*(schema.data.length-1));
		console.log(i);
		a_type = schema.data[i][0];
		rel_type = schema.data[i][1];
		b_type = schema.data[i][2];
		console.log(schema);
		console.log(rel_type);
		get_son(rel_type,b_type);	
	}
}

//Función que formula la pregunta
make_question = function()
{
	var question = "";
	console.log(answer);
	if(true)//numquestions == 0 || answer == undefined || answer =="")
	{
		question = dict[lang]["hi"];
	}
	else
	{
		var question = answer.toLowerCase().replace(/_/g," ")+ " " +rel_typePrev.toLowerCase().replace(/_/g," ")+" "+orphanPrev + dict[lang]["and"];
	}
	question += a_type.toLowerCase() +" "+rel_type.toLowerCase().replace(/_/g," ")+" "+ orphan.data.name +"?";
	a_typePrev = a_type;
	rel_typePrev = rel_type;
	orphanPrev = orphan.data.name;
	botMessage(question);
	numquestions++;
}

//Método que envia el mensaje del Bot
botMessage = function(msg) {
    botText(msg);
};

//Método que recibe la respuesta al pulsar enter/boton
getAnswer = function() {
    answer = userText();
	userText("");
	console.log(answer);
	if(answer == "castellano")
	{
		lang = 1;
	}
	else
	{
		if(answer!="")
		{
			if(learning)
			{
				add_node(answer,a_type);
				add_rel(a,a_type,rel_type,orphan,b_type);
			}else
			{
				add_node(answer,a_type);
				add_rel(a,a_type,rel_type,orphan,b_type);
				//checkAnswer(answer);
			}
			newQuestion();
		}
	}
};

//Función nueva pregunta
newQuestion = function () 
{
	orphan="";
	userText("");
	get_schema();
	search_question();
	make_question();
	$("#input").focus();
	$("#main").center();
}

//Función principal
main = function () 
{
	get_schema();
	print(schema);
	search_question();
	make_question();
	$("#input").focus();
	$("#container").center();
}


