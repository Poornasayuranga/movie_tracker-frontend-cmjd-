const TOKEN_KEY = 'token'

export const saveToken = (token) => {
  if (!token) return

  let tokenString = token
  if (typeof token === 'object') {
    // If backend returns an object like { token: "..." }, { jwt: "..." }, or { accessToken: "..." }
    tokenString = token.token || token.jwt || token.jwtToken || token.accessToken || token.data || ''
    if (!tokenString) {
      tokenString = JSON.stringify(token)
    }
  }

  // Strip accidental quotes or pre-attached 'Bearer ' prefix
  if (typeof tokenString === 'string') {
    tokenString = tokenString.trim()
    if (tokenString.startsWith('Bearer ')) {
      tokenString = tokenString.substring(7).trim()
    }
    if (
      (tokenString.startsWith('"') && tokenString.endsWith('"')) ||
      (tokenString.startsWith("'") && tokenString.endsWith("'"))
    ) {
      tokenString = tokenString.slice(1, -1)
    }
  }

  localStorage.setItem(TOKEN_KEY, tokenString)
  localStorage.setItem('movieTracker_token', tokenString)
}

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem('movieTracker_token')
  if (!token || token === 'undefined' || token === 'null' || token === '[object Object]') {
    return null
  }
  return token
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem('movieTracker_token')
  localStorage.removeItem('movieTracker_user')
}
