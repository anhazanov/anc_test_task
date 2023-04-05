from django.db import models

from .utils import generate_date


class Positions(models.Model):
    choice_position = (
        ('chairman', 'chairman'),
        ('director', 'director'),
        ('unit manager', 'unit manager'),
        ('deputy unit manager', 'deputy unit manager'),
        ('engineer', 'engineer'),
        ('worker', 'worker'),
        ('intern', 'intern'),
    )
    position = models.CharField(max_length=255, choices=choice_position)
    manager = models.OneToOneField('self', on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return f'{self.id} Lv. - {self.position}'


class Staff(models.Model):
    fullname = models.CharField(max_length=255)
    position = models.ForeignKey(Positions, on_delete=models.PROTECT)
    date_admission = models.DateField(default=generate_date())
    email = models.EmailField(max_length=255)
    manager = models.ForeignKey('self', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.fullname} - {self.position}'
