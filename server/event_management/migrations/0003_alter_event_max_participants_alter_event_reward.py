# Generated by Django 5.1.7 on 2025-04-04 09:26

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event_management', '0002_alter_event_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='max_participants',
            field=models.PositiveSmallIntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)]),
        ),
        migrations.AlterField(
            model_name='event',
            name='reward',
            field=models.PositiveSmallIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
