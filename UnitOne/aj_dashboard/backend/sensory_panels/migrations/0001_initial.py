# Generated by Django 4.2.1 on 2023-05-22 12:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sample_descriptions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SensoryPanel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateField(blank=True, null=True)),
                ('judge', models.UUIDField(blank=True, null=True)),
                ('panel_type', models.CharField(blank=True, max_length=255, null=True)),
                ('panel_variable', models.CharField(blank=True, max_length=255, null=True)),
                ('panel_value', models.CharField(blank=True, max_length=255, null=True)),
                ('sample_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sensory_panel_sample', to='sample_descriptions.sampledescriptions')),
            ],
        ),
    ]
