# Generated by Django 4.1.7 on 2023-04-05 20:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fishing_holes', '0002_alter_fishinghole_record_fish'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fishinghole',
            name='restroom',
        ),
    ]
