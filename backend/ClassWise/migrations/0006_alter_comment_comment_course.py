# Generated by Django 4.2.7 on 2023-12-13 16:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ClassWise', '0005_alter_course_course_corequisites_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='comment_course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='ClassWise.course'),
        ),
    ]
