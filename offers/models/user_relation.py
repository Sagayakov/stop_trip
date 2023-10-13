from django.db import models
from users.models import User
from .advertisement import Advertisement
from ..constants.numbers_constants import FIVE_CHOICES


class UserRelation(models.Model):
    """Связь юзера с объектами моделей"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    model_used = models.ForeignKey(Advertisement, on_delete=models.CASCADE)
    like = models.BooleanField(default=False, verbose_name='Лайк')
    rating = models.PositiveSmallIntegerField(choices=FIVE_CHOICES, null=True)

    def __str__(self):
        return f'{self.user}: {self.model_used}, rating {self.rating}, like {self.like}'

    class Meta:
        verbose_name = "Взаимодействие пользователя"
        verbose_name_plural = "Взаимодействия пользователей"
