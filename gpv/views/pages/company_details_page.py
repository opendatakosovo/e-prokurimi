from flask import render_template
from flask.views import View


class CompanyDetailsPage(View):
    def dispatch_request(self, kompania_slug):
        return render_template('company_details.html', kompania_slug=kompania_slug)