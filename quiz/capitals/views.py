from random import randrange
import requests
from requests.exceptions import SSLError, Timeout
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
import logging

from capitals.serializers import CapitalCitySerializer


URL = settings.WORLD_COUNTRIES_API_URL

console_handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s %(name)s %(levelname)s:%(message)s')
console_handler.setLevel(logging.DEBUG)
console_handler.setFormatter(formatter)

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(console_handler)


class HomeView(APIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = CapitalCitySerializer

    def get(self, request):
        """On every request, the server connects to the external API 
        and collects a country & Capital pair."""        
        
        data = (self.get_random_country())
        print(f"\n {data} \n")
        return Response(data)

    def get_random_country(self):
        try:
            response = requests.get(URL)
        except SSLError:
            logger.error("URL not working, please check URL in settings is correct")
        except Timeout:
            logger.error("Timeout with URL, external domain may not be responding")

        data_json = response.json()
        count_countries = len(data_json)

        # Not all countries in the API have Capital's such as 
        # 'United States Minor Outlying Islands', so we need to ignore these results
        while True:
            random_index = randrange(0, (count_countries + 1))
            if data_json[random_index] ["capital"]:
                break

        country_object = data_json[random_index]
        return {
            "country": country_object["name"], 
            "capital": country_object["capital"]
            }











# pick country at random
# ask user to enter the capital city
# check user input for correct answer
# show user correct answer if incorrect



# BACKEND

# 1)
# fetch data from url
# get random number between 0 len(data)
# data[randint] = country
# get capital + country from JSON object = {"name", "capital"}
# send two variables to frontend



# FRONTEND

# 2) get the two variables from the backend
# get user to type in their guess
# check guess
# if incorrect, reveal capital city
# request a new country/capital



