from flask import render_template
from flask.views import View
from urllib2 import urlopen
from gpv import utils
import json


class MunicipalityPriceValue(View):
    def dispatch_request(self):
        return render_template('municipality_price_value.html')
