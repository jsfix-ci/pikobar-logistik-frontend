import Cookies from 'js-cookie'

const TokenKey = 'Survey-Token'

export function getToken() {
  return JSON.parse(Cookies.get(TokenKey))
}

export function setToken(token) {
  return Cookies.set(TokenKey, JSON.stringify(token))
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
