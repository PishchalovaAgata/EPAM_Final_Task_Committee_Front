import React from 'react';
import ReactDOM from 'react-dom';

import { Provider as ReduxProvider } from 'react-redux';
import { Provider } from 'react-alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import thunk from 'redux-thunk';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import AlertTemplate from './components/alert/alert.component';

import SignInComponent from './main/auth/sign-in/sign-in.component';
import RegistrationComponent from './main/auth/registration/registration.component';
import App from './main/app/App';
import checkAuth from './main/auth/auth-component';

import authReducer from './main/auth/auth-reducer';
import facultyReducer from './main/faculty/faculty-reducer';
import entrantReducer from './main/entrant/entrant-reducer';

import commonDe from './translations/de/common.json';
import commonEn from './translations/en/common.json';
import commonCn from './translations/cn/common.json';

import { loadState, saveState } from './localStorage';

import './index.css';

const persistedState = loadState();

const reducer = combineReducers({
    auth: authReducer,
    faculty: facultyReducer,
    entrant: entrantReducer,
    form: reduxFormReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'REMOVE_USER') {
        state = undefined;
    }

    return reducer(state, action);
};

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {
        en: {
            common: commonEn,
        },
        de: {
            common: commonDe,
        },
        cn: {
            common: commonCn,
        },
    },
});

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
    saveState(store.getState());
});

const options = {
    timeout: 5000,
    position: 'top center',
};

ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <Provider template={AlertTemplate} {...options}>
            <ReduxProvider store={store}>
                <Router>
                    <Switch>
                        <Route path="/login" component={SignInComponent} />
                        <Route path="/registration" component={RegistrationComponent} />
                        <Route path="/" component={checkAuth(App)} />
                    </Switch>
                </Router>
            </ReduxProvider>
        </Provider>
    </I18nextProvider>,
    document.getElementById('root'),
);

export default store;
