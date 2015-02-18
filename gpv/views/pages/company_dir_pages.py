from flask.views import View
from flask import render_template, request


class CompanyDir(View):
    def dispatch_request(self):
        commune = request.args.get('komuna')
        if commune == "None":
            commune = "ferizaj"
        return render_template('company_directory.html', komuna=commune)
