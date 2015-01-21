from flask import Response
from flask.views import View
from urllib2 import urlopen
from gpv import utils


class CompanyListJson(View):
    def dispatch_request(self, viti, komuna):
        api_base_url = utils.get_api_url()
        url = "%s/%s/company-names/%d" % (api_base_url, komuna, viti)

        result = urlopen(url).read()

        resp = Response(
            response=result, mimetype='application/json')
        # Return response.
        return resp
