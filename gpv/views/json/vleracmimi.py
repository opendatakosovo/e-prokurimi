from flask.views import View
from flask import Response
from urllib2 import urlopen
from gpv import utils


class VleraCmimi(View):
    def dispatch_request(self, komuna=None, viti=None, company_slug=None):

        api_base_url = utils.get_api_url()
        url = "%s/monthly-summary" % api_base_url

        result = []
        if komuna != None and viti != None:
            url = url + "/%s/%d" % (komuna, viti)
            result = urlopen(url).read()

        elif company_slug != None:
            url = url + "/%s" % (company_slug)
            result = urlopen(url).read()

        # Build response object.
        resp = Response(
            response=result, mimetype='application/json')

        # Return response.
        return resp
