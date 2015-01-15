from flask import render_template, request
from flask.views import View


class MunicipalityPriceValue(View):
    def dispatch_request(self):
        commune = request.args.get('komuna')
        if commune == "None":
            commune = "ferizaj"
        return render_template('municipality_price_value.html', komuna=commune)
