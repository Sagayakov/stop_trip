import factory

from forbidden_words.models import ForbiddenWords


class ForbiddenWordsFactory(factory.django.DjangoModelFactory):
    russian_words = ["слово1", "слово2", "слово3"]
    english_words = ["word1", "word2", "word3"]

    class Meta:
        model = ForbiddenWords

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        if model_class.objects.exists():
            return model_class.objects.first()
        obj = super()._create(model_class, *args, **kwargs)
        obj.save()
        return obj
