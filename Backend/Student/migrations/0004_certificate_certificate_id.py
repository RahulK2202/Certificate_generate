# Generated by Django 4.2.6 on 2023-10-19 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Student', '0003_certificate'),
    ]

    operations = [
        migrations.AddField(
            model_name='certificate',
            name='certificate_id',
            field=models.CharField(blank=True, max_length=10, unique=True),
        ),
    ]
