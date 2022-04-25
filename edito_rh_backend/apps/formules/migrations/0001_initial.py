# Generated by Django 3.0.7 on 2022-04-25 09:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('variables', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Formule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designation', models.CharField(max_length=255)),
                ('formule', models.TextField()),
                ('derniere_operation', models.CharField(default='Aucune Operation', max_length=255)),
                ('date_derniere_operation', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'formule',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='FormulesVariables',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('derniere_operation', models.CharField(default='Aucune Operation', max_length=255)),
                ('date_derniere_operation', models.DateTimeField(auto_now=True)),
                ('formule', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='formules.Formule')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('variable', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='variables.Variable')),
            ],
            options={
                'db_table': 'formules_variables',
                'managed': True,
                'unique_together': {('formule', 'variable')},
            },
        ),
        migrations.AddField(
            model_name='formule',
            name='variables',
            field=models.ManyToManyField(through='formules.FormulesVariables', to='variables.Variable'),
        ),
    ]
