from typing import Optional

from django.db import models
from django.db.models import Avg, Count, Case, When, Q, F, IntegerField


class UserQuerySet(models.QuerySet):
    """Для возможности использования кверисета необходимо вначале вызвать .all()."""

    def annotate_avg_rating(self):
        return self.annotate(avg_rating=Avg("rating_to_users__rating", default=0))

    def annotate_rating_num(self):
        return self.annotate(rating_num=Count("rating_to_users__rating"))

    def annotate_my_rating(self, user_id: Optional[int] = None):
        return self.annotate(
            my_rating=Case(
                When(Q(rating_to_users__from_user=user_id), then=F("rating_to_users__rating")),
                default=0,
                output_field=IntegerField(),
            )
        )
