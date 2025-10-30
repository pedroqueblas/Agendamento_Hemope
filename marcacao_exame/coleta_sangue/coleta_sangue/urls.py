from django.urls import path
from agendamento import views

urlpatterns = [
    path('', views.home, name="home"),
    path('agendar/', views.agendar, name="agendar"),
    path('horarios/<str:data>/', views.horarios_disponiveis_ajax, name="horariosFixo"),
    path('login/', views.login_view, name="login"),
    path('logout/', views.logout_view, name="logout"),
    path('dashboard/', views.dashboard, name="dashboard"),
    path('cancelar/<str:token>/', views.cancelar_agendamento, name="cancelar_agendamento"),
    path('cancelar-dashboard/<int:agendamento_id>/', views.cancelar_dashboard, name="cancelar_dashboard"),
    path('cancelar/<int:agendamento_id>/', views.cancelar_agendamento, name="cancelar_agendamento"),
]
