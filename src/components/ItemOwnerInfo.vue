<template>
  <div class="item-owner-info card">
    <div class="item-info-title card-header"><i class="fa fa-info-circle" aria-hidden="true"></i> Info</div>
    <div class="item-info-body card-body">
      <p><span class="item-info-attr"><i class="fa fa-question" aria-hidden="true"></i> Status</span><br/>
        <span v-if="status"><font color="green">Available <i class="fa fa-check" aria-hidden="true"></i></font></a></span>
        <span v-else><font color="red">Not Available</font></span></p><hr/>
      <p><span class="item-info-attr"><i class="fa fa-gift" aria-hidden="true"></i> Name</span><br/><span class="item-info-value">{{name}}</span></p><hr/>
      <p><span class="item-info-attr"><i class="fa fa-user" aria-hidden="true"></i> Owner</span><br/><span class="item-info-value">
              <router-link :to="{name: 'MyProfile', params: {uid: this.owner_username}}">{{owner_username}}</router-link></span></p><hr/>
      <p><span class="item-info-attr"><i class="fa fa-clock-o" aria-hidden="true"></i> Date Listed</span><br/><span class="item-info-value">{{parseDate(timelisted)}}</span></p><hr/>
      <p><span class="item-info-attr"><i class="fa fa-map-marker" aria-hidden="true"></i> Location</span><br/><span class="item-info-value">{{location}}</span></p><hr/>
      <p><span class="item-info-attr"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> Available start</span><br/><span class="item-info-value">{{parseDate(startdate)}}</span></p><hr/>
      <p><span class="item-info-attr"><i class="fa fa-calendar-times-o" aria-hidden="true"></i> Available end</span><br/><span class="item-info-value">{{parseDate(enddate)}}</span></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ItemOwnerInfo',
  props: ['owner_username', 'name', 'location', 'status', 'timelisted', 'startdate', 'enddate'],
  data() {
    return {
      item: {
      }
    }
  },
  methods: {
    parseDate(str) {
      console.log("parse date")
      if (str == null) {
        return ''
      }
      var year = str.substring(0,4)
      var month = str.substring(5,7)
      var day = str.substring(8,10)

      switch(month) {
        case '01':
          month = 'Jan'
          break
        case '02':
          month = 'Feb'
          break
        case '03':
          month = 'Mar'
          break
        case '04':
          month = 'Apr'
          break
        case '05':
          month = 'May'
          break
        case '06':
          month = 'Jun'
          break
        case '07':
          month = 'Jul'
          break
        case '08':
          month = 'Aug'
          break
        case '09':
          month = 'Sep'
          break
        case '10':
          month = 'Oct'
          break
        case '11':
          month = 'Nov'
          break
        case '12':
          month = 'Dec'
          break
      }

      return day + " " + month + " " + year
    }
  }
}
</script>

<style scoped>
.item-owner-info {
  text-align: left;
  width: 100%;
  height: 500px auto;
  /*background-color: #cecece;*/
}
.item-owner-info p {
    margin:0em;
    margin-top:0.4em;
}

.item-info-title {
  font-weight:bold;
  font-size:1.5em;
  padding-bottom: 2%;
}

.item-info-attr {
  font-weight:bold;
}

.item-info-value {
  color: #666666;
}

hr {
  padding:1px;
  margin: 0px;
  border: none;
}

</style>
