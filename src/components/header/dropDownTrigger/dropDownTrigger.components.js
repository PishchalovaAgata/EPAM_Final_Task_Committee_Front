import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Dropdown, Icon, Flag, Menu, Popup,
} from 'semantic-ui-react';
import { translate } from 'react-i18next';

class DropDownTrigger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cabinet: false,
            mainPage: false,
        };
    }

    static get propTypes() {
        return {
            user: PropTypes.shape({
                login: PropTypes.string,
            }),
            itemSelected: PropTypes.func,
            i18n: PropTypes.shape({}),
            t: PropTypes.func,
        };
    }

    render() {
        const { t, i18n } = this.props;

        if (this.state.cabinet) {
            this.setState({ cabinet: false });
            return <Redirect to={'/cabinet'} />;
        }

        if (this.state.mainPage) {
            this.setState({ mainPage: false });
            return <Redirect to={'/'} />;
        }

        return (
            <div>
                <Popup
                    trigger={
                        <span>
                            <Icon name="user" />
                            {this.props.user.login}
                        </span>
                    }
                    content={
                        <Menu vertical>
                            <Menu.Item onClick={() => this.setState({ mainPage: true })}>
                                {t('dropDownMenu.mainPage') }
                            </Menu.Item>

                            <Menu.Item onClick={(event, value) => this.props.itemSelected(event, value)}>
                                {t('dropDownMenu.signOut') }
                            </Menu.Item>

                            <Menu.Item onClick={() => this.setState({ cabinet: true })}>
                                {t('dropDownMenu.cabinet')}
                            </Menu.Item>

                            <Dropdown item text={t('dropDownMenu.selectLan')}>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => i18n.changeLanguage('de')}>
                                        <Flag name='de'>de</Flag>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => i18n.changeLanguage('en')}>
                                        <Flag name='gb'>en</Flag>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => i18n.changeLanguage('cn')}>
                                        <Flag name='cn'>cn</Flag>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu>
                    }
                    on='click'
                />

            </div>
        );
    }
}

export default translate('common')(DropDownTrigger);
