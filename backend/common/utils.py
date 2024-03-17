import base64
from io import BytesIO

from PIL import Image


def generate_image_file():
    """Генерирует файл изображения."""

    file = BytesIO()
    image = Image.new("L", size=(100, 100), color=155)
    image.save(file, "png")
    file.name = "test.png"
    file.seek(0)
    return file


def encode_bytes_to_base64(file: BytesIO):
    """Кодируем байты в base64."""

    encoded = base64.b64encode(file.read())
    base64_image = encoded.decode("utf-8")
    return base64_image
