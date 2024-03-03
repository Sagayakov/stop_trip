import base64
import io
import re
from io import BytesIO
from typing import Optional
from uuid import uuid4

from PIL import Image
from django.core.files.base import ContentFile

from .models import Advertisement, AdvertisementImage


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
