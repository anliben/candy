
export default class Utilitarios {
  static GravarToken(token: string) {
    localStorage.setItem('tokenJWT', token);
  }

  static ObterToken() {
    return localStorage.getItem('tokenJWT');
  }

}
