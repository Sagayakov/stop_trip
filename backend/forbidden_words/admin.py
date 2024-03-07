from django.contrib import admin
from solo.admin import SingletonModelAdmin
from django import forms

from forbidden_words.models import ForbiddenWords


class ForbiddenWordsForm(forms.ModelForm):
    class Meta:
        model = ForbiddenWords
        fields = "__all__"
        widgets = {
            "russian_words": forms.Textarea(attrs={"rows": 30, "cols": 100}),
            "english_words": forms.Textarea(attrs={"rows": 30, "cols": 100}),
        }


@admin.register(ForbiddenWords)
class ForbiddenWordsAdmin(SingletonModelAdmin):
    form = ForbiddenWordsForm
