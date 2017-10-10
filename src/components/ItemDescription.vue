<template>
  <div class="item-desc">
    <div class="item-desc-title">Description</div>
    <div class="item-desc-text">{{description}}</div>
    <hr/>
  </div>
</template>

<script>

export default {
  name: 'ItemDescription',
  props: ['description', 'tags'],
  data () {
    return {
      item: {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tags: 'abc, def, ghi'
      },
    }
  }
}
</script>

<style scoped>
.item-desc {
  width: 70%;
  text-align: left;
  display: inline-block;
  position: relative;
  /*background-color: #efefef;*/
  vertical-align: top;
}
.item-desc-title {
  font-weight:bold;
  font-size:2em;
  padding-bottom: 2%;
}
.item-desc-text {
  max-height:inherit;
  overflow-y: scroll;
}
</style>
