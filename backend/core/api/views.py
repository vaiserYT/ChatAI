from rest_framework.viewsets import ModelViewSet
from ..models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .chatGPT_reqest import chatgpt_request
import asyncio
from core.tasks import process_chatgpt_request
from rest_framework.response import Response


class ChatViewSet(ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['chat_id']
    template_name = 'rest_framework/filters/django_filter.html'

    def get_queryset(self):
        return Message.objects.all()

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        user_message = request.data["user_message"]
        chat_id = request.data["chat_id"]
        print(request.data)
        chat_history = request.data["chat_history"]

        # Сначала создаем объект Message без ai_message
        message = Message.objects.create(
            chat_id=Chat.objects.get(id=chat_id),
            user_message=user_message,
            chat_history=chat_history,
        )

        # Запускаем задачу для выполнения запроса к ChatGPT
        process_chatgpt_request.delay(message.id, user_message, chat_history)

        # Возвращаем ответ сразу, без ожидания выполнения задачи
        return Response({"status": "added"}, status=202)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
