# Generated by Django 4.2.1 on 2023-06-21 23:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0004_recipenode_recipeedge'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipeprocess',
            name='value',
            field=models.CharField(max_length=225, null=True),
        ),
    ]
