import React from 'react';
import {
    Form,
    Button,
    Header,
    Icon,
    Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import './edit-faculty.css';

import DropdownComponent from '../../../components/filter/components/dropdown.component';

class EditFacultyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitting: true,
            subjects: this.prepareDataForDropDown(this.props.subjects),
            id: this.props.formValues.id,
            name: this.props.formValues.name,
            newSubjects: this.props.formValues.subjects,
            recruitmentPlan: this.props.formValues.entry_plan,
            requestsSubmitted: this.props.formValues.amount_entrant,
            date: this.props.formValues.time,
            errorSubmittingMessageSubjects: this.props.t('faculty.edit.errorSubmittingMessageSubjects'),
            currentLanguage: this.props.i18n.language,
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            submitting: true,
            subjects: this.prepareDataForDropDown(newProps.subjects),
            id: newProps.formValues.id,
            name: newProps.formValues.name,
            newSubjects: newProps.formValues.subjects,
            recruitmentPlan: newProps.formValues.entry_plan,
            requestsSubmitted: newProps.formValues.amount_entrant,
            date: newProps.formValues.time,
        });
    }

    static get propTypes() {
        return {
            onSubmit: PropTypes.func,
            t: PropTypes.func,
            subjects: PropTypes.arrayOf(PropTypes.string),
            i18n: PropTypes.shape({
                language: PropTypes.string,
            }),
            formValues: PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                subjects: PropTypes.arrayOf(PropTypes.string),
                entry_plan: PropTypes.number,
                amount_entrant: PropTypes.number,
                time: PropTypes.number,
            }),
        };
    }

    prepareDataForDropDown = (data) => {
        if (!data) {
            return [];
        }

        return data.map((item, index) => ({ key: index, value: index, text: item }));
    };

    getKeysByNames(names) {
        return names.map(name => this.state.subjects.find(subject => subject.text === name).key);
    }

    componentDidUpdate(prevProps) {
        if (this.state.currentLanguage !== prevProps.i18n.language) {
            this.setState({
                errorSubmittingMessageSubjects: this.props.t('faculty.edit.errorSubmittingMessageSubjects'),
                errorSubmittingMessage: this.props.t('faculty.edit.errorSubmittingMessageSubjects'),
                currentLanguage: prevProps.i18n.language,
            });
        }
    }

    prepareData = () => {
        if (this.state.newSubjects.length !== 3) {
            this.setState({ submitting: false, errorSubmittingMessage: this.state.errorSubmittingMessageSubjects });
            return;
        }

        this.setState({ submitting: true });

        const data = {
            name: this.state.name,
            subjects: this.state.newSubjects,
            entry_plan: this.state.recruitmentPlan,
            time: (new Date(this.state.date)).getTime(),
        };

        this.props.onSubmit(data, this.state.id);
    };

    getSubjectsByKeys(keys) {
        return keys.map(key => this.state.subjects.find(subject => subject.key === key).text);
    }

    render() {
        const { t } = this.props;

        return (
            <div className="pattern-container parent-size">
                <div className="registration-form">
                    <Form size="large" onSubmit={this.prepareData}>
                        <Header size='huge' textAlign="center">{t('faculty.edit.name')}</Header>

                        <Form.Input
                            label={t('faculty.edit.labels.name')}
                            placeholder={t('faculty.edit.placeholders.name')}
                            width={16}
                            value={this.state.name}
                            onChange={(event, obj) => this.setState({ name: obj.value })}
                        />

                        <Field
                            name="subjects"
                            label={t('faculty.edit.labels.subjects')}
                            items={this.state.subjects}
                            defaultItems={this.getKeysByNames(this.state.newSubjects)}
                            onChange={(event, obj) => this.setState({ newSubjects: this.getSubjectsByKeys(obj) })}
                            component={DropdownComponent}
                        />

                        <Form.Input
                            type="number"
                            className="recruitmentPlan"
                            label={t('faculty.edit.labels.recruitmentPlan')}
                            placeholder={t('faculty.edit.placeholders.recruitmentPlan')}
                            width={16}
                            value={this.state.recruitmentPlan}
                            onChange={(event, obj) => this.setState({ recruitmentPlan: obj.value })}
                        />

                        <Form.Input
                            type="date"
                            className="recruitmentPlan"
                            label={t('faculty.add.labels.date')}
                            width={16}
                            value={(new Date(this.state.date)).toISOString().slice(0, 10)}
                            onChange={(event, obj) => {
                                if (obj.value) {
                                    this.setState({ date: obj.value });
                                }
                            }}
                        />

                        <Form.Input
                            type="number"
                            label={t('faculty.edit.labels.requestsSubmitted')}
                            width={16}
                            value={this.state.requestsSubmitted}
                            readOnly
                        />

                        <Message
                            error={this.state.submitting}
                            header={t('faculty.edit.errorMessage')}
                            content={this.state.errorSubmittingMessage}
                        />

                        <Button color="google plus" type="submit" floated ="right">
                            <Icon name='checkmark' /> {t('faculty.edit.editButton')}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default reduxForm({ form: 'EditFacultyForm' })(translate('common')(EditFacultyForm));
