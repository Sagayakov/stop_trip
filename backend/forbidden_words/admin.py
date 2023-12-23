from django.contrib import admin

from forbidden_words.models import ForbiddenWords


@admin.register(ForbiddenWords)
class ForbiddenWordsAdmin(admin.ModelAdmin):
    pass
