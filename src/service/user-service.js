import axios from 'axios';

function login(user) {
    return axios.post('http://localhost:8888/committee/login', user);
}

function register(user) {
    return axios.post('http://localhost:8888/committee/register', user);
}

function logout() {
    return axios.post('http://localhost:8888/committee/logout');
}

const userService = {
    login,
    logout,
    register,
};

export default userService;
