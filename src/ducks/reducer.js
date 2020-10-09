const initialState = {
    username: '',
    id: '',
    profile_pic: ''
}

const GET_USER = 'GET_USER';

export function getUser(id,username,profile_pic){
    return {
        type: GET_USER,
        payload: {
            username,
            id,
            profile_pic
        }
    }
}

export default function reducer(state=initialState,action){
    const {type,payload} = action;
    console.log(action);
    switch(type){
        case GET_USER:
            console.log(payload);
            return {...state, username: payload.username, id: payload.id, profile_pic: payload.profile_pic}
        default: return state;
    }
};