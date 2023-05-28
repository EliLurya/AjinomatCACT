# Generated by Django 4.2.1 on 2023-05-18 13:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('process', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Protocol',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True)),
                ('description', models.CharField(max_length=225, null=True)),
                ('reference_author', models.CharField(max_length=225, null=True)),
                ('aliquot_date', models.DateField(null=True)),
                ('reagent', models.CharField(max_length=225, null=True)),
                ('name', models.CharField(max_length=225, unique=True)),
                ('processes', models.JSONField(null=True)),
                ('ingredients', models.JSONField(null=True)),
            ],
            options={
                'verbose_name': 'Protocol',
                'db_table': 'protocols',
            },
        ),
        migrations.CreateModel(
            name='ProtocolProcess',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField(null=True)),
                ('duration', models.IntegerField()),
                ('duration_type', models.CharField(max_length=225)),
                ('input_ingredients', models.JSONField()),
                ('output_ingredients', models.JSONField()),
                ('time_step', models.CharField(choices=[('sequential', 'sequential'), ('parallel', 'parallel'), ('discretized ', 'discretized')], default='sequential', max_length=12)),
                ('arguments', models.JSONField()),
                ('next_process_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='next_process', to='protocols.protocolprocess')),
                ('process', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='protocol_concrete_processes', to='process.process')),
                ('protocol', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='protocol_processes', to='protocols.protocol')),
            ],
            options={
                'verbose_name': 'ProtocolProcess',
                'db_table': 'protocol_processes',
            },
        ),
    ]