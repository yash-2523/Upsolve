import {config as cf} from '../constants';

let config = cf.url;

async function  AddFeedback(name,email,feedback) {
    
    return fetch(config+'/api/feedback/add',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            feedback: feedback
        })
    }).then(res => res.json())
    
}

export {AddFeedback}