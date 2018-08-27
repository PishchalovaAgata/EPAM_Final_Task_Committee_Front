import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';
import { Table, Header } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import './sheet.css';
import SheetRow from './sheet-row.component';
import SemanticLoader from '../../components/loaders/semantic-loader';
import * as actionCreators from '../faculty/faculty-actions';


class FacultyTable extends Component {
    componentDidMount() {
        this.props.sheetGetEntrants(this.props.match.params.id, this.props.alert.error, this.props.t);
    }

    static get propTypes() {
        return {
            t: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
            entrants: PropTypes.arrayOf(PropTypes.shape({})),
            match: PropTypes.shape({
                params: PropTypes.shape({
                    id: PropTypes.string,
                }),
            }),
            sheetGetEntrants: PropTypes.func,
            facultyName: PropTypes.string,
        };
    }

    render() {
        const { t } = this.props;

        if (!this.props.entrants || !this.props.facultyName) {
            return <SemanticLoader />;
        }

        return (
            <div className="sheetHeader">
                <Header size='huge' textAlign="center">
                    {t('sheet.name')} {this.props.facultyName}
                </Header>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{t('sheet.email')}</Table.HeaderCell>
                            <Table.HeaderCell>{t('sheet.username')}</Table.HeaderCell>
                            <Table.HeaderCell>{t('sheet.first_name')}</Table.HeaderCell>
                            <Table.HeaderCell>{t('sheet.second_name')}</Table.HeaderCell>
                            <Table.HeaderCell>{t('sheet.score')}</Table.HeaderCell>
                            <Table.HeaderCell>{t('sheet.enrolled')}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.props.entrants.map(entrant => <SheetRow key={entrant.id} entrant={entrant}/>)
                        }
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    entrants: state.faculty.sheetEntrants,
    facultyName: state.faculty.facultyName,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(FacultyTable)));
