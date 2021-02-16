import axios from 'axios';
import { USER_SERVER } from '../components/ultils/mise';
import {
    SEARCH_RESULT,
    LOAD_MORE_TAG,
    LOAD_MORE_USER
} from './types';


export function search(keyword, skip, limit, prevState = []) {
    console.log(keyword, skip, limit, prevState);
    if (keyword == "") {
        return {
            type: SEARCH_RESULT,
            payload: {
                users: [],
                tags: [],
            }
        }
    }
    else {
        console.log(prevState);
        let data = { keyword, skip, limit }
        const request = axios.post(`${USER_SERVER}/search`, data)
            .then(response => {
                let newUsers = [
                    ...prevState.users,
                    ...response.data.users
                ]
                let newTags = [
                    ...prevState.tags,
                    ...response.data.tags
                ]
                return {
                    users: newUsers,
                    tags: newTags,
                    userSize: response.data.users.length,
                    tagSize: response.data.tags.length,
                }
            });

        return {
            type: SEARCH_RESULT,
            payload: request
        }
    }
}


export function searchUser(keyword) {
    let data = { keyword }
    const request = axios.post(`${USER_SERVER}/search`, data)
        .then((response) => {
            console.log(response)
            return response.data
        });
    return request
}
