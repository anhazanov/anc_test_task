from django.test import TestCase

from backend_api.models import Staff, Positions
from backend_api.serializers import StaffSerializer
from backend_api.utils import generate_date


class StaffSerializersTestCase(TestCase):
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

    def test_ok(self):
        serializer_data = StaffSerializer([self.staff1, self.staff2], many=True).data
        extend_data = [
            {
                "id": self.staff1.id,
                "position": "1 Lv. - chairman",
                "manager": None,
                "fullname": "John Smith",
                "date_admission": self.staff1.date_admission,
                "email": "anh@gmail.com"
            },
            {
                "id": self.staff2.id,
                "position": "2 Lv. - director",
                "manager": "John Smith - 1 Lv. - chairman",
                "fullname": "Nicole Kidman",
                "date_admission": self.staff2.date_admission,
                "email": "nk@gmail.com"
            },
        ]
        self.assertEqual(serializer_data, extend_data)