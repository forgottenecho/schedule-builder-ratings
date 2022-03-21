from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/rating')
def rating():
    first_name = request.args.get('firstName')
    last_name = request.args.get('lastName')
    uni = request.args.get('uni')
    print("Getting rating for {} {} from {}".format(first_name, last_name, uni))

    value = 5

    return str(value)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)