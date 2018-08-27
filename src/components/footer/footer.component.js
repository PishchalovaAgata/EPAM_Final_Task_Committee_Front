import React from 'react';
import PropTypes from 'prop-types';
import { withAlert } from 'react-alert';
import footerService from '../../service/footer-service';
import './footer.css';
import { translate } from 'react-i18next';

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            footerHtml: undefined,
        };
    }

    componentDidMount() {
        footerService.getFooter()
            .then((result) => { this.setState({ footerHtml: result.data }); })
            .catch((error) => {
                if (error.response) {
                    this.props.alert.error(this.props.t(`error.${error.response.status}`));
                } else {
                    this.props.alert.error(error.message);
                }
            });
    }

    static get propTypes() {
        return {
            t: PropTypes.func,
            alert: PropTypes.shape({
                error: PropTypes.func,
                success: PropTypes.func,
            }),
        };
    }

    render() {
        if (!this.state.footerHtml) {
            return <div />;
        }

        return (
            <footer className="footer-distributed">
                <div className="footer-right">
                    <a href="https://www.facebook.com/agatha.pishchalova"><i className="fa fa-facebook"/></a>
                    <a href="https://vk.com/igatty14"><i className="fa fa-vk"/></a>
                    <a href="https://www.instagram.com/gatty_lm/"><i className="fa fa-instagram"/></a>
                    <a href="https://github.com/PishchalovaAgata"><i className="fa fa-github"/></a>
                </div>

                <div className="footer-left" dangerouslySetInnerHTML={{ __html: this.state.footerHtml }}/>
            </footer>

        );
    }
}

export default withAlert(translate('common')(Footer));
