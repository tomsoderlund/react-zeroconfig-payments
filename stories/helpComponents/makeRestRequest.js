const makeRestRequest = async (method = 'GET', url, data) => window.fetch(url, {
  method,
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: data && JSON.stringify(data)
})
  .then(async (res) => {
    if (!res.ok) {
      const json = await res.json()
      throw new Error(json.message || res.statusText)
    }
    return res.json()
  })

export default makeRestRequest
