# Generated by Django 3.0.7 on 2022-04-05 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Affectation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designation', models.CharField(max_length=255)),
                ('description', models.CharField(blank=True, max_length=255, null=True)),
                ('derniere_operation', models.TextField()),
                ('date_derniere_operation', models.DateTimeField(auto_now=True)),
                ('user_id', models.IntegerField()),
            ],
            options={
                'db_table': 'affectation',
                'managed': False,
            },
        ),
    ]
