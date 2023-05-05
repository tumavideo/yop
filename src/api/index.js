// const API_URL = 'http://127.0.0.1:8089';
const API_URL = 'https://server.zambiarise.com';

exports.POST_URL = (page_size) => `${API_URL}/post/${page_size}`;
exports.TESTIMONY_URL = (page_size) => `${API_URL}/testimony/${page_size}`;
exports.SUBSCRIBE_URL = `${API_URL}/subscribe`;
exports.BANNER_URL = `${API_URL}/banner`;
