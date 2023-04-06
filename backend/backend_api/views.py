from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import StaffSerializer, PositionsSerializer
from .models import Staff, Positions


class StaffViewSet(ModelViewSet):
    queryset = Staff.objects.all().select_related('position').select_related('manager')
    serializer_class = StaffSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['position', 'manager', 'email', 'fullname', 'date_admission']
    search_fields = ['email', 'fullname']
    ordering_fields = ['position', 'manager', 'email', 'fullname', 'date_admission']

class PositionsViewSet(ReadOnlyModelViewSet):
    queryset = Positions.objects.all()
    serializer_class = PositionsSerializer
