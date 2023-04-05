from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import StaffViewSet, PositionsViewSet

router = DefaultRouter()
router.register(r'staff', StaffViewSet, basename='staff')
router.register(r'positions', PositionsViewSet, basename='positions')


urlpatterns = [
    path('', include(router.urls))
]
