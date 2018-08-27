import facultyService from '../../service/faculty-service';
import subjectService from '../../service/subject-service';

const ADD_SUBJECT_VALUES = 'ADD_SUBJECT_VALUES';
const ADD_EDIT_FORM_VALUES_FACULTY = 'ADD_EDIT_FORM_VALUES_FACULTY';
const ADD_ENTRANT_SHEET_VALUES = 'ADD_ENTRANT_SHEET_VALUES';
const GET_FACULTIES = 'GET_FACULTIES';

function addSubjectsValues(data) {
    let { subjects } = data;
    subjects = subjects.map(subject => subject.name);

    return {
        type: ADD_SUBJECT_VALUES,
        subjects,
    };
}

function addEntrantSheetValues(data) {
    return {
        type: ADD_ENTRANT_SHEET_VALUES,
        data,
    };
}

function addEditFormValues(data) {
    return {
        type: ADD_EDIT_FORM_VALUES_FACULTY,
        data,
    };
}

function addFacultyValues(data) {
    return {
        type: GET_FACULTIES,
        data,
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

export function sheetGetEntrants(id, handler, t) {
    return (dispatch) => {
        facultyService.getSheet(id)
            .then((res) => { dispatch(addEntrantSheetValues(res.data)); })
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}

export function getEditFormValues(id, handler, t) {
    return (dispatch) => {
        facultyService.getEditFormValues(id)
            .then(res => dispatch(addEditFormValues(res.data)))
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}


export function getFaculties(page = 1, filter, handler, t) {
    return (dispatch) => {
        facultyService.getFaculty(page, filter)
            .then(res => dispatch(addFacultyValues(res.data)))
            .catch((error) => {
                if (error.response) {
                    handler(t(`error.${error.response.status}`));
                } else {
                    handler(error.message);
                }
            });
    };
}
