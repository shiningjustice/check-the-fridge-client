import config from '../config';

const ItemsApiService = {
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
  },

  postItem(item) {
    return fetch(`${config.API_ENDPOINT}/items`, {
			method: "POST",
			body: JSON.stringify(item),
			headers: {
				"Authorization": `Bearer ${config.API_TOKEN}`,
				"Content-type": "application/json"
			},
		})
			.then(res => {
				if (!res.ok) {
					return res.json().then(e => Promise.reject(e));
				}
				return res.json();
      })
  },

  
  patchItem(item, itemId) {
    return fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        "Authorization": `Bearer ${config.API_TOKEN}`,
        "Content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
      })
  },

  deleteItem(itemId) {
    return fetch(config.API_ENDPOINT + `/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${config.API_TOKEN}`,
        "Content-type": "application/json"
      }, 
    })
      .then( res => {
        if (!res.ok){
          return res.json().then(error => Promise.reject(error))
        }
        //no content returned if call is successful, so skip this line
      })
  },
}

export default ItemsApiService;