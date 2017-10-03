<template>
  <div class="item-owner-info">
    <div class="item-info-title">Info</div>
    <p><span class="item-info-attr">Name:</span> {{item.name}}</p>
    <p><span class="item-info-attr">Owner:</span> {{item.owner_uid}}</p>
    <p><span class="item-info-attr">Status</span> <span v-if="item.status">Available</span><span v-else>Not Available</span></p>
    <p><span class="item-info-attr">Location:</span> {{item.location}}</p>
    <p><span class="item-info-attr">Time Listed:</span> {{item.timelisted}}</p>
  </div>
</template>

<script>

export default {
  name: 'ItemOwnerInfo',
  props: ['owner', 'name', 'location', 'status', 'timelisted'],
  data() {
    return {
      item: {
        owner_uid: 'user123',
        status: true,
        name: 'A book about cats, 5th edition',
        location: 'blk 123 clementi ave west',
        timelisted: '',
      }
    }
  }
}
</script>

<style scoped>
.item-owner-info {
  width: 30%;
  text-align: left;
  display:inline-block;
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
