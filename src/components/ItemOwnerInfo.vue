<template>
  <div class="item-owner-info">
    <div class="item-info-title">Info</div>
    <p>Name: {{item.name}}</p>
    <p>Status: <span v-if="item.status">Available</span><span v-else>Not Available</span></p>
    <p>Owner: {{itemOwner.username}}</p>
    <p>Location: {{item.location}}</p>
  </div>
</template>

<script>
export default {
  name: 'ItemOwnerInfo',
  data() {
    return {
      msg: "testing",
      itemOwner: {
        username: 'randomuser123',
      },
      item: {
        status: true,
        name: 'A book about cats, 5th edition',
        location: 'blk 123 clementi ave west',
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
</style>
