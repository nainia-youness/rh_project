# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Affectation(models.Model):
    designation = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'affectation'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group_id = models.IntegerField()
    permission_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group_id', 'permission_id'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type_id = models.IntegerField()
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type_id', 'codename'),)


class CentreCout(models.Model):
    designation = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'centre_cout'


class Contrat(models.Model):
    designation = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'contrat'


class Direction(models.Model):
    designation = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'direction'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class Employe(models.Model):
    matricule = models.IntegerField()
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    date_naissance = models.DateField()
    sexe = models.CharField(max_length=1, blank=True, null=True)
    cin = models.CharField(max_length=255)
    date_entree = models.DateField()
    situation_familiale = models.CharField(max_length=11, blank=True, null=True)
    nombre_enfant = models.IntegerField()
    charge_familiale = models.IntegerField()
    adresse = models.CharField(max_length=255)
    nationalite = models.TextField()
    cnss = models.CharField(max_length=255)
    salaire = models.FloatField()
    numero_compte = models.IntegerField()
    participation = models.CharField(max_length=255)
    date_sortie = models.DateField()
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()
    fonction = models.ForeignKey('Fonction', models.DO_NOTHING)
    centre_cout = models.ForeignKey(CentreCout, models.DO_NOTHING)
    direction = models.ForeignKey(Direction, models.DO_NOTHING)
    ville = models.ForeignKey('Ville', models.DO_NOTHING)
    contrat = models.ForeignKey(Contrat, models.DO_NOTHING)
    affectation = models.ForeignKey(Affectation, models.DO_NOTHING)
    entite = models.ForeignKey('Entite', models.DO_NOTHING)
    delegue_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'employe'
        unique_together = (('matricule', 'entite'),)


class EmployeRubrique(models.Model):
    id = models.IntegerField(primary_key=True)
    employe = models.ForeignKey(Employe, models.DO_NOTHING)
    rubrique = models.ForeignKey('Rubrique', models.DO_NOTHING)
    montant = models.FloatField()
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'employe_rubrique'
        unique_together = (('employe', 'rubrique'),)


class Entite(models.Model):
    designation = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'entite'


class Fonction(models.Model):
    designation = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'fonction'


class Parametre(models.Model):
    designation = models.CharField(max_length=255)
    valeur = models.FloatField()
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'parametre'


class Rubrique(models.Model):
    designation = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'rubrique'


class Ville(models.Model):
    nom = models.CharField(max_length=255)
    derniere_operation = models.TextField()
    date_derniere_operation = models.DateTimeField(blank=True, null=True)
    user_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ville'
