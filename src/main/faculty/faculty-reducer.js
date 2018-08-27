const facultyReducer = (state = {}, action) => {
    switch (action.type) {
    case 'ADD_SUBJECT_VALUES':
        return { ...state, subjects: action.subjects };

    case 'ADD_EDIT_FORM_VALUES_FACULTY':
        return { ...state, formValues: action.data };

    case 'ADD_ENTRANT_SHEET_VALUES':
        return { ...state, sheetEntrants: action.data.entrants, facultyName: action.data.facultyName };

    case 'GET_FACULTIES':
        return { ...state, faculties: action.data.faculties, totalPages: action.data.totalPages };

    default:
        return state;
    }
};

export default facultyReducer;
