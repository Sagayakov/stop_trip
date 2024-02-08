from django.urls import reverse
from pytest import mark
from rest_framework.test import APITestCase
from rest_framework import status

from report.models import ReportModel
from users.tests.factories import UserFactory
from offers.tests.factories import TaxiAdvertisementFactory


@mark.django_db
class ReportViewSetTest(APITestCase):
    def setUp(self):
        self.list_url: str = reverse("report-list")

    def test_create_report(self):
        user = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        payload = {
            "advertisement": advertisement.slug,
            "reason": "other",
            "description": "New description for new report",
        }
        self.client.force_login(user)
        self.assertEqual(ReportModel.objects.count(), 0)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ReportModel.objects.count(), 1)

        report = ReportModel.objects.first()
        self.assertEqual(report.from_user, user)
        self.assertEqual(report.reason, payload["reason"])
        self.assertEqual(report.description, payload["description"])
        self.assertEqual(report.advertisement.slug, payload["advertisement"])

    def test_repeat_report(self):
        user = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        payload = {
            "advertisement": advertisement.slug,
            "reason": "other",
            "description": "New description for new report",
        }
        payload_new = {
            "advertisement": advertisement.slug,
            "reason": "scammer",
            "description": "New description for new report about scammer",
        }
        self.client.force_login(user)
        self.client.post(self.list_url, data=payload)
        self.assertEqual(ReportModel.objects.count(), 1)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload_new)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_different_user(self):
        user = UserFactory()
        new_user = UserFactory()
        advertisement = TaxiAdvertisementFactory(owner=user)
        payload = {
            "advertisement": advertisement.slug,
            "reason": "other",
            "description": "New description for new report",
        }
        payload_new = {
            "advertisement": advertisement.slug,
            "reason": "scammer",
            "description": "New description for new report about scammer",
        }
        self.client.force_login(user)
        self.client.post(self.list_url, data=payload)
        self.assertEqual(ReportModel.objects.count(), 1)
        self.client.force_login(new_user)
        self.assertEqual(ReportModel.objects.count(), 1)

        with self.assertNumQueries(3):
            res = self.client.post(self.list_url, data=payload_new)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ReportModel.objects.count(), 2)
        report_first = ReportModel.objects.first()
        report_last = ReportModel.objects.last()
        self.assertEqual(report_last.from_user, new_user)
        self.assertEqual(report_first.from_user, user)
        self.assertEqual(report_last.from_user, new_user)
