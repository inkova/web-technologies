from flask import Flask, request, render_template, make_response

app = Flask(__name__)

@app.route("/")
def login():
    return render_template('login.html')
    
@app.route('/setcookie', methods = ['POST', 'GET'])
def setcookie():
   if request.method == 'POST':
      user = request.form['nm']
   
   resp = make_response(render_template('index.html'))
   resp.set_cookie('userID', user)
   
   return resp

@app.route('/getcookie')
def getcookie():
   return render_template('confirm.html')

@app.route('/index')
def index():
   return render_template('index.html')

@app.route('/finish')
def finish():
   name = request.cookies.get('userID')
   return '<h1>' + name + ', your answer is accepted!</h1>'

if __name__ == "__main__":
    app.run()
