from backend.celery import app
from .models import Message
from .api.chatGPT_reqest import chatgpt_request
import asyncio

@app.task
def process_chatgpt_request(message_id, user_message, chat_history):
    # Выполняем запрос к ChatGPT
    ai_message = asyncio.run(chatgpt_request(prompt=user_message, history=chat_history))

    # Обновляем объект Message
    message = Message.objects.get(id=message_id)
    message.ai_message = ai_message
    message.save()
