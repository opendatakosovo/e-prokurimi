from flask import render_template
from flask.views import View
from urllib2 import urlopen
import json


class BudgetType(View):

    def dispatch_request(self):
        url = "http://0.0.0.0:5000/budget-type"
        piechart = json.loads(urlopen(url).read())

        return render_template('budget_type.html', piechart=piechart)
