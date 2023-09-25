import factory
from faker import Faker
from users.models import User

fake = Faker()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User
    full_name = fake.name()
    email = fake.email()
    password = fake.password()

