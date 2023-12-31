# Generated by Django 4.2.1 on 2023-06-26 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Setup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operation_level', models.CharField(max_length=225)),
                ('cuisine_requirement_profile', models.CharField(max_length=225, null=True)),
                ('culinary_cultural_profile', models.CharField(max_length=225, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
            ],
            options={
                'verbose_name': 'Setup',
                'db_table': 'setups',
            },
        ),
    ]
