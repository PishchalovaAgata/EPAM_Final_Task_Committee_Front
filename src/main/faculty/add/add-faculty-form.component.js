import React from 'react';
import {
    Form, Button, Header, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import './add-faculty.css';

import DropdownComponent from '../../../components/filter/components/dropdown.component';

class AddFacultyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitting: true,
            subjects: this.prepareDataForDropDown(this.props.subjects),
            name: '',
            newSubjects: [],
            recruitmentPlan: 0,
            errorSubmittingMessageSubjects: this.props.t('faculty.add.errorSubmittingMessageSubjects'),
            currentLanguage: this.props.i18n.language,
        };
    }

    static get propTypes() {
        return {
            onSubmit: PropTypes.func,
            t: PropTypes.func,
            subjects: PropTypes.arrayOf(PropTypes.string),
            i18n: PropTypes.shape({
                language: PropTypes.string,
            }),
        };
    }

    prepareDataForDropDown = (data) => {
        if (!data) {
            return [];
        }

        return data.map((item, index) => ({ key: index, value: index, text: item }));
    };

    componentDidUpdate(prevProps) {
        if (this.state.currentLanguage !== prevProps.i18n.language) {
            this.setState({
                errorSubmittingMessageSubjects: this.props.t('faculty.add.errorSubmittingMessageSubjects'),
                errorSubmittingMessage: this.props.t('faculty.add.errorSubmittingMessageSubjects'),
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

    getKeysByNames(names) {
        return names.map(name => this.state.subjects.find(subject => subject.text === name).key);
    }

    render() {
        const { t } = this.props;

        return (
            <div className="pattern-container parent-size">
                <div className="registration-form">
                    <Form size="large" onSubmit={this.prepareData}>
                        <Header size='huge' textAlign="center">{t('faculty.add.name')}</Header>

                        <Form.Input
                            label={t('faculty.add.labels.name')}
                            placeholder={t('faculty.add.placeholders.name')}
                            width={16}
                            onChange={(event, obj) => this.setState({ name: obj.value })}
                        />

                        <Field
                            name="subjects"
                            label={t('faculty.add.labels.subjects')}
                            items={this.state.subjects}
                            defaultItems={this.getKeysByNames(this.state.newSubjects)}
                            onChange={(event, obj) => this.setState({ newSubjects: this.getSubjectsByKeys(obj) })}
                            component={DropdownComponent}
                        />

                        <Form.Input
                            type="number"
                            className="recruitmentPlan"
                            label={t('faculty.add.labels.recruitmentPlan')}
                            placeholder={t('faculty.add.placeholders.recruitmentPlan')}
                            width={16}
                            onChange={(event, obj) => this.setState({ recruitmentPlan: obj.value })}
                        />

                        <Form.Input
                            type="date"
                            className="recruitmentPlan"
                            label={t('faculty.add.labels.date')}
                            width={16}
                            onChange={(event, obj) => this.setState({ date: obj.value })}
                        />

                        <Message
                            error={this.state.submitting}
                            header={t('faculty.add.errorMessage')}
                            content={this.state.errorSubmittingMessage}
                        />

                        <Button color="google plus" type="submit" floated ="right">
                            <Icon name='checkmark' /> {t('faculty.add.addButton')}
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default reduxForm({ form: 'AddFacultyForm' })(translate('common')(AddFacultyForm));
