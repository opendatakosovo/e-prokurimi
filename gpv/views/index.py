from flask import render_template
from flask.views import View
from urllib2 import urlopen
import json


class Index(View):
    def dispatch_request(self):
        url = "http://0.0.0.0:5000/company-list"
        table_results = json.loads(urlopen(url).read())

        return render_template('index.html', table_results=table_results)
