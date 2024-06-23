export class Request {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    return this._fetch(endpoint, {
      method: 'GET'
    });
  }

  async post(endpoint, data) {
    return this._fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async _fetch(endpoint, options) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

// Пример использования
// const request = new Request('https://jsonplaceholder.typicode.com');

// (async () => {
//   try {
//     const postData = {
//       title: 'foo',
//       body: 'bar',
//       userId: 1
//     };
//     const responsePost = await request.post('/posts', postData);
//     console.log('POST response:', responsePost);

//     const responseGet = await request.get('/posts');
//     console.log('GET response:', responseGet);
//   } catch (error) {
//     console.error('Request error:', error);
//   }
// })();