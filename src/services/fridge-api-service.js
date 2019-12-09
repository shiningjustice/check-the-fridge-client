import config from '../config';

const FridgeApiService = {
  getQuery(queryString) {
    return fetch(`${config.API_ENDPOINT}/results?${queryString}`, { 
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${config.API_TOKEN}`,
        "Content-type": "application/json"
      }
    })
      .then(itemsRes => {
        if (!itemsRes.ok)
          return itemsRes.json().then(e => Promise.reject(e));

        return itemsRes.json()
      })
      .catch(error => console.error(error))
  },

  getItems() {
    return fetch(`${config.API_ENDPOINT}/items`, { 
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
    .catch(error => console.error(error))
  },

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
    .catch(error => console.error(error))
  },
}

export default FridgeApiService;