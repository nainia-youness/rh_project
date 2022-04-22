from django.db import models

from ..users.models import User
from ..fonctions.models import Fonction
from ..centres_cout.models import CentreCout
from ..affectations.models import Affectation
from ..contrats.models import Contrat
from ..rubriques.models import Rubrique
from ..directions.models import Direction
from ..villes.models import Ville
from ..entites.models import Entite

class Employe(models.Model):

    MARIE='Marié(e)'
    CELIBATAIRE='Célibataire'
    MALE='M'
    FEMELLE='F'
    situation_familiale_choices= (
        (MARIE, MARIE),
        (CELIBATAIRE, CELIBATAIRE)
    )
    sexe_choices= (
        (MALE, MALE),
        (FEMELLE, FEMELLE)
    )

    matricule = models.IntegerField()
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    date_naissance = models.DateField()
    sexe = models.CharField(max_length=1,choices=sexe_choices)
    cin = models.CharField(max_length=255)
    date_entree = models.DateField()
    situation_familiale = models.CharField(max_length=11,choices=situation_familiale_choices)
    nombre_enfant = models.IntegerField()
    charge_familiale = models.IntegerField()
    adresse = models.CharField(max_length=255)
    nationalite = models.TextField()
    cnss = models.CharField(max_length=255)
    salaire = models.FloatField()
    numero_compte = models.IntegerField()
    participation = models.FloatField()
    date_sortie = models.DateField(blank=True, null=True)
    derniere_operation = models.CharField(max_length=255,default="Aucune Operation")
    date_derniere_operation = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,blank=True, null=True)
    fonction = models.ForeignKey(Fonction,on_delete=models.CASCADE)
    centre_cout = models.ForeignKey(CentreCout,on_delete=models.CASCADE,)
    direction = models.ForeignKey(Direction,on_delete=models.CASCADE,)
    ville = models.ForeignKey(Ville,on_delete=models.CASCADE,)
    contrat = models.ForeignKey(Contrat,on_delete=models.CASCADE,)
    affectation = models.ForeignKey(Affectation,on_delete=models.CASCADE,)
    entite = models.ForeignKey(Entite,on_delete=models.CASCADE,)
    delegue = models.ForeignKey('self',on_delete=models.SET_NULL,blank=True, null=True)
    rubriques = models.ManyToManyField(Rubrique, through='EmployesRubriques')

    class Meta:
        managed = True
        db_table = 'employe'
        unique_together = (('matricule', 'entite'),)


class EmployesRubriques(models.Model):
    rubrique = models.ForeignKey(Rubrique, on_delete=models.CASCADE)
    employe = models.ForeignKey(Employe, on_delete=models.CASCADE)
    montant = models.FloatField()
    user = models.ForeignKey(User,on_delete=models.SET_NULL,blank=True, null=True)
    derniere_operation = models.CharField(max_length=255,default="Aucune Operation")
    date_derniere_operation = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'employes_rubriques'
        unique_together = (('rubrique', 'employe'),)