from flask import Response
from flask.views import View
from urllib2 import urlopen
from gpv import utils


class CompanyDirectory(View):
    def dispatch_request(self, kompania):
        api_base_url = utils.get_api_url()
        url = "%s/kompania/%s" % (api_base_url, kompania)

        result = urlopen(url).read()

        resp = Response(
            response=result, mimetype='application/json')
        # Return response.
        return resp
