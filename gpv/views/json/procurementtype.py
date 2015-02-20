from flask import Response
from flask.views import View
from urllib2 import urlopen
from gpv import utils


class ProcurementType(View):

    def dispatch_request(self, komuna=None, year=None, company_slug=None):

        api_base_url = utils.get_api_url()
        url = "%s/procurement-type" % api_base_url
        result = []
        if komuna != None and year != None:
            url = url + "/%s/%d" % (komuna, year)
            result = urlopen(url).read()
        elif company_slug != None:
            url = url + "/%s" % (company_slug)
            result = urlopen(url).read()


        # Build response object.
        resp = Response(
            response=result,
            mimetype='application/json')

        # Return response.
        return resp
