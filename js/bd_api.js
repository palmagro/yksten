//Neo4j URL
var restServerURL = "http://mowento.cs.us.es:7777/db/data";

//Método para extraer el esquema de Neo4j
get_schema = function()
{
	// What is related, and how
	var getSchemaCyph = 
	{
	  "query" : "MATCH (a)-[r]->(b) RETURN DISTINCT head(labels(a)) AS This, type(r) as To, head(labels(b)) AS That LIMIT 100",
	  "params" : {	  }
	};
	if(kfield == "todo")
	{
		getSchemaCyph = 
			{
			  "query" : "MATCH (a)-[r]->(b) RETURN DISTINCT head(labels(a)) AS This, type(r) as To, head(labels(b)) AS That LIMIT 100",
			  "params" : {	"nombre_peli" : id  }
			};
	}
	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(getSchemaCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		   print(data);
		   print('Schema retrieved...');
           schema = data;
		   
       },
       error: function( xhr ) {
		   print('error retrieving schema');
           window.console && console.log( xhr );
       },
       complete: function(data) {

       }
   });
}

get_num_concepts = function()
{
	// What is related, and how
	var getSchemaCyph = 
	{
	  "query" : "match n return count(*)",
	  "params" : {	  }
	};
	
	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(getSchemaCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		   console.log(data);
		   console.log('node count retrieved...');
           numConcepts(data.data[0][0]);
		   console.log(data);
		   
       },
       error: function( xhr ) {
		   print('node count retrieved...');
           window.console && console.log( xhr );
       },
       complete: function(data) {

       }
   });
}

//Método para buscar unnodo huérfano
get_orphan = function(rel_t,b_t)
{
    var offset = Math.floor(Math.random()*100);
	getOrphanCyph = 
	{
	  "query" : "MATCH (b:"+b_t+")  RETURN b skip "+ offset + " limit 1",
	  "params" : 
	  {
		
	  }
	};
	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(getOrphanCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		   console.log(data);
		   if(data.data.length>0)
		   {
			   console.log("Orphan finded...")
			   orphan = data.data[0][0];
		   }	   
       },
       error: function( xhr ) {
		   print('error retrieving orphan');
           window.console && console.log( xhr );
       },
       complete: function(data) {

       }
   });
}

get_orphanB = function()
{
	getOrphanCyph = 
	{
	  "query" : "MATCH (b:"+a_typeOld+")-[r*1..3]-(a:"+b_type+ ") WHERE b.name = '"+ answer +"' RETURN a limit 1",
	  "params" : 
	  {
		
	  }
	};
	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(getOrphanCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		   console.log(data);
		   if(data.data.length>0)
		   {
			   console.log("Orphan finded...")
			   orphan = data.data[0][0];
		   }	   
       },
       error: function( xhr ) {
		   print('error retrieving orphan');
           window.console && console.log( xhr );
       },
       complete: function(data) {

       }
   });
}


//Método para buscar unnodo huérfano
get_son = function(rel_t,b_t)
{
	getOrphanCyph = 
	{
	  "query" : "MATCH (b:"+b_t+") WHERE ()-[: "+rel_t+"]->(b) RETURN b",
	  "params" : 
	  {
		
	  }
	};
	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(getOrphanCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		   console.log(data);
		   if(data.data.length>0)
		   {
			   console.log("Son finded...")
			   orphan = data.data[0][0];
		   }	   
       },
       error: function( xhr ) {
		   print('error retrieving orphan');
           window.console && console.log( xhr );
       },
       complete: function(data) {

       }
   });
}


//Función que crea un nodo
add_node = function(text,type)
{
    print("Añadiendo nodo..."); 
			
	addNodeCyph =
	{
		query: "MERGE (n:"+type+" {name:{value_name}}) ON MATCH SET n = {values} ON CREATE SET n = {values} RETURN n",
		params: 
		{
			value_name: text,
			values: {name:text}
		}				
	}

	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(addNodeCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		   print("Añadido nodo");
		   console.log(data.data[0][0]);
		   a = data.data[0][0];
       },
       error: function( xhr ) {
		   print("Error añadiendo nodo");
           window.console && console.log( xhr );
       },
       complete: function(data) {
       }
   });

}


//Función que borra un nodo
remove_node = function(node,type)
{
    print("Borrando nodo..."); 
			
	addNodeCyph =
	{
		query: "n:"+type+" {name:{value_name}})DELETE n",
		params: 
		{
			value_name: node.data.name,
		}				
	}

	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(addNodeCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		   print("Borrado nodo");
       },
       error: function( xhr ) {
		   print("Error borrando nodo");
           window.console && console.log( xhr );
       },
       complete: function(data) {
       }
   });

}


//Función que crea una relación
add_rel = function(a,a_t,rel_type,b,b_t)
{
    console.log(a);
    console.log(a_t);
    if(abierta)
      	var a_name = a;  
    else
    	var a_name = a.data.name;
	var b_name = b.data.name;
	addRelCyph =  
	{
		query: "MATCH (n:"+a_t+" {name:{name_a}}),(m:"+b_t+" {name:{name_b}}) MERGE (n)-[r:"+rel_type+"]->(m) ON CREATE SET r.weight = {ini_weight}, r.create = timestamp() ON MATCH SET r.weight = r.weight + {ini_weight}, r.lastModified = timestamp() RETURN r, has(r.lastModified) as onMerge ",
		params:
		{
			name_a:a_name,
			name_b:b_name,
			ini_weight: initial_weight
		}
	};

	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(addRelCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		    print("Añadida relación");
		    console.log(data);
			if(data.data[0][1])
			{
				console.log("estaba");
				calculate_evapor(a_t,a_name,rel_type,b_t,b_name);
				remove_forgotten_rels();
			}
			else
			{
				console.log("no estaba");
				calculate_evapor(a_t,a_name,rel_type,b_t,b_name);
				remove_forgotten_rels();
			}
		    search_question();
		    make_question();
       },
       error: function( xhr ) {
		   print("Error añadiendo relación");
           window.console && console.log( xhr );
       },
       complete: function(data) {
       }
   });

}

calculate_evapor = function(a_t,a_name,rel_type,b_t,b_name)
{
	addRelCyph =  
	{
		query: "MATCH (a:"+a_t+")-[r:"+rel_type+"]->(b:"+b_t+"{name:{bname}}) return count(a)",
		params:
		{
			bname: b_name
		}
	};

	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(addRelCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		    print("obteniendoevaporacion");
		    console.log(data.data[0][0]);
			var num_of_rels = data.data[0][0];
			forgetting_rels(a_t,a_name,rel_type,b_t,b_name,num_of_rels);
       },
       error: function( xhr ) {
		   print("Error obteniendo evaporacion");
           window.console && console.log( xhr );
       },
       complete: function(data) {
       }
   });

}

forgetting_rels = function(a_t,a_name,rel_type,b_t,b_name,num_of_rels)
{
	var dif = coef_evaporation / num_of_rels;
	forgetRelCyph =  
	{
		query: "MATCH (:"+a_t+")-[r:"+rel_type+"]->(b:"+b_t+"{name:{bname}}) set r.weight = r.weight - "+dif+" return r",
		params:
		{
			bname: b_name
		}
	};

	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(forgetRelCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		    print("olvidando relaciones");
		    console.log(data);
       },
       error: function( xhr ) {
		   print("Error olvidando relaciones");
           window.console && console.log( xhr );
       },
       complete: function(data) {
       }
   });

}

remove_forgotten_rels = function()
{
	removeForgottenRelsCyph =  
	{
		query: "MATCH ()-[r]->() where r.weight < "+forget_treshold+" delete r",
		params:
		{

		}
	};

	$.ajax({
       async: false, 
       type: "POST",
       url: restServerURL + "/cypher",
       data: JSON.stringify(removeForgottenRelsCyph),
       dataType: "json",
       contentType: "application/json",
       success: function( data ) {
		    print("olvidadas relaciones");
		    console.log(data);
       },
       error: function( xhr ) {
		   print("Error olvidando relaciones");
           window.console && console.log( xhr );
       },
       complete: function(data) {
       }
   });

}


