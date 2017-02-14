export function changeLanguage(lang) {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: lang
            })
        }, 1000)
    }
}
