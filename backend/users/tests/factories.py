import datetime

import factory
from django.utils.timezone import now

from ..models import User, Rate

class UserFactory(factory.django.DjangoModelFactory):
    """Фабрика пользователей."""

    full_name = factory.Faker("name")
    phone = factory.Faker("phone_number")
    email = factory.Faker("email")

    class Meta:
        model = User


class RateFactory(factory.django.DjangoModelFactory):
    """Фабрика рейтингов."""

    from_user = factory.SubFactory(UserFactory)
    to_user = factory.SubFactory(UserFactory)
    comment = factory.Faker("sentence")
    rating = factory.Faker("pyint", min_value=1, max_value=5)
    date_created = now() - datetime.timedelta(days=1)
    date_updated = now()

    class Meta:
        model = Rate
