import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Button, Header, Segment } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert';
import EditEntrant from '../entrant/edit/edit-entrant.component';
import AdminPanel from './admin-panel/admin-panel.component';
import Faculty from '../faculty/faculty.component';
import entrantService from '../../service/entrant-service';

import SemanticLoader from '../../components/loaders/semantic-loader';
import * as actionCreators from '../entrant/entrant-actions';

import roles from '../../configs/roles';
import './cabinet.css';

class CabinetPage extends Component {
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
            user: PropTypes.shape({
                login: PropTypes.string,
                role: PropTypes.string,
                id: PropTypes.number,
            }),
            t: PropTypes.func,
            subjects: PropTypes.arrayOf(PropTypes.string),
            formValues: PropTypes.shape({}),
            getEntrantFaculty: PropTypes.func,
            getEntrantStatus: PropTypes.func,
            entrantFaculty: PropTypes.shape({
                is_Unavailable: PropTypes.bool,
            }),
            entrantStatus: PropTypes.string,
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
        };
    }

    onSubmit = (values) => {
        entrantService.editEntrant(values)
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
        this.props.getEditFormValues(this.props.alert.error, this.props.t);
        if (this.props.user.role === roles.USER.ROLE) {
            this.props.getEntrantFaculty(this.props.alert.error, this.props.t);
            this.props.getEntrantStatus(this.props.alert.error, this.props.t);
        }
    }

    unsubscribe = () => {
        entrantService.unsubscribe()
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

    render() {
        const { t } = this.props;

        if (this.state.submitted) return <Redirect to={'/'} />;

        if (!this.props.formValues || !this.props.subjects) {
            return <SemanticLoader />;
        }

        let isFull = false;

        if (!this.props.entrantFaculty && this.props.user.role === roles.USER.ROLE) {
            isFull = true;
        }

        const statusesColors = {
            cancelled: 'red',
            submitted: 'green',
            enlisted: 'yellow',
        };

        return (
            <div>
                {
                    this.props.user.role === roles.ADMIN.ROLE
                        ? <AdminPanel/>
                        : this.props.entrantFaculty
                            ? <div className="entrant-faculty">
                                <Header size='huge' textAlign="center">{t('entrant-faculty.name')}:</Header>
                                <Segment>
                                    <Faculty faculty={this.props.entrantFaculty} role={this.props.user.role}/>
                                </Segment>

                                <Header size='medium' color={statusesColors[this.props.entrantStatus]} >
                                    {t('entrant-faculty.status')}: {this.props.entrantStatus}

                                    {
                                        this.props.entrantStatus === 'enlisted' ? (
                                            <Button color="google plus" onClick={this.unsubscribe} floated ="right">
                                                {t('entrant-faculty.unsubscribeButton')}
                                            </Button>
                                        ) : (
                                            <Button color="google plus" disabled floated ="right">
                                                {t('entrant-faculty.unsubscribeButton')}
                                            </Button>
                                        )
                                    }
                                </Header>
                            </div>
                            : null
                }
                <EditEntrant
                    onSubmit={this.onSubmit}
                    subjects={this.props.subjects}
                    formValues={this.props.formValues}
                    role={this.props.user.role}
                    isFull={isFull}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    formValues: state.entrant.formValues,
    subjects: state.entrant.subjects,
    user: state.auth,
    entrantFaculty: state.entrant.entrantFaculty,
    entrantStatus: state.entrant.entrantStatus,
});

export default withAlert(translate('common')(connect(mapStateToProps, actionCreators)(CabinetPage)));
