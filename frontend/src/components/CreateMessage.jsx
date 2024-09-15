import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import "../styles/CreateMessage.css";

function CreateMessage() {
    const { id } = useParams();
    const [user_message, set_user_message] = useState('');
    const [chat_history, set_chat_history] = useState([]);

    // Загружаем историю чата при загрузке компонента или изменении id
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/Message/?chat_id=${id}&format=json`);
                if (response.data.length > 0) {
                    const newChatHistory = response.data.map((item) => ({
                        user: item.user_message,
                        assistant: item.ai_message? item.ai_message: "" 
                    }));
                    set_chat_history(newChatHistory);
                }
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };

        fetchChatHistory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('chat_id', id);
        formData.append('user_message', user_message);
        formData.append('chat_history', JSON.stringify(chat_history));

        try {
            // Отправляем сообщение на сервер
            await axios.post(`http://127.0.0.1:8000/api/Message/?chat_id=${id}&format=json`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Добавляем сообщение пользователя в локальное состояние chat_history
            const newMessage = { user: user_message, assistant: '' };
            set_chat_history((prevChatHistory) => [...prevChatHistory, newMessage]);

            // Очищаем поле ввода
            set_user_message('');

        } catch (error) {
            console.error('Error uploading message:', error);
        }
    };

    

    return (
        
        <form onSubmit={(e) => {
            e.preventDefault();
            if(user_message !== '') {
                handleSubmit(e);
            }
        }} className="add-video-form" id="add-video-form">
        
            <Form.Control 
                type="text"
                className="create-text" 
                placeholder="write a message"
                value={user_message}
                onChange={(e) => set_user_message(e.target.value)} 
            />
            <FontAwesomeIcon 
                icon={faCircleUp} 
                onClick={(e) => {
                    if (user_message !== '') {
                        handleSubmit(e);
                    }
                }} 
                className="submit-button"
            />
        </form>

    );
}

export default CreateMessage;