from flask import render_template
from flask.views import View
from urllib2 import urlopen
import json


class ProcurementType(View):

    def dispatch_request(self):
        url = "http://0.0.0.0:5000/procurement-type"
        piechart = json.loads(urlopen(url).read())

        return render_template('procurement_type.html', piechart=piechart)
