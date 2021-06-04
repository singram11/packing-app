""" Server for the packing app"""

from flask import Flask, render_template, flash, session, redirect

from model import connect_to_db

app = Flask(__name__)
app.secret_key = "dev"
#do the thing - markov bot lab

@app.route('/')
def render_homepage():
    """ Shows homepage """

    return 'Hello World'



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='127.0.0.1', debug=True)