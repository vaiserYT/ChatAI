# Generated by Django 5.1.1 on 2024-09-13 12:50

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default=datetime.datetime.now, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_message', models.TextField()),
                ('ai_message', models.TextField(blank=True, null=True)),
                ('chat_history', models.JSONField(blank=True, default=list)),
                ('chat_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.chat')),
            ],
        ),
    ]
