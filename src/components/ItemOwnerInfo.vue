<template>
  <div class="item-owner-info">
    <h3>Info</h3>
    <p>Status: <span v-if="status">Available</span><span v-else>Not Available</span>/</p>
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
        location: 'blk 123 clementi ave west',
      }
    }
  }
}
</script>
