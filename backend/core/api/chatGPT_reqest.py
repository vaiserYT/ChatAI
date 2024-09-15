from openai import AsyncOpenAI
import os
import dotenv
from ..models import Message, Chat
dotenv.load_dotenv()
OPENAI_APIKEY = os.environ.get('OPENAI_APIKEY')
BASE_URL = os.environ.get('BASE_URL', 'https://api.openai.com/v1')
CLIENT = AsyncOpenAI(api_key=OPENAI_APIKEY, base_url=BASE_URL)
import json

import json

async def chatgpt_request(prompt, history=None):
    if history is None:
        history = []
    elif isinstance(history, str):
        # Десериализация JSON строки в Python объект
        try:
            history = json.loads(history)
        except json.JSONDecodeError as e:
            print("Ошибка при декодировании JSON:", e)
            history = []
    
    messages = [{"role": "system", "content": ""}]
    
    for h in history:
        # Проверка, чтобы убедиться, что h - это словарь
        if isinstance(h, dict):
            messages.append({"role": "user", "content": h.get("user", "")})
            messages.append({"role": "assistant", "content": h.get("assistant", "")})
    
    messages.append({"role": "user", "content": prompt})
    
    response = await CLIENT.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    
    return str(response.choices[0].message.content)
