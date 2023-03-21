# Generated by Django 3.0.7 on 2020-06-27 12:17

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0003_remove_ingredient_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='TestRecipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('rate', models.IntegerField(default=3)),
                ('ingredients', django.contrib.postgres.fields.jsonb.JSONField()),
            ],
        ),
    ]