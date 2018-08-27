import axios from 'axios';

axios.defaults.withCredentials = true;

function getSubjectsList() {
    return axios.get('http://localhost:8888/committee/subjects');
}

function getEditFormValues(id) {
    return axios.get(`http://localhost:8888/committee/faculty/${id}`);
}

function getSheet(id) {
    return axios.get(`http://localhost:8888/committee/faculty/${id}/sheet`);
}

function editFaculty(data, id) {
    return axios.post(`http://localhost:8888/committee/faculty/edit/${id}`, data);
}

function deleteFaculty(id) {
    return axios.post(`http://localhost:8888/committee/faculty/delete/${id}`);
}

function registerToFaculty(data) {
    return axios.post('http://localhost:8888/committee/faculty/register', data);
}

function addFaculty(data) {
    return axios.post('http://localhost:8888/committee/faculty/add', data);
}

function getFaculty(page = 1, filter = {}) {
    return axios.post('http://localhost:8888/committee/faculties', {
        page,
        filter,
    });
}

const facultyService = {
    getSubjectsList,
    getEditFormValues,
    editFaculty,
    addFaculty,
    deleteFaculty,
    registerToFaculty,
    getSheet,
    getFaculty,
};

export default facultyService;
