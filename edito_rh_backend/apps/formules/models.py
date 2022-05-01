from django.db import models
from ..users.models import User
from ..variables.models import Variable
# Create your models here.


class Formule(models.Model):
    designation = models.CharField(max_length=255,unique=True)
    formule = models.TextField()
    derniere_operation = models.CharField(max_length=255,default="Aucune Operation")
    date_derniere_operation = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,blank=True, null=True)
    variables = models.ManyToManyField(Variable, through='FormulesVariables')

    class Meta:
        managed = True
        db_table = 'formule'


class FormulesVariables(models.Model):
    formule = models.ForeignKey(Formule, on_delete=models.CASCADE)
    variable = models.ForeignKey(Variable, on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,blank=True, null=True)
    derniere_operation = models.CharField(max_length=255,default="Aucune Operation")
    date_derniere_operation = models.DateTimeField(auto_now=True)
    
    class Meta:
        managed = True
        db_table = 'formules_variables'
        unique_together = (('formule', 'variable'),)