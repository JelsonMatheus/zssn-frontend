from django.shortcuts import render
from django.views import generic

# Create your views here.

class IndexView(generic.TemplateView):
    template_name = "core/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['modulo'] = "LISTAR SOBREVIVENTES"
        return context


class CreateSurvivorView(generic.TemplateView):
    template_name = "core/create-survivor.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['modulo'] = "ADICIONAR SOBREVIVENTES"
        return context


class EditSurvivorView(generic.TemplateView):
    template_name = "core/edit-survivor.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['modulo'] = "EDITAR SOBREVIVENTES"
        return context

class InfectedSurvivorView(generic.TemplateView):
    template_name = "core/infected.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['modulo'] = "RELATAR INFECÇÃO"
        return context