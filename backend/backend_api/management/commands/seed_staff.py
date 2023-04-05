import random

from django.core.management import BaseCommand
from django_seed import Seed

from backend_api.models import Positions, Staff
from backend_api.utils import generate_date


class Command(BaseCommand):
    help = "This command creates many users"

    def add_arguments(self, parser):
        parser.add_argument(
            "--number", default=1, type=int, help="How many users do you want to create"
        )

    def handle(self, *args, **options):
        all_positions = list(Positions.objects.all())
        all_number = 0
        seeder = Seed.seeder()

        for position in all_positions:
            number = 2 ** all_positions.index(position)
            if number != 1:
                all_managers = Staff.objects.filter(position=all_positions[all_positions.index(position) - 1])
                for manager in all_managers:
                    seeder.add_entity(Staff, round(number / len(all_managers)),
                                      {
                                          'fullname': lambda x: seeder.faker.name(),
                                          'position': Positions.objects.get(position=position),
                                          'date_admission': lambda x: generate_date(),
                                          'email': lambda x: seeder.faker.email(),
                                          'manager': manager
                                      })
                    seeder.execute()
            else:
                seeder.add_entity(Staff, number,
                                  {
                                      'fullname': lambda x: seeder.faker.name(),
                                      'position': Positions.objects.get(position=position),
                                      'date_admission': lambda x: generate_date(),
                                      'email': lambda x: seeder.faker.email(),
                                      'manager': None
                                  })
                seeder.execute()
            all_number += number

        self.stdout.write(self.style.SUCCESS(f"{all_number} Users created!"))
