function closeChat() {
    return {
        type  :'CLOSE_CHAT'
    }
}

function showChat() {
    return {
        type : 'SHOW_CHAT'
    }
}

export default {
    showChat   : showChat,
    closeChat  : closeChat
}

