import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { translate } from 'react-i18next';
import AddFacultyForm from './add-faculty-form.component';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import * as actionCreators from '../faculty-actions';
import facultyService from '../../../service/faculty-service';

class AddFaculty extends React.Component {
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

    onSubmit = (values) => {
        facultyService.addFaculty(values)
            .then(
                (data) => {
                    this.props.alert.success(data.toString());
                    this.setState({ submitted: true });
                },
            )
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
    }

    render() {
        if (this.state.submitted) return <Redirect to={'/'} />;

        if (!this.props.subjects) {
            return <SemanticLoader />;
        }

        return (
            <AddFacultyForm
                onSubmit={this.onSubmit}
                subjects={this.props.subjects}
            />
        );
    }
}


const mapStateToProps = state => ({
    subjects: state.faculty.subjects,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(AddFaculty)));
