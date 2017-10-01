<template>
  <div class="item-desc">
    <div class="item-desc-title">Description</div>
    <div class="item-desc-text">{{item.description}}</div>
  </div>
</template>

<script>
import api_ep from '../api.json'

var api_url = api_ep.API_URL + api_ep.ITEM

export default {
  name: 'ItemDescription',
  data () {
    return {
      item: {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tags: 'abc, def, ghi'
      }
    }
  },

  created: function () {
    this.$http.get(api_url)
      .then(response => {
        this.item = response.data;
        console.log(this.item);
      });
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
</style>
