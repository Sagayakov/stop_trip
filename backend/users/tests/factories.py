import factory
from ..models import User


class UserFactory(factory.django.DjangoModelFactory):
    """Фабрика пользователей."""

    full_name = factory.Faker("name")
    phone = factory.Faker("phone_number")
    email = factory.Faker("email")

    class Meta:
        model = User
