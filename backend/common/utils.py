from io import BytesIO

from PIL import Image


def generate_image_file():
    """
    Генерирует файл изображения
    """

    file = BytesIO()
    image = Image.new("L", size=(100, 100), color=155)
    image.save(file, "png")
    file.name = "test.png"
    file.seek(0)
    return file
