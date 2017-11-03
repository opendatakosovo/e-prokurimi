from flask import render_template, request
from flask.views import View


class MunicipalityPriceValue(View):
    def dispatch_request(self):
        return render_template('municipality_price_value.html',  komuna='prishtina')