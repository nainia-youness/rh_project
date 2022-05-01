from django.db import models
from ..users.models import User
# Create your models here.


class Fonction(models.Model):
    designation = models.CharField(max_length=255,unique=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    derniere_operation = models.CharField(max_length=255,default="Aucune Operation")
    date_derniere_operation = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'fonction'
