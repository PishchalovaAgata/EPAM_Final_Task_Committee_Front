import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';

import * as actionCreators from '../faculty-actions';

import FacultiesFilterForm from '../../../components/filter/filter-forms/faculties-filter-form';
import SemanticLoader from '../../../components/loaders/semantic-loader';
import './filter.css';
import { translate } from 'react-i18next';

class FilterComponent extends React.Component {
    componentDidMount() {
        this.props.getSubjectsList(this.props.alert.error, this.props.t);
    }

    onSubmitClicked = (filter) => {
        this.props.onFilter(filter);
    };

    static get propTypes() {
        return {
            t: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
            onSubmit: PropTypes.func,
            getSubjectsList: PropTypes.func,
            subjects: PropTypes.arrayOf(PropTypes.string),
            onFilter: PropTypes.func,
        };
    }

    render() {
        if (!this.props.subjects) {
            return <SemanticLoader />;
        }

        return (
            <div className="filter-container">
                <FacultiesFilterForm
                    onReportClicked={this.onReportClicked}
                    onSubmit={this.onSubmitClicked}
                    subjects={this.props.subjects}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    subjects: state.faculty.subjects,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(FilterComponent)));
