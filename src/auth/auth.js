import router from '@/router'

// URL and endpoint constants
const API_URL = 'http://localhost:8080/'
const LOGIN_URL = API_URL + 'api/user'
const SIGNUP_URL = API_URL + 'api/user'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned credentials
  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds)
	  .then(response => {
      if(response.login_result == true) {
		localStorage.setItem('id_token', response.id_token)
		localStorage.setItem('access_token', response.access_token)

	  
	  this.user.authenticated = true
	  // Redirect to a specified route
	  if(redirect) {
		router.go(redirect)        
	  }
	  return '';
	} else {
		return 'Incorrect username/password!';
	}

    }).error((err) => {
      context.error = err
    })
  },

  signup(context, creds, redirect) {
	  $.ajax({ url: SIGNUP_URL, //Your api url 
	  type: 'PUT', //type is any HTTP method 
	  data: { data: creds }, //Data as js object 
	  success: function (response) {
		if(response.success == true) {
			console.log('success');
			return 'Creation success!';
		} else {
			console.log('fail');		
			return 'Username already exist!';
		}} }) ;
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
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}