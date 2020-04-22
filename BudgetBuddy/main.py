from flask import Flask, render_template, jsonify, json, request, redirect, url_for
import _sqlite3 as sql
import LogIn as dbHandler
import util

app = Flask(__name__)


@app.route('/')
def index():
    # this is your index page
    log = 'Index.'
    return render_template('Account.html', log=log)


@app.route('/LogIn', methods=['POST'], ['GET'])
def log_in():
    if request.method=='POST':
        username = request.form['username']
        password = request.form['password']
        dbHandler.insertUser(username, password)
        users = dbHandler.retrieveUsers()
        return render_template('LogIn.html', users=users)
    else:
        return render_template('index.html')


@app.route('/Registration')
def registration():
    # this is your LogIn page
    log = 'Registration.'
    return render_template('Registration.html', log=log)


@app.route('/Forecast')
def forecast():
    # this is your LogIn page
    log = 'Forecast.'
    return render_template('Forecast.html', log=log)


@app.route('/MonthlyExpenses')
def monthly_expenses():
    # this is your LogIn page
    log = 'MonthlyExpenses.'
    return render_template('MonthlyExpenses.html', log=log)


@app.route('/Income')
def income():
    # this is your LogIn page
    log = 'Income.'
    return render_template('Income.html', log=log)


if __name__ == '__main__':
    app.debug = True
    ip = '127.0.0.1'
    app.run(host=ip)
