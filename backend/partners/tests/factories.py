import factory
from partners.models import PartnerModel, PartnerImageModel


class PartnerFactory(factory.django.DjangoModelFactory):
    """Фабрика партнеров"""

    title = factory.Faker("word")
    description = factory.Faker("text", max_nb_chars=300)
    contact = factory.Faker("word")
    link = factory.Faker("url")

    class Meta:
        model = PartnerModel


class PartnerImageFactory(factory.django.DjangoModelFactory):
    """Фабрика картинок объявлений."""

    partner = factory.SubFactory(PartnerFactory)
    image = factory.django.ImageField()

    class Meta:
        model = PartnerImageModel
