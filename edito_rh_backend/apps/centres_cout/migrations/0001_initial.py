# Generated by Django 3.0.7 on 2022-05-27 09:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CentreCout',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designation', models.CharField(max_length=255, unique=True)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('derniere_operation', models.CharField(default='Aucune Operation', max_length=255)),
                ('date_derniere_operation', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'centre_cout',
                'managed': True,
            },
        ),
    ]
