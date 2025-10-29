from rest_framework import serializers
from .models import Service, Compilation


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class CompilationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compilation
        fields = "__all__"
