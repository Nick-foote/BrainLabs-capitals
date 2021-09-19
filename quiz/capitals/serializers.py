from rest_framework import serializers

class CapitalCitySerializer(serializers.Serializer):
    country = serializers.CharField(max_length=100)
    capital = serializers.CharField(max_length=100)
