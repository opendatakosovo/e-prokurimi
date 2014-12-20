from flask import render_template, redirect, current_app
from flask.views import View

class Home(View):
    def dispatch_request(self):
    	default_home_path = current_app.config['BASE_PATH'] + '/ferizaj'
        return redirect(default_home_path)
