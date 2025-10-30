from django.db import models
from django.core.exceptions import ValidationError
from datetime import time

# Validador de horário
def validate_horario(value):
    """Valida se o horário está entre 07:30 e 17:00"""
    inicio = time(7, 30)
    fim = time(17, 0)
    if not (inicio <= value <= fim):
        raise ValidationError("O horário deve estar entre 07:30 e 17:00")

class Agendamento(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    telefone = models.CharField(max_length=20)
    data = models.DateField()
    hora = models.TimeField(validators=[validate_horario])
    doador = models.BooleanField(default=False)
    cancelado = models.BooleanField(default=False)  
    token_cancelamento = models.CharField(max_length=64, blank=True, null=True)  # Token único

    def __str__(self):
        status = "Cancelado" if self.cancelado else "Ativo"
        return f"{self.nome} - {self.data} {self.hora} ({status})"
