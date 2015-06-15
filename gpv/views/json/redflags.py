from flask import Response
from flask.views import View
from urllib2 import urlopen
from gpv import utils


class RedFlagsJson(View):
    def dispatch_request(self, viti, komuna=None, selia=None):
        api_base_url = utils.get_api_url()
        url = "%s/" % api_base_url

        if selia != None:
            url = url + "%s/red-flags/%s/%d" % (komuna, selia, viti)
            result = urlopen(url).read()
        else:
            url = url + "%s/red-flags/%d" % (komuna, viti)
            result = urlopen(url).read()

        resp = Response(
            response=result, mimetype='application/json')
        # Return response.
        return resp
