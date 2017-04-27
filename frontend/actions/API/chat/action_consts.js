const ACTION_CONSTS= {
    CONNECT: 'connect',

    // Отключение от сервера
    DISCONNECT: 'disconnect',

    // Команда на разлогирование
    LOGOUT: 'logout',

    // Список друзей (изначально все друззя офлайн)
    FRIEND_LIST: 'friends',

    // Изменение статуса конкретного друга
    STATUS_FRIEND: 'status:friend',

    // Изменение статуса пользователя
    STATUS_USER: 'status:user',

    // Сообщение от конкретного пользователя
    MESSAGE_FRIEND: 'message:friend',

    // Сообщение от пользователя
    MESSAGE_USER: 'message:user'

}

export default ACTION_CONSTS;