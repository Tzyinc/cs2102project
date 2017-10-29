<template>
  <div class="item-desc card">
    <div class="item-desc-title card-header">Description</div>
    <div class="item-desc-text card-body">{{description}}</div>
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
  width: 100%;
  text-align: left;
  position: relative;
  /*background-color: #efefef;*/
  vertical-align: top;
  height: 350px;
}
.item-desc-title {
  font-weight:bold;
  font-size:1.5em;
  padding-bottom: 2%;
}
.item-desc-text {
  max-height:inherit;
  overflow-y: scroll;
}
</style>
