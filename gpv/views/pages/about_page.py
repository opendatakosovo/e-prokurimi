from flask import render_template
from flask.views import View


class AboutPage(View):
    def dispatch_request(self):
        return render_template('about.html', komuna='ferizaj')
