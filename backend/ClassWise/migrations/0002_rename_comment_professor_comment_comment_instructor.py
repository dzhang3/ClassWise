# Generated by Django 4.1 on 2023-12-11 10:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ClassWise', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='comment_professor',
            new_name='comment_instructor',
        ),
    ]