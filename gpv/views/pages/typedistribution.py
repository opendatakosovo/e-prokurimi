from flask import render_template
from flask.views import View


class TypeDistribution(View):

    def dispatch_request(self, komuna, type):
        return render_template('type_distribution.html',komuna=komuna, type=type)