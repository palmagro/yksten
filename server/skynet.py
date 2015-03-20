import requests
from flask import Flask, request, redirect, render_template, url_for, Response
app = Flask(__name__)

@app.route('/send', methods=['POST'])
def send():
    print "Sending..."
    print request.data
    r = requests.post('http://mowento.cs.us.es:7777/db/data/cypher', request.data)
    return Response(r, status=200, mimetype='application/json')

@app.route("/")
def hello():

    return render_template('conversation.html', name="name")


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8887)
