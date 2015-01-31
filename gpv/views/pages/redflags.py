from flask import render_template
from flask.views import View


class RedFlags(View):
    def dispatch_request(self, komuna):
        return render_template('redflags.html', komuna=komuna)
