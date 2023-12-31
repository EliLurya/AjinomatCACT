# Generated by Django 4.2.1 on 2023-06-22 15:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ingredients', '0005_remove_ingredients_unit'),
        ('protocols', '0013_alter_protocol_extra'),
    ]

    operations = [
        migrations.AddField(
            model_name='protocol',
            name='ingredients_list',
            field=models.ManyToManyField(blank=True, related_name='ingredients_list', through='protocols.ProtocolIngredient', to='ingredients.ingredients'),
        ),
        migrations.CreateModel(
            name='ProtocolSensoryPanel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('variable', models.CharField(max_length=225)),
                ('value', models.FloatField(default=0)),
                ('protocol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='protocol_sensory_panels', to='protocols.protocol')),
            ],
            options={
                'verbose_name': 'ProtocolSensoryPanel',
                'db_table': 'protocol_sensory_panels',
            },
        ),
    ]
