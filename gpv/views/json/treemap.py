from flask.views import View
from flask import Response
from urllib2 import urlopen
from gpv import utils


class TreeMap(View):
    def dispatch_request(self, year):

    	api_base_url = utils.get_api_url()
        url = "%s/gjakova/treemap/%d" % (api_base_url, year)

        result = urlopen(url).read()

        # Build response object.
        resp = Response(
            response=result, mimetype='application/json')

        # Return response.
        return resp
