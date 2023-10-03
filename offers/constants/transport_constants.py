from django.db.models import TextChoices


class TransportTypeOfService(TextChoices):
    SALE = "sale", "Продажа"
    RENT = "rent", "Аренда"


class TransportType(TextChoices):
    GROUND = "ground", "Наземный"
    WATER = "water", "Водный"


class TransportCategory(TextChoices):
    # наземный
    MOTORCYCLE = "motorcycle", "Мотоцикл"
    MOPED = "moped", "Мопед"
    CAR = "car", "Легковой автомобиль"
    TRUCK = "truck", "Грузовой автомобиль"
    BUS = "bus", "Автобус"
    TRICYCLE = "tricycle", "Трицикл"
    TRAILER = "trailer", "Трэйлер"
    ROADHOUSE = "roadhouse", "Дом на колёсах"
    # водный
    MOTORBOAT = "motorboat", "Моторная лодка"
    OAR_BOAT = "oar_boat", "Вёсельная лодка"
    BOAT = "boat", "Катер"
    # другое
    OTHER = "other", "Другое"


class TransportEngineType(TextChoices):
    FUEL = "fuel", "Бензин"
    DIESEL = "diesel", "Дизель"
    GAS = "gas", "Газ"
    ELECTRIC = "electric", "Электричество"
    HYBRID = "hybrid", "Гибрид"


class TransportDriveType(TextChoices):
    FRONT_WHEEL = "front_wheel", "Передний"
    REAR_WHEEL = "rear_wheel", "Задний"
    ALL_WHEEL = "all_wheel", "Постоянный полный"
    FOUR_WHEEL = "four_wheel", "Подключаемый полный"


class TransportTransmissionType(TextChoices):
    MECHANIC = "mechanic", "Механическая"
    AUTOMATIC = "automatic", "Автоматическая"


class TransportBodyType(TextChoices):
    SEDAN = "sedan", "Седан"
    LIFTBACK = "liftback", "Лифтбэк"
    COUPE = "coupe", "Купе"
    CONVERTIBLE = "convertible", "Кабриолет"
    HATCHBACK = "hatchback", "Хэтчбэк"
    SUV = "SUV", "Внедорожник"
    LIMOUSINE = "limousine", "Лимузин"
    PICKUP = "pickup", "Пикап"


class TransportCondition(TextChoices):
    NEW = "new", "Новый"
    USED = "used", "Б/у"
    SALVAGE = "salvage", "Аварийный"
    SPARE = "spare", "На запчасти"
