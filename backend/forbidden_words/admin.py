from django.contrib import admin
from solo.admin import SingletonModelAdmin
from django import forms

from forbidden_words.models import ForbiddenWords


class ForbiddenWordsForm(forms.ModelForm):
    class Meta:
        model = ForbiddenWords
        fields = "__all__"
        help_texts = {
            "russian_words": (
                "Слова через запятую. Слово ищется целиком. Чтобы ловить все формы слова, "
                "поставьте * в конце: «дурак*» найдёт «дурака», «дураки». "
                "Латинские буквы-двойники и буквы через пробел тоже ловятся."
            ),
            "english_words": (
                "Words separated by commas. Whole words only; add * at the end to match "
                "all forms: «scam*» matches «scammer»."
            ),
        }
        widgets = {
            "russian_words": forms.Textarea(attrs={"rows": 30, "cols": 100}),
            "english_words": forms.Textarea(attrs={"rows": 30, "cols": 100}),
        }


@admin.register(ForbiddenWords)
class ForbiddenWordsAdmin(SingletonModelAdmin):
    form = ForbiddenWordsForm
