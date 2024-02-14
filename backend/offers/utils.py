import re
from .models import Advertisement, AdvertisementImage
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


def compression_photo(advertisement: Advertisement, images: list[AdvertisementImage]):
    """Функция для сжатия качества загружаемых фото"""

    images_list: list[AdvertisementImage] = []
    for image in images:
        img = Image.open(image)
        # Разрешение фото. При таком весит примерно 150кб
        img.thumbnail((1600, 1600))
        output_io = BytesIO()
        img.save(output_io, format="JPEG", quality=70)
        image_file = InMemoryUploadedFile(
            output_io, None, image.name, "image/jpeg", output_io.tell(), None
        )
        output_io.seek(0)
        images_list.append(AdvertisementImage(advertisement=advertisement, image=image_file))
    return images_list


def change_link(youtube_link):
    """Функция для преобразования ссылки с ютуба для корректного отображения на сайте"""

    regex = r"(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})"
    match = re.search(regex, youtube_link)

    if match:
        youtube_id_video = match.group(1)
        return f"https://www.youtube.com/embed/{youtube_id_video}?controls=0"
    return None
