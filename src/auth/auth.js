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
        $.ajax({ 
	       url: api_ep.API_URL + api_ep.USER, //Your api url
	       type: 'POST', //type is any HTTP method 
	       data: { data: creds }, //Data as js object 
	       success: function (response) {
                if (response.success === true) {
                    console.log('logged in');
                    context.$session.start()
                    context.$session.set('username', creds.username)
                    return ''
                } else {
                    console.log('failed login');
                    return 'Incorrect username/password!'
                }
            }
        });
    },

    signup(context, creds, redirect) {
        $.ajax({ 
            url: api_ep.API_URL + api_ep.USER, //Your api url
            type: 'PUT', //type is any HTTP method 
            data: { data: creds }, //Data as js object 
            success: function (response) {
                if(response.success == true) {
                    console.log('success');
                    return 'Creation success!';
                } else {
                    console.log('fail');		
                    return 'Username already exist!';
                }
            }
        });
    },

    // To log out, we just need to remove the token
    logout(context) {
        context.$session.destroy()
        context.$router.push('/')
        this.user.authenticated = false
    },

    isLoggedIn(context) {
        return context.$session.exists()
    },

// The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
    }
}
