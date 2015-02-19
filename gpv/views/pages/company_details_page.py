from flask import render_template, request
from flask.views import View


class CompanyDetailsPage(View):
    def dispatch_request(self, kompania_slug):
    	commune = request.args.get('komuna')
        if commune == "None":
            commune = "ferizaj"
        return render_template('company_details.html', kompania_slug=kompania_slug, komuna=commune)