import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { translate } from 'react-i18next';
import EditFacultyForm from './edit-faculty-form.component';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import * as actionCreators from '../faculty-actions';
import facultyService from '../../../service/faculty-service';

class EditFaculty extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
        };
    }

    static get propTypes() {
        return {
            onSubmit: PropTypes.func,
            getSubjectsList: PropTypes.func,
            getEditFormValues: PropTypes.func,
            subjects: PropTypes.arrayOf(PropTypes.string),
            formValues: PropTypes.shape({
                name: PropTypes.string,
                subjects: PropTypes.arrayOf(PropTypes.string),
            }),
            match: PropTypes.shape({
                params: PropTypes.shape({
                    id: PropTypes.string,
                }),
            }),
            t: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
        };
    }

    onSubmit = (values, id) => {
        facultyService.editFaculty(values, id)
            .then((data) => {
                this.props.alert.success(data.toString());
                this.setState({ submitted: true });
            })
            .catch((error) => {
                if (error.response) {
                    this.props.alert.error(this.props.t(`error.${error.response.status}`));
                } else {
                    this.props.alert.error(error.message);
                }
            });
    };

    componentDidMount() {
        this.props.getSubjectsList(this.props.alert.error, this.props.t);
        this.props.getEditFormValues(this.props.match.params.id, this.props.alert.error, this.props.t);
    }

    render() {
        if (this.state.submitted) return <Redirect to={'/'} />;

        if (!this.props.formValues || !this.props.subjects) {
            return <SemanticLoader />;
        }

        return (
            <EditFacultyForm
                onSubmit={this.onSubmit}
                subjects={this.props.subjects}
                formValues={this.props.formValues}
            />
        );
    }
}


const mapStateToProps = state => ({
    formValues: state.faculty.formValues,
    subjects: state.faculty.subjects,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(EditFaculty)));
