from flask.views import View
from flask import Response
from urllib2 import urlopen
from gpv import utils


class VleraCmimi(View):
    def dispatch_request(self, komuna, viti):

        api_base_url = utils.get_api_url()
        url = "%s/%s/monthly-summary/%d" % (api_base_url, komuna, viti)

        result = urlopen(url).read()

        # Build response object.
        resp = Response(
            response=result, mimetype='application/json')

        # Return response.
        return resp
