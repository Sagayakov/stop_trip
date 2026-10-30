"""
Демо-данные для локальной разработки и проверки дизайна.

Запуск:  docker compose exec backend python manage.py seed_demo
Удалить: docker compose exec backend python manage.py seed_demo --clear

Создаёт пользователя demo@stoptrip.local (пароль: demo-stoptrip) и ~16 объявлений
в разных категориях и городах Вьетнама с картинками-заглушками.
"""

import math
import random
from io import BytesIO

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from PIL import Image, ImageDraw, ImageFilter
from slugify import slugify

from countries.models import City
from offers.constants import CategoryChoices
from offers.models import Advertisement, AdvertisementImage, Currency, TransportBrand, TransportModel
from users.models import User

DEMO_EMAIL = "demo@stoptrip.local"
DEMO_PASSWORD = "demo-stoptrip"

# (категория, заголовок, описание, цена в донгах, город, палитра картинки)
ADS = [
    ("property", "Студия с видом на море, 5 минут до пляжа", "Светлая студия 35 м² в новом доме на набережной. Бассейн, спортзал, охрана. Можно с питомцами.", 9_500_000, "nha-trang", ("#0ea5e9", "#22d3ee")),
    ("property", "Вилла с бассейном в Ан Банге", "Три спальни, сад, бассейн, уборка два раза в неделю. Идеально для семьи.", 38_000_000, "hoi-an", ("#059669", "#a7f3d0")),
    ("property", "Апартаменты в центре Дананга", "Две комнаты, полностью оборудованная кухня, вид на реку Хан и мост Дракона.", 14_000_000, "da-nang", ("#6366f1", "#c7d2fe")),
    ("transport", "Аренда Honda Air Blade 125", "Свежий байк 2024 года, два шлема, страховка. Доставим к отелю.", 2_800_000, "nha-trang", ("#f97316", "#fed7aa")),
    ("transport", "Yamaha NVX 155 на месяц", "Мощный и удобный скутер для поездок по побережью. Залог — паспорт не берём.", 3_500_000, "phu-quoc", ("#dc2626", "#fecaca")),
    ("taxi", "Трансфер из аэропорта Камрань", "Встретим с табличкой, поможем с багажом. Машины на 4 и 7 мест.", 450_000, "cam-ranh", ("#facc15", "#fef9c3")),
    ("excursion", "Острова Нячанга на катере", "Снорклинг, обед из морепродуктов, фото с дрона. Группа до 10 человек, русский гид.", 1_200_000, "nha-trang", ("#0284c7", "#7dd3fc")),
    ("excursion", "Далат: водопады и кофейные плантации", "Поездка на целый день с дегустацией кофе и обедом.", 1_650_000, "da-lat", ("#16a34a", "#bbf7d0")),
    ("food", "Домашние пельмени и борщ с доставкой", "Готовим каждый день, доставка по Нячангу от двух порций.", 180_000, "nha-trang", ("#b91c1c", "#fde68a")),
    ("service", "Маникюр и педикюр на дому", "Мастер с опытом 8 лет, стерильные инструменты, гель-лак.", 350_000, "da-nang", ("#db2777", "#fbcfe8")),
    ("service", "Русскоязычный педиатр, консультации", "Консультации онлайн и с выездом. Помогу разобраться с местными клиниками.", 700_000, "ho-chi-minh", ("#0d9488", "#99f6e4")),
    ("document", "Продление визы и e-visa под ключ", "Оформим e-visa, продлим визу без выезда, поможем с регистрацией.", 1_900_000, "nha-trang", ("#475569", "#cbd5e1")),
    ("exchange_rate", "Обмен рублей на донги по хорошему курсу", "Быстро и безопасно, встреча в людном месте или перевод.", None, "nha-trang", ("#ca8a04", "#fde047")),
    ("market", "Детская коляска Cybex, как новая", "Использовали три месяца, полный комплект, есть чехол от дождя.", 4_200_000, "phu-quoc", ("#7c3aed", "#ddd6fe")),
    ("job", "Требуется администратор в кафе", "Русский и английский язык, график 5/2, зарплата + чаевые.", 12_000_000, "da-nang", ("#2563eb", "#bfdbfe")),
    ("event", "Йога на рассвете на пляже Чан Фу", "Каждое утро в 5:30, коврики выдаём. Первое занятие бесплатно.", 150_000, "nha-trang", ("#ea580c", "#fdba74")),
]


def _hex(color: str) -> tuple[int, int, int]:
    color = color.lstrip("#")
    return tuple(int(color[i : i + 2], 16) for i in (0, 2, 4))


def make_image(colors: tuple[str, str], seed: int) -> ContentFile:
    """Мягкий градиент с размытыми пятнами — аккуратная заглушка вместо фото."""

    rnd = random.Random(seed)
    w, h = 1200, 900
    a, b = _hex(colors[0]), _hex(colors[1])
    img = Image.new("RGB", (w, h))
    draw = ImageDraw.Draw(img)
    for y in range(h):
        t = y / h
        draw.line([(0, y), (w, y)], fill=tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3)))
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for _ in range(6):
        r = rnd.randint(120, 320)
        x, y = rnd.randint(0, w), rnd.randint(0, h)
        alpha = rnd.randint(40, 90)
        od.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, alpha))
    overlay = overlay.filter(ImageFilter.GaussianBlur(60))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    # тонкая «линия горизонта»
    draw = ImageDraw.Draw(img)
    for x in range(w):
        y = int(h * 0.68 + 18 * math.sin(x / 90 + seed))
        draw.point((x, y), fill=(255, 255, 255))
    out = BytesIO()
    img.save(out, "JPEG", quality=85)
    return ContentFile(out.getvalue(), name=f"demo-{seed}.jpg")


class Command(BaseCommand):
    help = "Создаёт демо-объявления для локальной разработки"

    def add_arguments(self, parser):
        parser.add_argument("--clear", action="store_true", help="Удалить демо-данные")

    def handle(self, *args, **options):
        user = User.objects.filter(email=DEMO_EMAIL).first()
        if options["clear"]:
            if user:
                user.delete()
            self.stdout.write(self.style.SUCCESS("Демо-данные удалены"))
            return

        if not user:
            user = User.objects.create_user(
                email=DEMO_EMAIL,
                password=DEMO_PASSWORD,
                full_name="Анна (демо)",
                phone="+84901234567",
            )
        if user.advertisements.exists():
            self.stdout.write("Демо-объявления уже есть. Для пересоздания: seed_demo --clear")
            return

        honda, _ = TransportBrand.objects.get_or_create(slug="honda", defaults={"name": "Honda"})
        air_blade, _ = TransportModel.objects.get_or_create(
            slug="air-blade", defaults={"name": "Air Blade", "brand": honda, "category": "motorcycle"}
        )
        vnd = Currency.objects.filter(short_name="VND").first()
        rub = Currency.objects.filter(short_name="RUB").first()

        for index, (category, title, description, price, city_slug, colors) in enumerate(ADS):
            city = City.objects.select_related("region__country").get(slug=city_slug)
            extra = {}
            if category == CategoryChoices.TRANSPORT:
                extra = {
                    "transport_type_of_service": "rent",
                    "transport_type": "ground",
                    "transport_category": "motorcycle",
                    "transport_brand": honda,
                    "transport_model": air_blade,
                }
            elif category == CategoryChoices.TAXI:
                extra = {"taxi_unit": "route", "taxi_type": "comfort"}
            elif category == CategoryChoices.EXCHANGE_RATE:
                extra = {"proposed_currency": rub, "exchange_for": vnd, "exchange_rate": 285}
            elif category == CategoryChoices.PROPERTY:
                extra = {"property_type_of_service": "rent", "property_rooms_count": 2}

            advertisement = Advertisement(
                owner=user,
                category=category,
                title=title,
                slug=slugify(title),
                description=description,
                price=price,
                country=city.region.country,
                region=city.region,
                city=city,
                **extra,
            )
            try:
                advertisement.save()
            except Exception as error:  # если в константах категорий другое значение — просто пропустим поле
                self.stdout.write(self.style.WARNING(f"Пропущено «{title}»: {error}"))
                continue
            for photo in range(2 if index % 3 else 3):
                AdvertisementImage.objects.create(
                    advertisement=advertisement, image=make_image(colors, index * 10 + photo)
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Готово: {user.advertisements.count()} объявлений. "
                f"Вход: {DEMO_EMAIL} / {DEMO_PASSWORD}"
            )
        )
