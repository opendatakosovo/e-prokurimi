import os
import ConfigParser
import logging
import logging.config

from logging.handlers import RotatingFileHandler

from flask import Flask

from utils.utils import Utils

# Create utils instance.
utils = Utils()


def create_app():
    ''' Create the Flask app.
    '''
    # Create the Flask app.
    app = Flask(__name__)

    # Load application configurations
    load_config(app)

    # Configure logging.
    configure_logging(app)

    # Register URL rules.
    register_url_rules(app)

    return app


def load_config(app):
    ''' Reads the config file and loads configuration properties into the Flask app.
    :param app: The Flask app object.
    '''

    # Get the path to the application directory, that's where the config file resides.
    par_dir = os.path.join(__file__, os.pardir)
    par_dir_abs_path = os.path.abspath(par_dir)
    app_dir = os.path.dirname(par_dir_abs_path)

    # Read config file
    # FIXME: Use the "common pattern" described in "Configuring from Files": http://flask.pocoo.org/docs/config/
    config = ConfigParser.RawConfigParser()
    config_filepath = app_dir + '/config.cfg'
    config.read(config_filepath)

    # Set up config properties
    app.config['SERVER_PORT'] = config.get('Application', 'SERVER_PORT')
    app.config['BASE_PATH'] = config.get('Application', 'BASE_PATH')

    app.config['API_GJAKOVA_PROCUREMENT'] = config.get('Api', 'API_GJAKOVA_PROCUREMENT')

    # Logging path might be relative or starts from the root.
    # If it's relative then be sure to prepend the path with the application's root directory path.
    log_path = config.get('Logging', 'PATH')
    if log_path.startswith('/'):
        app.config['LOG_PATH'] = log_path
    else:
        app.config['LOG_PATH'] = app_dir + '/' + log_path

    app.config['LOG_LEVEL'] = config.get('Logging', 'LEVEL').upper()


def configure_logging(app):

    # Get the path of the log from the config
    log_path = app.config['LOG_PATH']

    # Get the level of logging from the config
    log_level = app.config['LOG_LEVEL']

    # If path directory doesn't exist, create it.
    log_dir = os.path.dirname(log_path)
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # Create formatter
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    # Create Log_Handler
    log_handler = RotatingFileHandler(log_path, maxBytes=250000, backupCount=5)

    # add formatter to log handler
    log_handler.setFormatter(formatter)

    # Get the level of the Debug and set it to the logger
    app.logger.setLevel(log_level)

    # Add the handlers to the logger
    app.logger.addHandler(log_handler)

    # Test if the logging is working by typing this string to a file.
    app.logger.info('Logging to: %s', log_path)


# Views for JSON requests
from views.json.budgettype import BudgetType
from views.json.procurementtype import ProcurementType
from views.json.treemap import TreeMap
from views.json.treemapprice import TreeMapPrice
from views.json.vleracmimi import VleraCmimi
from views.json.municipalityvleracmimi import MunicipalityVleraCmimi
from views.json.redflags import RedFlagsJson
from views.json.map import MapJson
from views.json.company_dir_json import CompanyDirectory
from views.json.company_details import CompanyDetails

# Views for Page rendering
from views.pages.index import Index
from views.pages.distribution import Distribution
from views.pages.typedistribution import TypeDistribution
from views.pages.map import Map
from views.pages.procurementdistribution import ProcurementDistribution
from views.pages.municipalityPriceValue import MunicipalityPriceValue
from views.pages.redflags import RedFlags
from views.pages.company_dir_pages import CompanyDir
from views.pages.company_details_page import CompanyDetailsPage


def register_url_rules(app):
    ''' Register URLs
    :param app: The Flask application instance.
    '''
    # Register the URL rules for JSON requests.
    register_json_url_rules(app)

    # Register the URL rules for page requests.
    register_page_url_rules(app)


def register_json_url_rules(app):
    ''' Register the URL rules for JSON requests.
    :param app: The Flask application instance.
    '''
    app.add_url_rule(
        '/json/<string:komuna>/buxheti/<int:year>',
        view_func=BudgetType.as_view('budget_type_json'))

    app.add_url_rule(
        '/json/<string:komuna>/prokurimi/<int:year>',
        view_func=ProcurementType.as_view('procurement_type_json'))

    app.add_url_rule(
        '/json/monthly-summary/<int:viti>',
        view_func=MunicipalityVleraCmimi.as_view('municipality_vlera_cmimi_json'))

    app.add_url_rule(
        '/json/<string:komuna>/monthly-summary/<int:viti>',
        view_func=VleraCmimi.as_view('vlera_cmimi_json'))

    app.add_url_rule(
        '/json/<string:komuna>/map/<int:viti>',
        view_func=MapJson.as_view('map_view_json'))

    app.add_url_rule(
        '/json/<string:komuna>/red-flags/<int:viti>',
        view_func=RedFlagsJson.as_view('red_flags_json'))

    # Get JSON for TreeMap
    app.add_url_rule(
        '/json/<string:komuna>/treemap/<int:year>',
        view_func=TreeMap.as_view('treemap_json'))

    app.add_url_rule(
        '/json/<string:komuna>/treemap/price/<int:year>',
        view_func=TreeMapPrice.as_view('treemap_price_json'))

    app.add_url_rule(
        '/json/kompanite/kerko/<string:kompania>',
        view_func=CompanyDirectory.as_view('company_dir_json'))

    app.add_url_rule(
        '/json/kompanite/<string:kompania_slug>',
        view_func=CompanyDetails.as_view('company_details_json'))


def register_page_url_rules(app):
    ''' Register the URL rules for page requests.
    :param app: The Flask application instance.
    '''
    # Index.
    app.add_url_rule(
        '/',
        view_func=Index.as_view('index'))

    app.add_url_rule(
        '/kompanite',
        view_func=CompanyDir.as_view('company-directory'))

    #app.add_url_rule(
    #    '/kompania/<string:company_slug>',
    #    view_func=CompanyDetails.as_view('company_details'))

    app.add_url_rule(
        '/<string:komuna>/',
        view_func=Distribution.as_view('distibution'))

    # Contract Distribution Amongst Companies
    app.add_url_rule(
        '/<string:komuna>/shperndarja/perfituesit',
        view_func=ProcurementDistribution.as_view('procurement_distribution'))

    # Budget/Procurement Type
    app.add_url_rule(
        '/<string:komuna>/shperndarja/<string:type>',
        view_func=TypeDistribution.as_view('type_distribution'))

    # Map Page:
    app.add_url_rule(
        '/<string:komuna>/harta',
        view_func=Map.as_view('maps'))

    app.add_url_rule(
        '/<string:komuna>/red-flags',
        view_func=RedFlags.as_view('redflags'))

    app.add_url_rule(
        '/kompanite/<string:kompania_slug>',
        view_func=CompanyDetailsPage.as_view('company_details'))


    app.add_url_rule(
        '/krahasimi',
        view_func=MunicipalityPriceValue.as_view('municipality_price_value'))
