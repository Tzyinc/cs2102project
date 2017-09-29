import router from '@/router'
import api_ep from '../api.json'
// URL and endpoint constants

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned credentials
  login(context, creds, redirect) {
    context.$http
      .post(api_ep.API_URL + api_ep.USER, creds)
      .then(response => {
        if (response.login_result === true) {
          localStorage.setItem('id_token', response.id_token)
          localStorage.setItem('access_token', response.access_token)

          this.user.authenticated = true
          // Redirect to a specified route
          if (redirect) {
            router.go(redirect)
          }
          return ''
        } else {
          return 'Incorrect username/password!'
        }
      })
      .error(err => {
        context.error = err
      })
  },

  signup(context, creds, redirect) {
    $.ajax({
      url: api_ep.API_URL + api_ep.USER, //Your api url
      type: 'PUT', //type is any HTTP method
      data: {data: creds}, //Data as js object
      success: function(){
        console.log('test')
        return data
      }
    })
    //console.log('Signed up');
    /*context.$http.put(SIGNUP_URL, creds, (data) => {
      /*localStorage.setItem('id_token', data.id_token)
      localStorage.setItem('access_token', data.access_token)

      this.user.authenticated = true

      if(redirect) {
        router.go(redirect)
      }
		console.log('Signed up');
		return JSON.parse(data);
    })*/
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}
