import datetime
import random


def generate_date():
    start_date = datetime.date(1997, 10, 19)
    end_date = datetime.date(2023, 10, 19)
    random_date = start_date + (end_date - start_date) * random.random()
    return random_date
