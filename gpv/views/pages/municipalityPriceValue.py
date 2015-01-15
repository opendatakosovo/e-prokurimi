from flask import render_template, request
from flask.views import View


class MunicipalityPriceValue(View):
    def dispatch_request(self):
        commune = request.args.get('komuna')
        return render_template('municipality_price_value.html', komuna=commune)
