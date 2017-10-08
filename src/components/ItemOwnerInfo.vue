<template>
  <div class="item-owner-info">
    <div class="item-info-title">Info</div>
    <p><span class="item-info-attr">Name:</span> {{name}}</p>
    <p><span class="item-info-attr">Owner:</span> {{owner_username}}</p>
    <p><span class="item-info-attr">Time Listed:</span> {{timelisted}}</p>
    <p><span class="item-info-attr">Status</span> <span v-if="status">Available</span><span v-else>Not Available</span></p>
    <p><span class="item-info-attr">Location:</span> {{location}}</p>
    <p><span class="item-info-attr">Avaialble start:</span> {{startdate}}</p>
    <p><span class="item-info-attr">Avaialble end:</span> {{enddate}}</p>
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
  /*background-color: #cecece;*/
}
.item-owner-info p {
  margin:0em;
}

.item-info-title {
  font-weight:bold;
  font-size:2em;
  padding-bottom: 2%;
}

.item-info-attr {
  font-weight:bold;
}
</style>
