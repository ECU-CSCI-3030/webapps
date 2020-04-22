from flask import Flask, render_template, jsonify, json, request, redirect, url_for
import _sqlite3 as sql
import hashlib

app = Flask(__name__)


def validate(username, password):
    con = sql.connect('static/user.db')
    completion = False
    with con:
        cur = con.cursor()
        cur.execute("SELECT * FROM Users")
        rows = cur.fetchall()
        for row in rows:
            dbUser = row[0]
            dbPass = row[1]
            if dbUser == username:
                completion = check_password(dbPass, password)
    return completion


def check_password(hashed_password, user_password):
    return hashed_password == hashlib.md5(user_password.encode()).hexdigest()


@app.route('/')
def index():
    # this is your index page
    log = 'Index.'
    return redirect(url_for('log_in'))


@app.route('/log_in', methods=['POST', 'GET'])
def log_in():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        completion = validate(username, password)
        if completion == False:
            error = 'Invalid Credentials. Please try again.'
        else:
            return redirect(url_for('account'))
    return render_template('log_in.html', error=error)


@app.route('/registration')
def registration():
    # this is your LogIn page
    log = 'Registration.'
    return render_template('registration.html', log=log)


@app.route('/forecast')
def forecast():
    # this is your LogIn page
    log = 'Forecast.'
    return render_template('forecast.html', log=log)


@app.route('/monthly_expenses')
def monthly_expenses():
    # this is your LogIn page
    log = 'MonthlyExpenses.'
    return render_template('monthly_expenses.html', log=log)


@app.route('/income')
def income():
    # this is your LogIn page
    log = 'Income.'
    return render_template('income.html', log=log)


if __name__ == '__main__':
    app.debug = True
    ip = '127.0.0.1'
    app.run(host=ip)
