import factory
from users.models import User

# fake = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    """Фабрика пользователей."""

    full_name = factory.Faker("word")
    phone = "+79997777777"
    email = "test@mail.ru"

    class Meta:
        model = User

    # full_name = fake.name()
    # email = fake.email()
    # password = fake.password()
