from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from backend_api.models import Staff, Positions
from backend_api.serializers import StaffSerializer
from backend_api.utils import generate_date


class StaffApiTestCase(APITestCase):
    def setUp(self) -> None:
        position1 = Positions.objects.create(
            position='chairman',
            manager=None,
        )
        position2 = Positions.objects.create(
            position='director',
            manager=position1,
        )

        self.staff1 = Staff.objects.create(
            fullname='John Smith',
            position=position1,
            date_admission=generate_date(),
            email='anh@gmail.com',
            manager=None,
        )
        self.staff2 = Staff.objects.create(
            fullname='Nicole Kidman',
            position=position2,
            date_admission=generate_date(),
            email='nk@gmail.com',
            manager=self.staff1,
        )

    def test_get(self):
        url = reverse('staff-list')
        response = self.client.get(url)

        serializer_data = StaffSerializer([self.staff1, self.staff2], many=True).data

        self.assertEqual(serializer_data, response.data)
        self.assertEqual(status.HTTP_200_OK, response.status_code)
