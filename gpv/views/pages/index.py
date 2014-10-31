from flask import render_template
from flask.views import View
from urllib2 import urlopen
from gpv import utils
import json


class Index(View):
    def dispatch_request(self):
    	api_base_url = utils.get_api_url()
        url = "%s/monthly-summary" % api_base_url

        result_json = json.loads(urlopen(url).read())

        return render_template('index.html', result_json=result_json)
