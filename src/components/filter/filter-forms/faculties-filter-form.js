import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
    Button, Form, Checkbox,
} from 'semantic-ui-react';
import { translate } from 'react-i18next';
import DropdownComponent from '../components/dropdown.component';

class FacultiesFilterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortValue: true,
            subjects: this.prepareDataForDropDown(this.props.subjects),
            newStatus: '',
            newSubjects: [],
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            subjects: this.prepareDataForDropDown(newProps.subjects),
        });
    }

    handleChange = () => this.setState(prevState => ({
        sortValue: !prevState.sortValue,
    }));

    prepareDataForDropDown = (data) => {
        if (!data) {
            return [];
        }

        return data.map((item, index) => ({ key: index, value: index, text: item }));
    };

    getSubjectsByKeys(keys) {
        return keys.map(key => this.state.subjects.find(subject => subject.key === key).text);
    }

    getKeysByNames(names) {
        return names.map(name => this.state.subjects.find(subject => subject.text === name).key);
    }

    prepareForSubmit = () => {
        const data = {
            subjects: this.state.newSubjects,
            order: this.state.sortValue,
        };

        if (this.state.newStatus === 0) {
            data.is_available = false;
        }

        if (this.state.newStatus === 1) {
            data.is_available = true;
        }

        this.props.onSubmit(data);
    };

    render() {
        const { t } = this.props;

        return (
            <Form className="filter-form" onSubmit={this.prepareForSubmit}>
                <Field
                    name="subjects"
                    label={t('filter.names.subjects')}
                    items={this.state.subjects}
                    defaultItems={this.getKeysByNames(this.state.newSubjects)}
                    component={DropdownComponent}
                    onChange={(event, obj) => this.setState({ newSubjects: this.getSubjectsByKeys(obj) })}
                />
                <br/>
                <Form.Field>
                    {t('filter.names.sort')}:
                </Form.Field>

                <Form.Field>
                    <Checkbox
                        radio
                        label={t('filter.checkbox.regular')}
                        name='checkboxRadioGroup'
                        checked={this.state.sortValue}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label={t('filter.checkbox.reverse')}
                        name='checkboxRadioGroup'
                        checked={!this.state.sortValue}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <div className="filter-item container-right">
                    <Button color="twitter" icon="filter" content={t('filter.applyButton')} type="submit"/>
                </div>
            </Form>
        );
    }
}

FacultiesFilterForm.defaultProps = {
    data: {},
};

FacultiesFilterForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string),
    t: PropTypes.func,
};

export default reduxForm({ form: 'CandidatesFilterForm' })(translate('common')(FacultiesFilterForm));
