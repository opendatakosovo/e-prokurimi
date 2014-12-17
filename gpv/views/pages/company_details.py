from flask import render_template
from flask.views import View
from urllib2 import urlopen
import json


class CompanyDetails(View):
    def dispatch_request(self, komuna, company_slug):
        url = "http://0.0.0.0:5000/%s/company/%s" % (komuna, company_slug)
        company = json.loads(urlopen(url).read())

        return render_template('company_details.html', komuna=komuna, company=company)
