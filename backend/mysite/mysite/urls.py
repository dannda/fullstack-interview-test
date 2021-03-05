from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.views.generic.base import TemplateView
from git_app.views import *

urlpatterns = [
    path('branches/', branches),
    path('branch/<str:branch_name>', branch),
    path('commit/<str:commit_hexsha>', commit),
    path('pr/', pr),
    url(r'^.*', TemplateView.as_view(template_name="home.html"), name="home")
]
