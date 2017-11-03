from flask.views import View
from flask import render_template, request


class Map(View):
    def dispatch_request(self, komuna):
        return render_template('map.html', komuna=komuna)