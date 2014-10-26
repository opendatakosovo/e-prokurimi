from flask.views import View
from flask import render_template


class Map(View):

    def dispatch_request(self):
        return render_template('map.html')
