from flask.views import View
from flask import render_template, request


class CompanyDir(View):
    def dispatch_request(self):
        return render_template('company_directory.html', komuna='prishtina')
