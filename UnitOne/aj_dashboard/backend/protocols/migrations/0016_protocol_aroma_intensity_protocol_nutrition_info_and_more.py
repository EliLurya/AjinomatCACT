# Generated by Django 4.2.1 on 2023-07-05 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('protocols', '0015_alter_protocolsensorypanel_protocol_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='protocol',
            name='aroma_intensity',
            field=models.JSONField(default={'Citrus': 0, 'Decayed': 0, 'Floral': 0, 'Fruity': 0, 'Medicinal': 0, 'Mint': 0, 'Smokey': 0, 'Sulfidic': 0, 'Sweet': 0, 'Uncategorized': 0, 'Woody': 0}, null=True),
        ),
        migrations.AddField(
            model_name='protocol',
            name='nutrition_info',
            field=models.JSONField(default=dict, null=True),
        ),
        migrations.AddField(
            model_name='protocol',
            name='taste_intensity',
            field=models.JSONField(default={'Bitter': 0, 'Fat': 0, 'Salty': 0, 'Sour': 0, 'Sweet': 0, 'Umami': 0}, null=True),
        ),
        migrations.AddField(
            model_name='protocol',
            name='texture_metrics',
            field=models.JSONField(default=dict, null=True),
        ),
    ]
