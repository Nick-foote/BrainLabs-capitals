from django.conf.urls import include
from django.urls import path

from capitals.views import HomeView

urlpatterns = [
    path('capitals', HomeView.as_view(), name='home'),
]