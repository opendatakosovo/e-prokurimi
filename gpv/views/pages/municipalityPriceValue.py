from flask import render_template
from flask.views import View


class MunicipalityPriceValue(View):
    def dispatch_request(self):
        komuna = 'ferizaj'
        return render_template('municipality_price_value.html', komuna=komuna)
