import fetch from 'isomorphic-fetch';

export function get(year) {
    fetch('http://localhost:3000/pub-api/').then(req => {return req})
        .then(function (response) {
            console.log(response)
            return response.json()
        }).then(function (json) {
        console.log('parsed json', json)
    }).catch(function (ex) {
        console.log('parsing failed', ex)
    })
}


function fetchPosts(reddit) {
    return dispatch => {
        dispatch(requestPosts(reddit));
        return fetch(`http://www.reddit.com/`)
            .then(req => req.json())
            .then(json => dispatch(receivePosts(reddit, json)));
    };
}
