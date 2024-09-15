from rest_framework.serializers import ModelSerializer
from ..models import Chat, Message

class ChatSerializer(ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'title')

class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'chat_id', 'user_message', 'ai_message', "chat_history")

