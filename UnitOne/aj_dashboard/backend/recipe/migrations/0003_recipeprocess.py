# Generated by Django 4.2.1 on 2023-06-21 14:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('equipments', '0004_alter_equipment_name_alter_equipment_unique_together'),
        ('process', '0018_alter_process_type'),
        ('recipe', '0002_rename_amount_recipeingredients_quantity'),
    ]

    operations = [
        migrations.CreateModel(
            name='RecipeProcess',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField(null=True)),
                ('duration', models.IntegerField(null=True)),
                ('duration_type', models.CharField(max_length=225, null=True)),
                ('input_ingredients', models.JSONField(null=True)),
                ('output_ingredients', models.JSONField(null=True)),
                ('time_step', models.CharField(choices=[('sequential', 'sequential'), ('parallel', 'parallel'), ('discretized ', 'discretized')], default='sequential', max_length=12)),
                ('arguments', models.JSONField(null=True)),
                ('equipment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='equipment_processes', to='equipments.equipment')),
                ('next_process_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='next_process', to='recipe.recipeprocess')),
                ('process', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipe_concrete_processes', to='process.process')),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipe_processes', to='recipe.recipe')),
            ],
            options={
                'verbose_name': 'RecipeProcess',
                'db_table': 'recipe_processes',
            },
        ),
    ]
