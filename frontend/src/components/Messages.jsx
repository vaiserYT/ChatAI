import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Messages.css";
import LeftHeader from "./LeftHeader";
import axios from "axios";
import "../styles/messages.css";
import CreateMessage from "./CreateMessage";

const Messages = () => {
    const { id } = useParams();
    const [messages, setMessage] = useState([]);
    const messagesEndRef = useRef(null);
    const prevMessagesCount = useRef(0); // Ref для хранения предыдущего количества сообщений

    // Функция для прокрутки
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Прокручиваем только если количество сообщений увеличилось
        if (messages.length > prevMessagesCount.current) {
            scrollToBottom();
        }
        // Обновляем предыдущий счетчик сообщений
        prevMessagesCount.current = messages.length;
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/Message/?chat_id=${id}&format=json`);
                    setMessage(response.data);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
        };

        fetchMessages();

        // Устанавливаем интервал для опроса сообщений
        const interval = setInterval(fetchMessages, 1000);

        return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
    }, [id]);

    return (
        <>
            {id ? <LeftHeader /> : null}
            {id ? (
                <div className="messages">
                    {messages.map((message) => (
                        <div key={message.id} className="messages-inside">
                            <h3 className="message-text-user">{message.user_message}</h3>
                            <h3 className="message-text-ai">{message.ai_message}</h3>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            ) : null}
            {id ? <CreateMessage /> : null}
        </>
    );
};

export default Messages;
