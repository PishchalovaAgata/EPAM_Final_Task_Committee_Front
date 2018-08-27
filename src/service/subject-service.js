import axios from 'axios';

axios.defaults.withCredentials = true;

function getSubjectsList() {
    return axios.get('http://localhost:8888/committee/subjects');
}

function editSubjects(data) {
    return axios.post('http://localhost:8888/committee/subjects/edit', data);
}

const subjectService = {
    getSubjectsList,
    editSubjects,
};

export default subjectService;
