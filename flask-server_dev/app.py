from flask import Flask
from flask import request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/rating')
def rating():
    first_name = request.args.get('firstName')
    last_name = request.args.get('lastName')
    uni = request.args.get('uni')

    # return if we don't have proper params
    if first_name is None or last_name is None or uni is None:
        return '**'
        
    print("Getting rating for {} {} from {}".format(first_name, last_name, uni))
    query = '{} {}'.format(first_name, last_name)
    value_str = scrapeRating(query=query, uni=uni)

    return value_str

def scrapeRating(query: str, uni: str) -> str:
    # right now, only works for NJIT
    if uni.lower() == 'njit':
        uniID = 'U2Nob29sLTY2OA=='
    else:
        # return with unsure ratings
        return '**'
    
    # get the HTML with those sweet sweet scores
    resp = requests.get('https://www.ratemyprofessors.com/search/teachers?query={}&sid={}'.format(query, uniID))
    
    # return unsure rating if request was not OK
    if resp.status_code != 200:
        return '**'
    
    # FIXME It would be **MUCH** cleaner to do this in beautiful soup or json
    # however, since we are only pulling the first rating
    # we will take the fast approach

    # get the first rating that shows up, hope its the correct prof
    html = resp.text
    rate_loc = html.find('avgRating')

    if rate_loc == -1:
        # no rating found for some reason
        return '**'

    # read html from that point and get the digits
    ch = html[rate_loc]
    while not ch.isdigit():
        # read the next char
        rate_loc += 1
        ch = html[rate_loc]

    # now we have a digit, find the comma termination (possibilites '3.2,' '2,')
    rel_end_loc = html[rate_loc:].find(',')

    # return the number portion
    return html[rate_loc:rate_loc+rel_end_loc]



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)