const ACTION_CONSTS= {
    CONNECT: 'connect',
    // Отключение от сервера
    DISCONNECT: 'disconnect',
    // Команда на разлогирование
    LOGOUT: 'logout',
    // Список друзей (изначально все друззя офлайн)
    FRIEND_LIST: 'friend:list',
    // Изменение статуса 1-го конкретного друга
    FRIEND_STATUS: 'friend:status',
    // Сообщение от 1-го конкретного пользователя
    MESSAGE: 'friend:message'
}

export default ACTION_CONSTS;