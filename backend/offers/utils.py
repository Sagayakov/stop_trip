import base64
import io
import re
from io import BytesIO
from typing import Optional
from uuid import uuid4

from PIL import Image
from django.core.files.base import ContentFile
from slugify import slugify

from .models import Advertisement, AdvertisementImage, TransportBrand, TransportModel


def compression_photo(advertisement: Advertisement, images: list[str]) -> list[AdvertisementImage]:
    """Функция для сжатия качества загружаемых фото"""

    images_list: list[AdvertisementImage] = []
    for image in images:
        # Превращаем base64 в bytes
        byte_image = base64.b64decode(image)
        image_stream = io.BytesIO(byte_image)
        img = Image.open(image_stream)
        # Разрешение фото. При таком весит примерно 150кб
        img.thumbnail((1600, 1600))
        file = BytesIO()
        img = img.convert("RGB")
        img.save(file, format="JPEG", quality=70)
        image_content = ContentFile(file.getvalue(), name=str(uuid4()))
        file.seek(0)
        images_list.append(AdvertisementImage(advertisement=advertisement, image=image_content))
    return images_list


def change_link(youtube_link) -> Optional[str]:
    """Функция для преобразования ссылки с ютуба для корректного отображения на сайте"""

    regex = r"(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})"
    match = re.search(regex, youtube_link)

    if match:
        youtube_id_video = match.group(1)
        return f"https://www.youtube.com/embed/{youtube_id_video}?controls=0"
    return


class Parser:
    """
    Класс для парсинга брэндов и моделей транспорта.

    Формат даты для парсинга:
        brand_data = {
            "data": [
                {"id": 1, "name": "Acura"},
                {"id": 2, "name": "Alfa Romeo"},
                {"id": 3, "name": "AMC"},
                {"id": 4, "name": "Aston Martin"},
                {"id": 5, "name": "Audi"},
                {"id": 6, "name": "Avanti"},
                {"id": 7, "name": "Bentley"},
            ]
        }

        model_data = {
            "data": [
                {"brand_id": 1, "id": 1, "name": "CL Models (4)"},
                {"brand_id": 1, "id": 2, "name": "2.2CL"},
                {"brand_id": 1, "id": 3, "name": "2.3CL"},
                {"brand_id": 1, "id": 4, "name": "3.0CL"},
                {"brand_id": 1, "id": 5, "name": "3.2CL"},
            ]
        }

    """

    @staticmethod
    def parse_brands(data: dict[str, list[dict]]) -> None:
        brands_data: list[dict] = data["data"]
        db_brands_names: list[str] = TransportBrand.objects.values_list("name", flat=True)
        create_brands_list: list[TransportBrand] = []
        for brand_data in brands_data:
            if brand_data["name"] not in db_brands_names:
                new_brand = TransportBrand(
                    name=brand_data["name"],
                    slug=slugify(brand_data["name"]),
                    ref_id=brand_data["id"],
                )
                create_brands_list.append(new_brand)

        TransportBrand.objects.bulk_create(objs=create_brands_list)

    @staticmethod
    def parse_models(data: dict[str, list[dict]], category: str) -> None:
        models_data: list[dict] = data["data"]
        db_brands_ref_ids: dict[int, TransportBrand] = {
            brand.ref_id: brand for brand in TransportBrand.objects.all()
        }
        db_models_names: list[str] = list(TransportModel.objects.values_list("name", flat=True))
        db_models_slugs: list[str] = list(TransportModel.objects.values_list("slug", flat=True))
        create_models_list: list[TransportModel] = []
        for model_data in models_data:
            if model_data["name"] not in db_models_names:
                brand = db_brands_ref_ids.get(model_data["brand_id"])
                if brand:
                    if "+" in model_data["name"]:
                        slug = slugify(model_data["name"]) + " (plus)"
                    else:
                        slug = slugify(model_data["name"])

                    if slug in db_models_slugs:
                        continue

                    new_car_model = TransportModel(
                        brand=brand,
                        category=category,
                        name=model_data["name"],
                        slug=slug,
                        ref_id=model_data["id"],
                    )
                    create_models_list.append(new_car_model)
                    db_models_names.append(model_data["name"])
                    db_models_slugs.append(slug)

        TransportModel.objects.bulk_create(objs=create_models_list)
