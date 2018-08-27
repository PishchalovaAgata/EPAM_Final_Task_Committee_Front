import subjectService from '../../service/subject-service';
import entrantService from '../../service/entrant-service';

const ADD_SUBJECT_VALUES = 'ADD_SUBJECT_VALUES';
const ADD_EDIT_FORM_VALUES = 'ADD_EDIT_FORM_VALUES';
const GET_ENTRANT_FACULTY = 'GET_ENTRANT_FACULTY';
const GET_ENTRANT_STATUS = 'GET_ENTRANT_STATUS';

function addSubjectsValues(data) {
    let { subjects } = data;
    subjects = subjects.map(subject => subject.name);

    return {
        type: ADD_SUBJECT_VALUES,
        subjects,
    };
}

function addEntrantFacultyValues(faculty) {
    return {
        type: GET_ENTRANT_FACULTY,
        faculty,
    };
}

function addEntrantStatusValues(status) {
    return {
        type: GET_ENTRANT_STATUS,
        status,
    };
}

function addEditFormValues(data) {
    return {
        type: ADD_EDIT_FORM_VALUES,
        data,
    };
}

export function getEntrantFaculty(handler, t) {
    return (dispatch) => {
        entrantService.getEntrantFaculty()
            .then(res => dispatch(addEntrantFacultyValues(res.data)))
            .catch((error) => {
                dispatch(addEntrantFacultyValues(null));
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function getEntrantStatus(handler, t) {
    return (dispatch) => {
        entrantService.getEntrantStatus()
            .then(res => dispatch(addEntrantStatusValues(res.data.status)))
            .catch((error) => {
                dispatch(addEntrantStatusValues(null));
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function getSubjectsList(handler, t) {
    return (dispatch) => {
        subjectService.getSubjectsList()
            .then((res) => { dispatch(addSubjectsValues(res.data)); })
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function getEditFormValues(handler, t) {
    return (dispatch) => {
        entrantService.getEditFormValues()
            .then((res) => { dispatch(addEditFormValues(res.data)); })
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}
