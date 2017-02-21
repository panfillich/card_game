function startLoading(message) {
    $('#loader').modal('show');
    return {
        type: 'START_LOADING',
        message: message
    }
}

function finishLoading() {
    $('#loader').modal('hide');
    return {
        type: 'STOP_LOADING'
    }
}

export default {
    startLoading: startLoading,
    finishLoading: finishLoading
}