import os
from dotenv import load_dotenv

# DOT_ENV_FILE holds the name of file in which all environment vars are set.
# If present, we try to load the vars from this file. it will continue gracefully if file not found etc.
dot_env_file = os.environ.get("DOT_ENV")
abs_path = os.path.realpath(dot_env_file) if dot_env_file else None
if abs_path and os.path.isfile(abs_path):
    load_dotenv(abs_path, verbose=True)


class BaseConfig(object):
    DEBUG = True
    TESTING = False
    SECRET_KEY = os.environ['SECRET_KEY']
    SITE_NAME = os.environ.get("SITE_NAME", "site_name.com")
    LOG_LEVEL = "DEBUG"

    REDIS_HOST = os.environ.get("REDIS_HOST", "localhost")
    GOOGLE_API_KEY = os.environ['GOOGLE_API_KEY']

    @classmethod
    def init_app(cls, app):
        pass


class DevelopmentConfig(BaseConfig):

    @classmethod
    def init_app(cls, app):
        super(DevelopmentConfig, cls).init_app(app)


class TestingConfig(DevelopmentConfig):
    TESTING = True

    @classmethod
    def init_app(cls, app):
        super(TestingConfig, cls).init_app(app)


class ProductionConfig(BaseConfig):
    LOG_LEVEL = "ERROR"

    @classmethod
    def init_app(cls, app):
        super(ProductionConfig, cls).init_app(app)


class EnvironmentName:
    """
    use this class to refer to names of environments.
    """
    development = 'development'
    testing = 'testing'
    production = 'production'
    default = 'default'

    @classmethod
    def all_names(cls):
        return [attr for attr in dir(cls)
                if not (attr.startswith('__') or attr == 'all_names')]


configs = {
    EnvironmentName.development: DevelopmentConfig,
    EnvironmentName.testing: TestingConfig,
    EnvironmentName.production: ProductionConfig,
    EnvironmentName.default: DevelopmentConfig
}
