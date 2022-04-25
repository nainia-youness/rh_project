# Generated by Django 3.0.7 on 2022-04-25 09:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('rubriques', '0001_initial'),
        ('villes', '0001_initial'),
        ('contrats', '0001_initial'),
        ('fonctions', '0001_initial'),
        ('affectations', '0001_initial'),
        ('centres_cout', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('entites', '0001_initial'),
        ('directions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matricule', models.IntegerField()),
                ('nom', models.CharField(max_length=255)),
                ('prenom', models.CharField(max_length=255)),
                ('date_naissance', models.DateField()),
                ('sexe', models.CharField(choices=[('M', 'M'), ('F', 'F')], max_length=1)),
                ('cin', models.CharField(max_length=255)),
                ('date_entree', models.DateField()),
                ('situation_familiale', models.CharField(choices=[('Marié(e)', 'Marié(e)'), ('Célibataire', 'Célibataire')], max_length=11)),
                ('nombre_enfant', models.IntegerField()),
                ('charge_familiale', models.IntegerField()),
                ('adresse', models.CharField(max_length=255)),
                ('nationalite', models.TextField()),
                ('cnss', models.CharField(max_length=255)),
                ('salaire', models.FloatField()),
                ('numero_compte', models.IntegerField()),
                ('participation', models.FloatField()),
                ('date_sortie', models.DateField(blank=True, null=True)),
                ('derniere_operation', models.CharField(default='Aucune Operation', max_length=255)),
                ('date_derniere_operation', models.DateTimeField(auto_now=True)),
                ('affectation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='affectations.Affectation')),
                ('centre_cout', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='centres_cout.CentreCout')),
                ('contrat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contrats.Contrat')),
                ('delegue', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='employes.Employe')),
                ('direction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='directions.Direction')),
                ('entite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entites.Entite')),
                ('fonction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fonctions.Fonction')),
            ],
            options={
                'db_table': 'employe',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='EmployesRubriques',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('montant', models.FloatField()),
                ('derniere_operation', models.CharField(default='Aucune Operation', max_length=255)),
                ('date_derniere_operation', models.DateTimeField(auto_now=True)),
                ('employe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employes.Employe')),
                ('rubrique', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rubriques.Rubrique')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'employes_rubriques',
                'managed': True,
                'unique_together': {('rubrique', 'employe')},
            },
        ),
        migrations.AddField(
            model_name='employe',
            name='rubriques',
            field=models.ManyToManyField(through='employes.EmployesRubriques', to='rubriques.Rubrique'),
        ),
        migrations.AddField(
            model_name='employe',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='employe',
            name='ville',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='villes.Ville'),
        ),
        migrations.AlterUniqueTogether(
            name='employe',
            unique_together={('matricule', 'entite')},
        ),
    ]
