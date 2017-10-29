import router from '@/router'
import api_ep from '../api.json'
// URL and endpoint constants

var api_url_user = api_ep.API_URL + api_ep.USER
var api_user_owner = '?username='

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned credentials
  login(context, creds, redirect) {
    var _auth = this
    $.ajax({
      url: api_ep.API_URL + api_ep.LOGIN, // Your api url
      type: 'POST', // type is any HTTP method
      data: {data: creds}, // Data as js object
      statusCode: {
        401: function(){
          //console.log('failed login')
          context.setLoginMsg('Incorrect username/password!')
        }
      },
      success: function(response){
        if (response.success === true) {
          //console.log('logged in')
          context.$session.start()
          context.$session.set('username', creds.username)
          context.$session.set('JWT', response.token)
          _auth.user.authenticated = true
          _auth.loadAdminStatus(context, creds, redirect)
        }
      }
    })
  },

  loadAdminStatus(context, creds, redirect) {
    $.ajax({
      url: api_url_user + api_user_owner + creds.username, // Your api url
      type: 'GET', // type is any HTTP method
      data: {data: creds}, // Data as js object
      success: function(response){
        var userInfo = response
        if (!(userInfo.username == '' || userInfo.username == null)) {
          context.$session.set('isAdmin', userInfo.isadmin)
        } else {
          console.log("Error, unable to load exisiting user's user data")
        }
        context.$router.push('/')
      }
    })
  },

  signup(context, creds, redirect) {
    $.ajax({
      url: api_ep.API_URL + api_ep.USER, // Your api url
      type: 'PUT', // type is any HTTP method
      data: {data: creds}, // Data as js object
      success: function(response){
        if (response.success === true) {
          //console.log('success')
          context.$router.push('/Login')
        } else {
          //console.log('fail')
          context.setRegisterMsg('Username already taken!')
        }
      }
    })
  },

  changePw(context, creds) {
    var _auth = this
    $.ajax({
      url: api_ep.API_URL + api_ep.PASSWORD, // Your api url
      type: 'POST', // type is any HTTP method
      data: {data: creds}, // Data as js object
      headers: _auth.getAuthHeader(context),
      success: function(response){
        if (response.success === true) {
          //console.log('success')
          context.closePasswordChangeModal(2000, 'Successful password change')
        } else {
          //console.log('fail')
          context.setPwChangeMsg('Old password incorrect!')
          context.incorrectPasswordFeedback()
        }
      }
    })
  },

  testToken(context) {
    var _auth = this
    $.ajax({
      url: api_ep.API_URL + 'api/tokenValid', // Your api url
      type: 'GET', // type is any HTTP method
      headers: _auth.getAuthHeader(context),
      success: function(response){
        if (response.success === true) {
          console.log('token legit!')
        } else {
          console.log('token failed')
        }
      }
    })
  },

  // To log out, we just need to remove the token
  logout(context) {
    context.$session.destroy()
    context.$router.push('/')
    // this.user.authenticated = false
  },

  isLoggedIn(context) {
    return context.$session.exists()
  },

  getUsername(context) {
    if (context.$session.has('username')) {
      return context.$session.get('username')
    } else {
      return ''
    }
  },

  isUserAdmin(context) {
    if (context.$session.has('isAdmin')) {
      return context.$session.get('isAdmin')
    } else {
      return false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader(context) {
    //console.log(context.$session.get('JWT'))
    return {
      Authorization: 'JWT ' + context.$session.get('JWT')
    }
  }
}
