from typing import Optional

from django.db.models import (
    Avg,
    Count,
    Case,
    When,
    Q,
    F,
    IntegerField,
    QuerySet,
    Subquery,
    OuterRef,
)

from users.models import Rate


class UserQuerySet(QuerySet):
    """Для возможности использования кверисета необходимо вначале вызвать .all()."""

    def annotate_avg_rating(self):
        return self.annotate(avg_rating=Avg("rating_to_users__rating", default=0))

    def annotate_rating_num(self):
        return self.annotate(rating_num=Count("rating_to_users__rating"))

    def annotate_my_rating(self, user_id: Optional[int] = None):
        rating = Subquery(
            Rate.objects.select_related("from_user", "to_user")
            .filter(from_user=user_id, to_user=OuterRef("pk"))
            .values("rating")[:1]
        )

        return self.annotate(my_rating=rating)

        # return self.annotate(
        #     my_rating=Case(
        #         When(Q(rating_to_users__from_user=user_id), then=F("rating_to_users__rating")),
        #         default=None,
        #         output_field=IntegerField(),
        #     )
        # )
