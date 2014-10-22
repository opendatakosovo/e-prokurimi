from flask import render_template, request, redirect, url_for
from flask.views import View
from requests import request
from urllib2 import Request, urlopen
import json

class PieChart(View):
    def dispatch_request(self):
        url = "http://0.0.0.0:5000/piechart"
        piechart = json.loads(urlopen(url).read())



        return render_template('piechart.html',piechart=piechart)
