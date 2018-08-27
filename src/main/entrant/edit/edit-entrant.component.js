import React from 'react';
import {
    Form, Button, Header, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import './edit-entrant.css';
import { translate } from 'react-i18next';
import roles from '../../../configs/roles';

import DropdownComponent from '../../../components/filter/components/dropdown.component';

class EditEntrantForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allSubjects: this.prepareDataForDropDown(this.props.subjects),
            subjects: this.props.formValues.marks || [],
            email: this.props.formValues.email || '',
            password: '',
            repeated_password: '',
            name: this.props.formValues.first_name || '',
            surname: this.props.formValues.surname || '',
            username: this.props.formValues.login || '',
            averageRating: this.props.formValues.certificate || 0,
            submitting: true,
            errorSubmittingMessage: '',
            errorSubmittingMessageSubjects: this.props.t('entrant.edit.errorSubmittingMessageSubjects'),
            errorSubmittingMessagePasswords: this.props.t('entrant.edit.errorSubmittingMessagePasswords'),
            currentLanguage: this.props.i18n.language,
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.dirty) {
            this.setState({
                allSubjects: this.prepareDataForDropDown(newProps.subjects),
                subjects: newProps.formValues.marks || [],
                email: newProps.formValues.email || '',
                password: '',
                repeated_password: '',
                name: newProps.formValues.first_name || '',
                surname: newProps.formValues.surname || '',
                username: newProps.formValues.login || '',
                averageRating: newProps.formValues.certificate || 0,
                submitting: true,
            });
        }
    }

    prepareDataForDropDown = (data) => {
        if (!data) {
            return [];
        }

        return data.map((item, index) => ({ key: index, value: index, text: item }));
    };

    static get propTypes() {
        return {
            onSubmit: PropTypes.func,
            t: PropTypes.func,
            subjects: PropTypes.arrayOf(PropTypes.string),
            i18n: PropTypes.shape({
                language: PropTypes.string,
            }),
            formValues: PropTypes.shape({
                first_name: PropTypes.string,
                surname: PropTypes.string,
                login: PropTypes.string,
                email: PropTypes.string,
                certificate: PropTypes.number,
                marks: PropTypes.arrayOf(PropTypes.shape({
                    subject: PropTypes.string,
                    value: PropTypes.number,
                })),
            }),
            role: PropTypes.string,
            isFull: PropTypes.bool,
        };
    }

    changeAverageRating = event => this.setState({ averageRating: event.target.value });

    changeRating = (obj, subject) => {
        this.setState((prevState) => {
            const newSubjects = prevState.subjects.map((item) => {
                if (item.subject === subject) {
                    return {
                        subject: item.subject,
                        value: parseInt(obj.value, 10),
                    };
                }

                return item;
            });

            return { subjects: newSubjects };
        });
    };

    getKeysByNames(names) {
        return names.map(name => this.state.allSubjects.find(subject => subject.text === name.subject).key);
    }

    getSubjectsByKeys(keys) {
        return keys.map((key) => {
            const name = this.state.allSubjects.find(subject => subject.key === key).text;
            const item = this.state.subjects.find(data => data.subject === name);
            let value = 0;

            if (item) {
                value = item.value;
            }

            return {
                subject: name,
                value,
            };
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentLanguage !== prevProps.i18n.language) {
            let newErrorSubmittingMessage = this.props.t('entrant.edit.errorSubmittingMessagePasswords');

            if (prevState.errorSubmittingMessage === prevState.errorSubmittingMessageSubjects) {
                newErrorSubmittingMessage = this.props.t('entrant.edit.errorSubmittingMessageSubjects');
            }

            this.setState({
                errorSubmittingMessage: newErrorSubmittingMessage,
                errorSubmittingMessagePasswords: this.props.t('entrant.edit.errorSubmittingMessagePasswords'),
                errorSubmittingMessageSubjects: this.props.t('entrant.edit.errorSubmittingMessageSubjects'),
                currentLanguage: prevProps.i18n.language,
            });
        }
    }

    prepareData = () => {
        if (this.state.password !== this.state.repeated_password) {
            this.setState({ submitting: false, errorSubmittingMessage: this.state.errorSubmittingMessagePasswords });
            return;
        }

        if (this.state.subjects.length !== 3 && this.props.role === roles.USER.ROLE) {
            this.setState({ submitting: false, errorSubmittingMessage: this.state.errorSubmittingMessageSubjects });
            return;
        }

        this.setState({ submitting: true });

        const data = {
            email: this.state.email,
            login: this.state.username,
            password: this.state.password,
        };

        if (this.props.role === roles.USER.ROLE) {
            data.certificate = this.state.averageRating;
            data.marks = this.state.subjects;
            data.first_name = this.state.name;
            data.surname = this.state.surname;
        }

        this.props.onSubmit(data);
    };

    render() {
        const { t } = this.props;
        let editClassName = 'entrant-edit-form';

        if (this.props.isFull) {
            editClassName = 'entrant-edit-form-full';
        }

        return (
            <div className={editClassName}>
                <Form size="large" onSubmit={this.prepareData}>
                    <Header size='huge' textAlign="center">{t('entrant.edit.name')}</Header>

                    <Form.Input
                        type='email'
                        label={t('entrant.edit.labels.email')}
                        placeholder={t('entrant.edit.placeholders.email')}
                        width={16}
                        value={this.state.email}
                        onChange={(event, obj) => this.setState({ email: obj.value })}
                    />

                    <Form.Input
                        type='username'
                        label={t('entrant.edit.labels.username')}
                        placeholder={t('entrant.edit.placeholders.username')}
                        width={16}
                        value={this.state.username}
                        onChange={(event, obj) => this.setState({ username: obj.value })}
                    />

                    <Form.Group>
                        <Form.Input
                            label={t('entrant.edit.labels.password')}
                            type='password'
                            placeholder={t('entrant.edit.placeholders.password')}
                            width={8}
                            onChange={(event, obj) => this.setState({ password: obj.value })}
                        />

                        <Form.Input
                            label={t('entrant.edit.labels.repeatPassword')}
                            type='password'
                            placeholder={t('entrant.edit.placeholders.repeatPassword')}
                            width={8}
                            onChange={(event, obj) => this.setState({ repeated_password: obj.value })}
                        />
                    </Form.Group>

                    {
                        this.props.role === roles.USER.ROLE ? (<div>
                            <Form.Group>
                                <Form.Input
                                    label={t('entrant.edit.labels.name')}
                                    placeholder={t('entrant.edit.placeholders.name')}
                                    width={8}
                                    value={this.state.name}
                                    onChange={(event, obj) => this.setState({ name: obj.value })}
                                />

                                <Form.Input
                                    label={t('entrant.edit.labels.surname')}
                                    placeholder={t('entrant.edit.placeholders.surname')}
                                    width={8}
                                    value={this.state.surname}
                                    onChange={(event, obj) => this.setState({ surname: obj.value })}
                                />
                            </Form.Group>

                            <Form.Input
                                label={`${t('entrant.edit.averageScoreMessage')}: ${this.state.averageRating}`}
                                type='range'
                                min={40}
                                max={100}
                                value={this.state.averageRating}
                                onChange={this.changeAverageRating}
                                className="ui blue range"
                                width={12}
                            />

                            <Field
                                name="subjects"
                                label={t('entrant.edit.labels.subjects')}
                                items={this.state.allSubjects}
                                defaultItems={this.getKeysByNames(this.state.subjects)}
                                onChange={(event, obj) => this.setState({ subjects: this.getSubjectsByKeys(obj) })}
                                component={DropdownComponent}
                            />

                            <br/>

                            {
                                this.state.subjects.map((item) => {
                                    const key = this.getKeysByNames([item])[0];
                                    return <div key ={key}>
                                        <Form.Input
                                            label={`${t('entrant.edit.scoreMessage')} ${item.subject}: ${item.value}`}
                                            type='range'
                                            min={20}
                                            max={100}
                                            value={item.value}
                                            onChange={(event, obj) => this.changeRating(obj, item.subject)}
                                            className="ui blue range"
                                            width={12}
                                        />
                                    </div>;
                                })
                            }
                        </div>
                        ) : null}

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
        );
    }
}

export default reduxForm({ form: 'EditEntrantForm' })(translate('common')(EditEntrantForm));
