from django.db import models

# Create your models here.


class Ville(models.Model):
    nom = models.CharField(max_length=255)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(auto_now=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ville'
