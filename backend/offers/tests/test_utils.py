from pytest import mark

from offers.models import TransportBrand, TransportModel
from offers.utils import Parser


@mark.django_db
def test_parser():
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

    parser = Parser()
    parser.parse_brands(data=brand_data)
    parser.parse_models(data=model_data, category="car")

    assert TransportBrand.objects.count() == len(brand_data["data"])
    models = TransportModel.objects.all()
    assert models.count() == len(model_data["data"])
    brand = TransportBrand.objects.get(ref_id=model_data["data"][0]["brand_id"])
    assert all([model.brand == brand for model in models])
