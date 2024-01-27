import datetime

import factory
from django.utils.timezone import now

from ..models import User, Rate, Messenger, UserMessenger


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


class MessengerFactory(factory.django.DjangoModelFactory):
    """Фабрика мессенджеров."""

    name = factory.Faker("name")
    link_to_messenger = factory.Faker("name")

    class Meta:
        model = Messenger


class UserMessengerFactory(factory.django.DjangoModelFactory):
    """Фабрика связи юзера с мессенджером."""

    owner = factory.SubFactory(UserFactory)
    messenger = factory.SubFactory(MessengerFactory)
    link_to_user = factory.Faker("name")

    class Meta:
        model = UserMessenger
