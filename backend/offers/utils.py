from offers.models import Advertisement, AdvertisementImage
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
