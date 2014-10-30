from flask import current_app

class Utils():

    @staticmethod
    def get_api_url():
        api_url = current_app.config['API_GJAKOVA_PROCUREMENT']

        return api_url
