<template>
<div class="myLoan">
  <div class="loan-title">
	My Loans
  </div>
  <br/>
  <br/>
  <itemgrid :items = "items"></itemgrid>
  <br/>
  <!--<div><pre>data: {{$data}}</pre></div>	-->
</div>
</template>

<script>
import auth from '../auth/auth'
import api_ep from '../api.json'
import ItemGrid from './ItemGrid'
var api_url_items = api_ep.API_URL + api_ep.LOAN
var api_loan = '?username='

export default {
  name: 'MyLoan',
  components: {
    'itemgrid' : ItemGrid,
  },
  data () {

    return {
    	searchQuery: '',
    	items: [],
      login_user: ''
    }
  },
  methods: {
    formatPrice(){
      this.items.map(x => x.minbid = x.price)
    }
  } ,
  created: function () {
    /*Change here to get items by logged in user*/
    if(!auth.isLoggedIn(this)){
      this.$router.push('/')
    }
    this.login_user = auth.getUsername(this)
    this.$http.get(api_url_items+api_loan+this.login_user)
      .then(response => {
        this.items = response.data
        this.formatPrice()
      });
  }
}
</script>

<style scoped>
.myLoan{
    margin: 0 auto;
    text-align: center;
}

.myLoan h1{
    margin-top: 20px;
}

.item{
	margin:10px;
	display: inline-block;
}

.itemRow{
	display: inline-block;
}

.createButton{
  float: right;
  margin-right: 50px;
}

.loan-title{
  font-weight:bold;
  font-size: 2em;
  padding-top: 2%;
  padding-bottom: 1%;
}
</style>
