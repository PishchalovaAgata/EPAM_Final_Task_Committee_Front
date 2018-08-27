import axios from 'axios';

axios.defaults.withCredentials = true;

function getEditFormValues() {
    return axios.get('http://localhost:8888/committee/entrant');
}

function getEntrantFaculty() {
    return axios.get('http://localhost:8888/committee/entrant/faculty');
}

function getEntrantStatus() {
    return axios.get('http://localhost:8888/committee/entrant/status');
}

function unsubscribe() {
    return axios.post('http://localhost:8888/committee/entrant/unsubscribe');
}

function editEntrant(data) {
    return axios.post('http://localhost:8888/committee/committee/entrant/edit', data);
}

const entrantService = {
    getEditFormValues,
    editEntrant,
    getEntrantFaculty,
    unsubscribe,
    getEntrantStatus,
};

export default entrantService;
