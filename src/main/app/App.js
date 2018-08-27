import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withAlert } from 'react-alert';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/header/header.components';
import Footer from '../../components/footer/footer.component';
import FacultyTable from '../faculty/faculty-table.component';
import CabinetPage from '../cabinet/cabinet.component';
import FacultyEdit from '../faculty/edit/edit-faculty.component';
import FacultyAdd from '../faculty/add/add-faculty.component';
import EditSubjects from '../cabinet/subjects/subjects.component';
import EntrantSheet from '../sheet/sheet-table.component';

import store from '../../index';
import { logout } from '../auth/auth-actions';
import './App.css';

class App extends Component {
    itemSelected = () => {
        store.dispatch(logout(this.props.alert.error, this.props.t));
    };

    static get propTypes() {
        return {
            user: PropTypes.shape({
                login: PropTypes.string,
                role: PropTypes.string,
            }),
            alert: PropTypes.shape({
                error: PropTypes.func,
            }),
        };
    }

    render() {
        const { user } = this.props;

        return (
            <div>
                <Header
                    user={{ login: user.login, role: user.role }}
                    itemSelected={this.itemSelected}
                />
                <div className="full-height">
                    <Switch>
                        <Route path="/cabinet" component={CabinetPage}/>
                        <Route path="/editSubjects" component={EditSubjects}/>
                        <Route path="/faculties/edit/:id" component={FacultyEdit}/>
                        <Route path="/faculties/:id/sheet" component={EntrantSheet}/>
                        <Route path="/faculties/add" component={FacultyAdd}/>
                        <Route path="/" component={FacultyTable} />
                    </Switch>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default withAlert(App);
