from flask import render_template
from flask.views import View
from urllib2 import urlopen
import json


class Index(View):
    def dispatch_request(self):
        url = "http://0.0.0.0:5000/monthly-summary"
        result_json = json.loads(urlopen(url).read())

        return render_template('index.html', result_json=result_json)
