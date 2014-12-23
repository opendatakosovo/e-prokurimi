from flask import render_template, Response
from flask.views import View
from urllib2 import urlopen
from gpv import utils
import json


class MunicipalityVleraCmimi(View):
    def dispatch_request(self, viti):
    	api_base_url = utils.get_api_url()
        url = "%s/monthly-summary/%d" % (api_base_url, viti)

        result = urlopen(url).read()

    	resp = Response(
            response=result, mimetype='application/json')
        # Return response.
        return resp
