import AuthService from './authService'

export default function auth() {
  const authService = new AuthService()

  return {
    authService,
  }
}
