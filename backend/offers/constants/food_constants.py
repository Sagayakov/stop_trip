from django.db.models import TextChoices


class FoodType(TextChoices):
    VEG_FOOD = "veg_food", "Вегетарианская еда"
    NON_VEG_FOOD = "non_veg_food", "Невегетарианская еда"
    READY_FOOD = "ready_food", "Готовая еда"
    SEMI_FINISHED_FOOD = "semi_finished_food", "Полуфабрикаты"
    OTHER_FOOD = "other_food", "Другое"
