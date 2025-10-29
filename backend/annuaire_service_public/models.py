import uuid
from django.db import models
from django.contrib.auth.models import User


class Service(models.Model):
    id = models.CharField(max_length=100, blank=False, primary_key=True)
    number_of_click = models.IntegerField(default=0, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id


class Compilation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    service_id = models.CharField(max_length=100, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)
