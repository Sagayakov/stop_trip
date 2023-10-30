from datetime import timedelta
from os import getenv
from os.path import join
from pathlib import Path
from sys import argv

from django.utils.translation import gettext_lazy as _

SITE_HOST = getenv("SITE_HOST")

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = getenv("SECRET_KEY")

TESTING = "test" in argv or len(argv) >= 1 and "pytest" in argv[0]
DEBUG = getenv("DEBUG", "True") == "True" and not TESTING

ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ["http://localhost", "http://localhost:3000"]

# Application definition

INSTALLED_APPS = [
    "whitenoise.runserver_nostatic",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    "django.forms",
    # Third party
    "solo",
    "ckeditor",
    "djoser",
    "social_django",
    "rest_framework_simplejwt",
    "drf_spectacular",
    "rest_framework",
    "corsheaders",
    "phonenumber_field",
    "django_filters",
    "rest_framework_simplejwt.token_blacklist",
    "location_field.apps.DefaultConfig",
    # apps
    "offers.apps.OfferConfig",
    "users.apps.UserConfig",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

if DEBUG:
    INSTALLED_APPS.append("debug_toolbar")
    MIDDLEWARE.append("debug_toolbar.middleware.DebugToolbarMiddleware")

    def show_toolbar_callback(_):
        return DEBUG

    DEBUG_TOOLBAR_CONFIG = {"SHOW_TOOLBAR_CALLBACK": "config.settings.show_toolbar_callback"}

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": getenv("POSTGRES_NAME", "postgres"),
        "USER": getenv("POSTGRES_USER", "postgres"),
        "PASSWORD": getenv("POSTGRES_PASSWORD", "postgres"),
        "HOST": "db",
        "PORT": getenv("POSTGRES_PORT", 5432),
        "CONN_MAX_AGE": 600,
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

USE_TZ = True
USE_L10N = True
USE_I18N = True
LANGUAGE_CODE = "ru"
TIME_ZONE = "Europe/Moscow"
LANGUAGES = (("ru", _("Russian")), ("en", _("English")))

# HTTP
USE_X_FORWARDED_HOST = True
USE_X_FORWARDED_PORT = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Static
STATIC_URL = "/s/"
STATIC_ROOT = join(BASE_DIR, "static")

# Media
MEDIA_URL = "/m/"
MEDIA_ROOT = join(BASE_DIR, "media")

DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
BASE_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"

FILE_UPLOAD_DIRECTORY_PERMISSIONS = 0o755
FILE_UPLOAD_PERMISSIONS = 0o644

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# CKEditor
CKEDITOR_UPLOAD_PATH = "u/"
CKEDITOR_CONFIGS = {
    "default": {
        "toolbar_Custom": [
            {"name": "document", "items": ["Source"]},
            {
                "name": "clipboard",
                "items": [
                    "Cut",
                    "Copy",
                    "Paste",
                    "PasteText",
                    "PasteFromWord",
                    "-",
                    "Undo",
                    "Redo",
                ],
            },
            {
                "name": "paragraph",
                "items": [
                    "NumberedList",
                    "BulletedList",
                    "-",
                    "Outdent",
                    "Indent",
                    "-",
                    "Blockquote",
                    "-",
                    "JustifyLeft",
                    "JustifyCenter",
                    "JustifyRight",
                    "JustifyBlock",
                ],
            },
            {"name": "links", "items": ["Link", "Unlink", "Anchor"]},
            {"name": "insert", "items": ["Table", "HorizontalRule", "SpecialChar"]},
            "/",
            {"name": "styles", "items": ["Styles", "Format", "Font", "FontSize"]},
            {
                "name": "basicstyles",
                "items": [
                    "Bold",
                    "Italic",
                    "Underline",
                    "Strike",
                    "Subscript",
                    "Superscript",
                    "-",
                    "RemoveFormat",
                ],
            },
            {"name": "colors", "items": ["TextColor", "BGColor"]},
        ],
        "toolbar": "Custom",
        "extraPlugins": ["liststyle"],
    }
}

REST_FRAMEWORK = {
    # "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("JWT",),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
}
DOMAIN = "localhost:3000"
DJOSER = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
    "SEND_CONFIRMATION_EMAIL": True,
    "SET_PASSWORD_RETYPE": True,
    "PASSWORD_RESET_CONFIRM_URL": "email/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "activate/{uid}/{token}",
    "SEND_ACTIVATION_EMAIL": True,
    # "SOCIAL_AUTH_TOKEN_STRATEGY": "djoser.social.token.jwt.TokenStrategy",
    # "SOCIAL_AUTH_ALLOWED_REDIRECT_URIS": [
    #     "your redirect url",
    #     "your redirect url",
    # ],
    "SERIALIZERS": {
        "user_create": "accounts.serializers.UserCreateSerializer",  # custom serializer
        "user": "djoser.serializers.UserSerializer",
        "current_user": "djoser.serializers.UserSerializer",
        "user_delete": "djoser.serializers.UserSerializer",
    },
}
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = (
    "122772244998-vb3lifol0idvv8p7m112bglj35fch77l.apps.googleusercontent.com"
)
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = "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"
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
]
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = ["first_name"]

if not DEBUG:
    REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = ["rest_framework.renderers.JSONRenderer"]

SESSION_COOKIE_AGE = 31_536_000
SESSION_ENGINE = "django.contrib.sessions.backends.cache"

AUTHENTICATION_BACKENDS = ["django.contrib.auth.backends.ModelBackend"]

# Кастомный пользователь
AUTH_USER_MODEL = "users.User"

# Cors
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

SITE_ID = 1

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "tripstop756@gmail.com"
EMAIL_HOST_PASSWORD = "tgtbrulnxevkxtlb"
EMAIL_USE_TLS = True

# Django location_field
# todo js в админке не тот, разобраться
LOCATION_FIELD_PATH = "/s/" + "location_field"
LOCATION_FIELD = {
    "map.provider": "google",
    "map.zoom": 13,
    "search.provider": "google",
    "search.suffix": "",
    # Google
    "provider.google.api": "//maps.google.com/maps/api/js?sensor=false",
    "provider.google.api_key": "",
    "provider.google.api_libraries": "",
    "provider.google.map.type": "ROADMAP",
    # Mapbox
    "provider.mapbox.access_token": "",
    "provider.mapbox.max_zoom": 18,
    "provider.mapbox.id": "mapbox.streets",
    # OpenStreetMap
    "provider.openstreetmap.max_zoom": 18,
    # misc
    "resources.root_path": LOCATION_FIELD_PATH,
    "resources.media": {
        "js": (LOCATION_FIELD_PATH + "/js/form.js",),
    },
}
