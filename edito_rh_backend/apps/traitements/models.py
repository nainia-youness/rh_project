from django.db import models

# Create your models here.
from django.db import models
from ..users.models import User
from ..entites.models import Entite
# Create your models here.


class Traitement(models.Model):
    is_cloture = models.BooleanField(default=False)
    entite = models.ForeignKey(Entite,on_delete=models.CASCADE)
    derniere_operation = models.CharField(max_length=255,default="Aucune Operation")
    date_derniere_operation = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,blank=True, null=True)
    
    class Meta:
        managed = True
        db_table = 'traitement'
