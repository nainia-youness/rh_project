from django.db import models


class CentreCout(models.Model):
    designation = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateField()

    class Meta:
        managed = False
        db_table = 'centre_cout'
