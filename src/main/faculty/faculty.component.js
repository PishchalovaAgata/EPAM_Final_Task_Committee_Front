import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    List,
    Header,
    Divider,
    Label,
    Icon,
} from 'semantic-ui-react';
import { translate } from 'react-i18next';
import './faculty-table.css';
import roles from '../../configs/roles';

class Faculty extends Component {
    static get propTypes() {
        return {
            t: PropTypes.func,
            faculty: PropTypes.shape({
                name: PropTypes.string,
                subjects: PropTypes.arrayOf(PropTypes.string),
                entry_plan: PropTypes.number,
                amount_entrant: PropTypes.number,
                id: PropTypes.number,
                time: PropTypes.number,
            }),
            role: PropTypes.string,
            onEditPageClick: PropTypes.func,
            onDeleteElementClick: PropTypes.func,
        };
    }

    render() {
        const { t } = this.props;

        return (
            <div>
                <Header size='medium' textAlign="left">{this.props.faculty.name}</Header>
                <Header as='h4' textAlign="left">{t('faculty.table.reqSubjects')}:</Header>

                <List>
                    {
                        this.props.faculty.subjects.map(subject => <List.Item key ={subject}>
                            <List.Icon name='marker' />
                            <List.Content>
                                <List.Header>{subject}</List.Header>
                            </List.Content>
                        </List.Item>)
                    }
                </List>

                <Divider section />

                <Header className="countTable" as='h4' color='green'>
                    {t('faculty.table.recruitmentPlan')} <Label circular>{this.props.faculty.entry_plan}</Label>
                </Header>

                <Header className="countTable" as='h4' color='red'>
                    {t('faculty.table.requestsSubmitted')} <Label circular>{this.props.faculty.amount_entrant}</Label>
                </Header>

                {
                    this.props.role === roles.ADMIN.ROLE ? (
                        <List.Content floated='right'>
                            <Icon
                                onClick={() => this.props.onEditPageClick(this.props.faculty.id)}
                                name="edit"
                                size="large"
                                color="green"
                            />
                            <Icon
                                onClick={() => this.props.onDeleteElementClick(this.props.faculty.id)}
                                name="delete"
                                size="large"
                                color="red"
                            />
                        </List.Content>
                    ) : null
                }

                <Header as='h4'>
                    {t('faculty.table.deadline')}: {(new Date(this.props.faculty.time)).toISOString().slice(0, 10)}
                </Header>
            </div>
        );
    }
}

export default translate('common')(Faculty);
