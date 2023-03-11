import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

function handleError(error) {
  const e = error?.response?.data?.error || error.message
  if (typeof e === 'string') {
    return { error: e, data: [] }
  }
  return { error: e[0], data: [] }
}

export async function fetchClientApi(id) {
  try {
    const {
      data: { data }
    } = await instance.get(`/client`, {
      params: { ...(id && { id }) }
    })
    return { data, error: null }
  } catch (e) {
    return handleError(e)
  }
}

export async function fetchClientByIdApi(id) {
  try {
    const {
      data: { data }
    } = await instance.get(`/client/${id}`)
    return { data, error: null }
  } catch (e) {
    return handleError(e)
  }
}

export async function editClientApi(id, body) {
  try {
    const {
      data: { data }
    } = await instance.put(`/client/${id}`, body)
    return { data, error: null }
  } catch (e) {
    return handleError(e)
  }
}

export async function createClientApi(body) {
  try {
    const {
      data: { data }
    } = await instance.post(`/client`, body)
    return { data, error: null }
  } catch (e) {
    return handleError(e)
  }
}

export async function fetchProviderApi() {
  try {
    const {
      data: { data }
    } = await instance.get(`/provider`)
    return { data, error: null }
  } catch (e) {
    return handleError(e)
  }
}

export async function createProviderApi(name) {
  try {
    const {
      data: { data }
    } = await instance.post(`/provider`, { name })
    return { data, error: null }
  } catch (e) {
    return handleError(e)
  }
}
export async function editProviderApi(id, name) {
  try {
    const {
      data: { data }
    } = await instance.put(`/provider/${id}`, { name })
    return { data, error: null }
  } catch (e) {
    return handleError(e)
  }
}
export async function deleteProviderApi(id) {
  try {
    const {
      data: { data }
    } = await instance.delete(`/provider/${id}`)
    return { data, error: null }
  } catch (e) {
    return handleError(e)
  }
}

export async function deleteClientApi(id) {
  try {
    const {
      data: { data }
    } = await instance.delete(`/client/${id}`)
    return { data, error: null }
  } catch (e) {
    return handleError(e)
  }
}
