from flask import render_template, redirect
from flask.views import View

class Home(View):
    def dispatch_request(self):

        return redirect('/ferizaj')
