import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Pagination,
    Icon, List,
    Button,
    Segment,
} from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withAlert } from 'react-alert';
import roles from '../../configs/roles';
import './faculty-table.css';
import FacultyFilter from './filter/candidates-filter.container';
import Faculty from './faculty.component';
import * as actionCreators from './faculty-actions';
import facultyService from '../../service/faculty-service';
import SemanticLoader from '../../components/loaders/semantic-loader';

class FacultyTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editPageClicked: false,
            editPageClickedId: 0,
            sheetPageClicked: false,
            sheetPageClickedId: 0,
            activePage: 1,
            prev: '0',
            filter: {},
        };
    }

    static get propTypes() {
        return {
            role: PropTypes.string,
            id: PropTypes.number,
            t: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
            getFaculties: PropTypes.func,
            totalPages: PropTypes.number,
            faculties: PropTypes.arrayOf(PropTypes.shape({})),
        };
    }

    onEditPageClick = id => this.setState({ editPageClickedId: id, editPageClicked: true });

    onSheetClick = id => this.setState({ sheetPageClickedId: id, sheetPageClicked: true });

    onElementClick = (obj) => {
        this.setState({ activePage: obj.activePage });
        this.props.getFaculties(obj.activePage, this.state.filter, this.props.alert.error, this.props.t);
    };

    onFilter = (filter) => {
        this.setState({ filter });
        this.props.getFaculties(this.state.activePage, filter, this.props.alert.error, this.props.t);
    };

    componentDidMount() {
        this.props.getFaculties(1, undefined, this.props.alert.error, this.props.t);
    }

    onDeleteElementClick = (id) => {
        facultyService.deleteFaculty(id)
            .then((data) => { this.props.alert.success(data.toString()); })
            .catch((error) => {
                if (error.response) {
                    this.props.alert.error(this.props.t(`error.${error.response.status}`));
                } else {
                    this.props.alert.error(error.message);
                }
            });
    };

    onFacultyRegister = (id) => {
        facultyService.registerToFaculty(
            {
                entrant_id: this.props.id,
                faculty_id: id,
            },
        )
            .then((data) => { this.props.alert.success(data.toString()); })
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

        if (this.state.editPageClicked) {
            return <Redirect to={`/faculties/edit/${this.state.editPageClickedId}`} />;
        }

        if (this.state.sheetPageClicked) {
            return <Redirect to={`/faculties/${this.state.sheetPageClickedId}/sheet`} />;
        }

        if (!this.props.faculties) {
            return <SemanticLoader />;
        }

        let mainClassName = 'content-all';
        if (this.props.role === roles.ADMIN.ROLE) {
            mainClassName = 'content-wide';
        }

        let stickyClassName = 'sticky';
        if (this.props.faculties.length === 1) {
            stickyClassName = 'sticky-position';
        }

        return (
            <div>
                {
                    this.props.role === roles.ADMIN.ROLE && this.props.faculties.length !== 0 ? (
                        <div className={stickyClassName}>
                            <FacultyFilter onFilter={this.onFilter}/>
                        </div>
                    ) : null
                }

                {
                    this.props.faculties.length === 0 ? (
                        <div className='ui warning message'>
                            <div className='header'>{t('faculty.table.warning.header')}</div>
                            <p>{t('faculty.table.warning.title')}</p>
                        </div>
                    ) : null
                }
                <div className={mainClassName} >
                    <div className="faculty-tab background padded ">
                        <List verticalAlign='middle'>
                            {
                                this.props.faculties
                                    .map(item => <List.Item key ={item.key}>
                                        <Segment>
                                            {this.props.role === roles.ADMIN.ROLE ? (item.is_Unavailable ? (
                                                <List.Content floated='right'>
                                                    <Button color='yellow' disabled>
                                                        {t('faculty.table.getSheet')}
                                                    </Button>
                                                </List.Content>
                                            ) : (
                                                <List.Content floated='right'>
                                                    <Button
                                                        onClick={() => this.onSheetClick(item.id)}
                                                        color='yellow'
                                                    >
                                                        {t('faculty.table.getSheet')}
                                                    </Button>
                                                </List.Content>
                                            )) : item.is_Unavailable ? (
                                                <List.Content floated='right'>
                                                    <Button color='red' disabled>
                                                        {t('faculty.table.register')}
                                                    </Button>
                                                </List.Content>
                                            ) : (
                                                <List.Content floated='right'>
                                                    <Button
                                                        onClick={() => this.onFacultyRegister(item.id)}
                                                        color='green'
                                                    >
                                                        {t('faculty.table.register')}
                                                    </Button>
                                                </List.Content>
                                            )}

                                            <Faculty
                                                faculty={item}
                                                role={this.props.role}
                                                onEditPageClick={this.onEditPageClick}
                                                onDeleteElementClick={this.onDeleteElementClick}
                                            />
                                        </Segment>
                                    </List.Item>)
                            }
                        </List>
                    </div>
                    {
                        this.props.totalPages > 1 ? (
                            <div className="faculty-pagination">
                                <Segment>
                                    <Pagination
                                        defaultActivePage={1}
                                        ellipsisItem={{
                                            content: <Icon name='ellipsis horizontal'/>,
                                            icon: true,
                                        }}
                                        firstItem={{
                                            content: <Icon name='angle double left'/>,
                                            icon: true,
                                        }}
                                        lastItem={{
                                            content: <Icon name='angle double right'/>,
                                            icon: true,
                                        }}
                                        prevItem={{
                                            content: <Icon name='angle left'/>,
                                            icon: true,
                                        }}
                                        nextItem={{
                                            content: <Icon name='angle right'/>,
                                            icon: true,
                                        }}
                                        totalPages={this.props.totalPages}
                                        onPageChange={(event, obj) => this.onElementClick(obj)}
                                    />
                                </Segment>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    role: state.auth.role,
    id: state.auth.id,
    faculties: state.faculty.faculties,
    totalPages: state.faculty.totalPages,
});

export default withAlert(connect(mapStateToProps, actionCreators)(translate('common')(FacultyTable)));
