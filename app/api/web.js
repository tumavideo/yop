import axios from "axios";
import errorHandler from "../utils/errorHandler";
import {POST_URL, BANNER_URL, TESTIMONY_URL} from "./index";

export const getGlobal = (page_size) => {
    return axios.all([
        axios.get(POST_URL(page_size)),
        axios.get(TESTIMONY_URL(page_size)),
        axios.get(BANNER_URL)
    ]).then(axios.spread(async(response1, response2, response3) => {
        // Multiple requests are now complete
        return {
            payload: {
                post: response1.data.payload,
                testimony: response2.data.payload,
                banner: response3.data.payload
            },
            error: false
        }
    })).catch((error) => {
        return errorHandler(error);
    });
}

export const getPost = (page_size) => {
    return axios.get(POST_URL(page_size)).then((response) => {
        return {
            error: false,
            payload: response.data.payload
        }
    }).catch((error) => {
        return errorHandler(error);
    });
}

export const getTestimony = (page_size) => {
    return axios.get(TESTIMONY_URL(page_size)).then((response) => {
        return {
            error: false,
            payload: response.data.payload
        }
    }).catch((error) => {
        return errorHandler(error);
    });
}
