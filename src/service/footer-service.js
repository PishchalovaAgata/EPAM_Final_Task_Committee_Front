import axios from 'axios';

function getFooter() {
    return axios.get('http://localhost:8888/committee/footer');
}

const footerService = {
    getFooter,
};

export default footerService;
