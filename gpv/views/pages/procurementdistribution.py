from flask import render_template
from flask.views import View


class ProcurementDistribution(View):
    def dispatch_request(self):
        return render_template('procurement_distribution.html')
