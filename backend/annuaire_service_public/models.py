from django.db import models
from django.contrib.auth.models import User


class Service(models.Model):
    id = models.CharField(max_length=100, blank=False, primary_key=True)
    number_of_click = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return self.id
