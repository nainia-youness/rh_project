# Generated by Django 3.0.7 on 2022-04-20 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('directions', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='direction',
            name='derniere_operation',
            field=models.CharField(default='Aucune Operation', max_length=255),
        ),
    ]
