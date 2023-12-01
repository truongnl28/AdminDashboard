import axios from 'axios';

const apiUrl = 'https://repurposemgmtapi.azurewebsites.net/api/swagger/index.html?fbclid=IwAR3DS3pHbMCIm3Mqu1Us4DPnB_6XZ2hnZzsjjoYQ8k_1KvKsqeLX35SOcRo';

const fetchData = () => {
    return axios.get(apiUrl);
};

export { fetchData };
