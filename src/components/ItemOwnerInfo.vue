<template>
  <div class="item-owner-info card">
    <div class="item-info-title card-header"><i class="fa fa-info-circle" aria-hidden="true"></i> Info</div>
    <div class="item-info-body card-body">
      <p><span class="item-info-attr"><i class="fa fa-question" aria-hidden="true"></i> Status</span><br/>
        <span v-if="status"><font color="green">Available <i class="fa fa-check" aria-hidden="true"></i></font></a></span>
        <span v-else><font color="red">Not Available</font></span></p>
      <p><span class="item-info-attr"><i class="fa fa-gift" aria-hidden="true"></i> Name</span><br/><span class="item-info-value">{{name}}</span></p>
      <p><span class="item-info-attr"><i class="fa fa-user" aria-hidden="true"></i> Owner</span><br/><span class="item-info-value">{{owner_username}}</span></p>
      <p><span class="item-info-attr"><i class="fa fa-clock-o" aria-hidden="true"></i> Time Listed</span><br/><span class="item-info-value">{{timelisted}}</span></p>
      <p><span class="item-info-attr"><i class="fa fa-map-marker" aria-hidden="true"></i> Location</span><br/><span class="item-info-value">{{location}}</span></p>
      <p><span class="item-info-attr"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> Available start</span><br/><span class="item-info-value">{{startdate}}</span></p>
      <p><span class="item-info-attr"><i class="fa fa-calendar-times-o" aria-hidden="true"></i> Available end</span><br/><span class="item-info-value">{{enddate}}</span></p>
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
  }
}
</script>

<style scoped>
.item-owner-info {
  text-align: left;
  width: 100%;
  height: 500px;
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
  color: #a0a0a0;
}

</style>
