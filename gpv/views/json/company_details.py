from flask.views import View
from flask import Response
from urllib2 import urlopen
from gpv import utils


class CompanyDetails(View):
    def dispatch_request(self, kompania_slug):

        api_base_url = utils.get_api_url()
        url = "%s/kompania-detajet/%s" % (api_base_url, kompania_slug)

        result = urlopen(url).read()

        # Build response object.
        resp = Response(
            response=result, mimetype='application/json')

        # Return response.
        return resp
