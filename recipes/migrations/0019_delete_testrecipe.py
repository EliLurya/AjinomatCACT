# Generated by Django 3.0.7 on 2020-08-24 09:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0018_ingredient_category'),
    ]

    operations = [
        migrations.DeleteModel(
            name='TestRecipe',
        ),
    ]