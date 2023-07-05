import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Chats = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const router = useRouter();
    useEffect(()=>{
        if (!selectedChat){
            return
        }
       const wsconnect = async ()=>{
            const user = await getUserInfo()
           const getToken = axios.post(`https://ya-praktikum.tech/api/v2/chats/token/${selectedChat}`,null,{withCredentials:true}
           )
           getToken.then(({data:{token}} )=>{
               const ws = new WebSocket(`wss:////ya-praktikum.tech/ws/chats/${user.id}/${selectedChat}/${token}`);
               ws.addEventListener('open',()=>console.log('connect') )
           })

       }

    },[selectedChat])

    useEffect(() => {
        fetchChats();
        setToken(getCookie('token'));
    }, []);

    const getCookie = (name) => {
        const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return cookie ? cookie[2] : null;
    }

    const fetchChats = async () => {
        try {
            const response = await axios.get("https://ya-praktikum.tech/api/v2/chats", { withCredentials: true });
            setChats(response.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch chats");
            setLoading(false);
        }
    };
    const getUserInfo = async ()=>{
        try{
            const {data: user} = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {withCredentials: true})
            return user
        }catch (error){
            setError("Failed to get user info")
        }

    }

    const createChat = async (chatData) => {
        try {
            const response = await axios.post("https://ya-praktikum.tech/api/v2/chats", chatData, { withCredentials: true });
            const createdChat = response.data;
            setChats([...chats, createdChat]);
        } catch (error) {
            setError("Failed to create chat");
        }
    };
    const addUserToChat = async (chatId, userId) => {
        try {
            const usersRequest = {
                users: [userId],
                chatId: chatId,
            };
            await axios.put("https://ya-praktikum.tech/api/v2/chats/users", usersRequest, { withCredentials: true });
        } catch (error) {
            setError("Failed to add user to chat");
        }
    };

    const handleAddUserToChat = async (e, chatId) => {
        e.preventDefault();
        const login = e.target.login.value;
        const {data:user} = await axios.post('https://ya-praktikum.tech/api/v2/user/search', {login} , {withCredentials: true});
        addUserToChat(chatId, user[0].id);
        e.target.reset();
    };



    const updateChat = async (chatId, chatData) => {
        try {
            const response = await axios.put(`https://ya-praktikum.tech/api/v2/chats/${chatId}`, chatData, { withCredentials: true });
            const updatedChats = chats.map((chat) =>
                chat.id === chatId ? response.data : chat
            );
            setChats(updatedChats);
        } catch (error) {
            setError("Failed to update chat");
        }
    };

    const deleteChat = async (chatId) => {
        try {
            await axios.delete("https://ya-praktikum.tech/api/v2/chats", {
                data: {
                    chatId: chatId
                },
                withCredentials: true
            });
            const updatedChats = chats.filter((chat) => chat.id !== chatId);
            setChats(updatedChats);
        } catch (error) {
            setError("Failed to delete chat");
        }
    };

    const sendMessage = async (chatId, messageData) => {
        try {
            await axios.post(`https://ya-praktikum.tech/api/v2/chats/${chatId}`, messageData, { withCredentials: true });
        } catch (error) {
            setError("Failed to send message");
        }
    };

    const handleOpenChat = (chatId) => {
        setSelectedChat(chatId);
        setIsChatOpen(true);
    };

    const handleCreateChat = (e) => {
        e.preventDefault();
        const chatData = {
            title: e.target.name.value,
        };
        createChat(chatData);
        e.target.reset();
    };

    const handleUpdateChat = (e, chatId) => {
        e.preventDefault();
        const chatData = {
            title: e.target.name.value,
        };
        updateChat(chatId, chatData);
    };

    const handleDeleteChat = (chatId) => {
        deleteChat(chatId);
    };

    const handleMessageSubmit = (e, chatId) => {
        e.preventDefault();
        const messageData = {
            content: message,
        };
        sendMessage(chatId, messageData);
        setMessage("");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="chatbox-container">
            <div className="sidebar">
                <ul className="chat-list">
                    {chats.map((chat) => (
                        <li
                            key={chat.id}
                            className={`chat-item ${selectedChat === chat.id ? 'active' : ''}`}
                            onClick={() => handleOpenChat(chat.id)}
                        >
                            {chat.title}
                            <button
                                onClick={() => handleDeleteChat(chat.id)}
                                className="delete-chat-button"
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleCreateChat} className="create-chat-form">
                    <input
                        type="text"
                        name="name"
                        className="input"
                        placeholder="Enter chat name"
                    />
                    <button type="submit" className="button">
                        Create Chat
                    </button>
                </form>
            </div>

            <div className="chat-window">
                {isChatOpen ? (
                    <div>
                        <div className="messages-container">
                            {/* Отображение сообщений */}
                        </div>
                        <form onSubmit={(e) => handleMessageSubmit(e, selectedChat)} className="message-form">
                            <input
                                type="text"
                                name="message"
                                className="input"
                                placeholder="Enter message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="submit" className="button">
                                Send 📨
                            </button>
                        </form>
                        <form onSubmit={(e) => handleAddUserToChat(e, selectedChat)} className="add-user-form">
                            <input
                                type="text"
                                name="login"
                                className="input"
                                placeholder="Enter user login"
                            />
                            <button type="submit" className="button">
                                Add User to Chat 🕵
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="no-chat-selected">No chat selected</div>
                )}
            </div>
        </div>
    );
};

export default Chats;


