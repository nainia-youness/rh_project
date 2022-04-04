from django.db import models

# Create your models here.


class Ville(models.Model):
    nom = models.CharField(max_length=255)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateField()

    class Meta:
        managed = False
        db_table = 'ville'
