from pytest import mark

from offers.models import TransportBrand, TransportModel
from offers.utils import Parser


@mark.django_db
def test_parser():
    brands_data = {
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

    parser = Parser()
    parser.parse_brands(data=brands_data)
    parser.parse_models(brands_data=brands_data, models_data=model_data, category="car")

    assert TransportBrand.objects.count() == len(brands_data["data"])
    models = TransportModel.objects.all()
    assert models.count() == len(model_data["data"])
    brand = TransportBrand.objects.get(name=brands_data["data"][0]["name"])
    assert all([model.brand == brand for model in models])


def _jpeg_with_orientation(width: int, height: int, orientation: int) -> bytes:
    """JPEG, как его сохраняет iPhone: пиксели «как лёг сенсор», поворот — в EXIF."""

    from io import BytesIO

    from PIL import Image

    image = Image.new("RGB", (width, height), "red")
    exif = image.getexif()
    exif[0x0112] = orientation  # EXIF Orientation
    file = BytesIO()
    image.save(file, "JPEG", exif=exif.tobytes())
    return file.getvalue()


def test_compress_image_applies_exif_orientation():
    import base64
    from io import BytesIO

    from PIL import Image

    from offers.utils import compress_image

    # Orientation=6: кадр 400x300 нужно повернуть на 90°, на экране он вертикальный 300x400.
    raw = _jpeg_with_orientation(400, 300, orientation=6)

    content = compress_image(base64.b64encode(raw).decode())
    result = Image.open(BytesIO(content.read()))

    assert result.size == (300, 400)
    assert result.format == "JPEG"
    assert content.name.endswith(".jpg")


def test_compress_image_invalid_file_raises_validation_error():
    import base64

    import pytest
    from rest_framework.exceptions import ValidationError

    from offers.utils import compress_image

    with pytest.raises(ValidationError):
        compress_image(base64.b64encode(b"definitely not an image").decode())
