from flask import Flask, render_template, jsonify, json
import util


app = Flask(__name__)


@app.route('/')
def index():
    # this is your index page
    log = 'Index.'
    return render_template('Account.html', log_index = log)

@app.route('/LogIn')
def background():
    # this is your LogIn page
    log = 'LogIn.'
    return render_template('LogIn.html', log_background = log)


if __name__ == '__main__':
    app.debug = True
    ip = '127.0.0.1'
    app.run(host=ip)
