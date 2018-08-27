import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import './sheet.css';

class SheetRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entrant: this.props.entrant,
        };
    }

    static get propTypes() {
        return {
            t: PropTypes.func,
            entrant: PropTypes.shape({}),
        };
    }

    render() {
        const { t } = this.props;

        return (
            <Table.Row>
                <Table.Cell>{this.state.entrant.email}</Table.Cell>
                <Table.Cell>{this.state.entrant.login}</Table.Cell>
                <Table.Cell>{this.state.entrant.first_name}</Table.Cell>
                <Table.Cell>{this.state.entrant.surname}</Table.Cell>
                <Table.Cell>{this.state.entrant.score}</Table.Cell>
                {
                    this.state.entrant.enrolled === 'cancelled'
                        ? <Table.Cell negative>{t('sheet.labels.notEnrolled')}</Table.Cell>
                        : null
                }

                {
                    this.state.entrant.enrolled === 'submitted'
                        ? <Table.Cell positive>{t('sheet.labels.enrolled')}</Table.Cell>
                        : null
                }

                {
                    this.state.entrant.enrolled === 'enlisted'
                        ? <Table.Cell warning>{t('sheet.labels.enlisted')}</Table.Cell>
                        : null
                }
            </Table.Row>
        );
    }
}

export default translate('common')(SheetRow);
