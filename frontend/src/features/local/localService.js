import axios from 'axios';


const fetchEthPrice = async () => {
    const res = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
    
    return res.data.USD;
}


const localService = {
    fetchEthPrice
}

export default localService;