import axios from 'axios';

const apiCliente = axios.create({
  baseURL: 'https://api.miservicio.com',
  headers: {
    'Authorization': 'Bearer tu_token_aqui'
  }
});

export default apiCliente;
