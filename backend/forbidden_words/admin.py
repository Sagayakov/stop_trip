from django.contrib import admin
from solo.admin import SingletonModelAdmin

from forbidden_words.models import ForbiddenWords


@admin.register(ForbiddenWords)
class ForbiddenWordsAdmin(SingletonModelAdmin):
    pass
