from django.shortcuts import render
from django.views import View
from django.contrib.auth.views import LoginView, resolve_url
from django.conf import settings

from .forms import LoginUserForm


class IndexPageView(View):
    def get(self, request):
        return render(request, 'frontend/index.html')


class LoginPageView(LoginView):
    form_class = LoginUserForm
    template_name = 'frontend/login.html'

    def get_success_url(self):
        return resolve_url(settings.LOGIN_REDIRECT_URL)


class CrudPageView(View):
    def get(self, request):
        return render(request, 'frontend/crud.html')
