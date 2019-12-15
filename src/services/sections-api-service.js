import config from '../config';

const SectionsApiService = {
  getSections() {
    return fetch(`${config.API_ENDPOINT}/sections`, { 
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${config.API_TOKEN}`,
        "Content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
        
        return res.json()
      })
  },
}

export default SectionsApiService;