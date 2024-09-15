from django.db import models
from datetime import datetime
import json

class Chat(models.Model):
    title = models.CharField(max_length=100, default=datetime.now())

    def __str__(self) -> str:
        return self.title or f"Chat {self.id}"

class Message(models.Model):
    chat_id = models.ForeignKey(Chat, on_delete=models.CASCADE) or models.CharField() or models.IntegerField()
    user_message = models.TextField()
    ai_message = models.TextField(null=True, blank=True)    
    chat_history = models.JSONField(default=list, blank=True)

    def __str__(self) -> str:
        return self.user_message
