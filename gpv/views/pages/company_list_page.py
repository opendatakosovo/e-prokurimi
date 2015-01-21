from flask import render_template
from flask.views import View


class CompanyListPage(View):
    def dispatch_request(self, komuna):
        return render_template('company_list.html', komuna=komuna)
