import config from '../config';
import ApiContext from '../contexts/ApiContext';

const SignupsApiService = {
  postSignups(signup) {
    return fetch(config.API__ENDPOINT + '/signups', {
      method: 'POST',
      body: JSON.stringify(signup),
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

export default SignupsApiService;