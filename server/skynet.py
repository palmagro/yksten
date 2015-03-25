#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import requests
from random import randint
import random
from flask import Flask, request, redirect, render_template, url_for, Response
from neo4jrestclient.client import GraphDatabase

a = ""
tipo_a = ""
tipo_rel = ""
b = ""
tipo_b = ""
abierta = False
recibeTipo = False


app = Flask(__name__)
db = GraphDatabase("http://mowento.cs.us.es:7777/db/data")

server = 'http://mowento.cs.us.es:7777/db/data/'
initial_weight = 30;

def make_question():
    global tipo_a
    global tipo_rel
    global b
    global tipo_b
    global abierta
    abierta = random.random() > 0.5
    print abierta
    offset = randint(0,100)
    question = "Que "
    r = requests.post(server + "cypher/", {"query":"MATCH (b)-[r]->(c) RETURN labels(b), type(r), c.name, labels(c) skip "+ str(offset) + " limit 1"})
    tipo_a = json.loads(r.content)["data"][0][0][0].decode("utf-8") 
    tipo_rel = json.loads(r.content)["data"][0][1].decode("utf-8") 
    b = json.loads(r.content)["data"][0][2].decode("utf-8") 
    tipo_b = json.loads(r.content)["data"][0][3][0].decode("utf-8") 
    if(abierta):
	    question += str(tipo_rel).lower().replace("_"," ") +" "+ str(b);
    else:
	    question += str(tipo_a) +" "+str(tipo_rel).lower().replace("_"," ")+" "+ str(b);    
    return question

def add_node(nombre,tipo):
    query = "MERGE (n:"+tipo+" {name:{value_name}}) ON MATCH SET n = {values} ON CREATE SET n = {values} RETURN n"
    params = {	"value_name": nombre, 	"values": {"name":nombre} }
    r = db.query(q=query,params=params)

def add_rel(a,a_t,rel_type,b,b_t):
    query = "MATCH (n:"+a_t+" {name:{name_a}}),(m:"+b_t+" {name:{name_b}}) MERGE (n)-[r:"+rel_type+"]->(m) RETURN n"
    params = {	"name_a": a, "name_b": b}
    r = db.query(q=query,params=params)


@app.route('/send', methods=['POST'])
def send():
    global a
    global tipo_a
    global tipo_rel
    global b
    global tipo_b
    global abierta
    global recibeTipo
    global tipo_a
    if(not recibeTipo):
        if(not abierta):
            a = str(request.data).replace('"','')
            add_node(a,tipo_a);
            add_rel(str(a),str(tipo_a),str(tipo_rel),str(b),str(tipo_b));
            return Response(status=200, mimetype='application/json')
        else:
            a = str(request.data).replace('"','')
            recibeTipo = True
            return "¿Que es "+a+"?"
    else:
        tipo_a = str(request.data).replace(' ','_').replace('"','')
        add_node(a,tipo_a);
        add_rel(str(a),str(tipo_a),str(tipo_rel),str(b),str(tipo_b));
        recibeTipo = False
        return Response(status=200, mimetype='application/json')
        



@app.route('/ask', methods=['POST'])
def ask():
    r = make_question()
    return r



#    print "Sending..."
#    print request.data
#    r = requests.post('http://mowento.cs.us.es:7777/db/data/cypher', request.data)
#    return Response(r, status=200, mimetype='application/json')

@app.route("/")
def hello():

    a = make_question()
    return render_template('conversation.html', pregunta=a)


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8887,debug=True)

