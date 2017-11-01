<template>
  <div class="item-desc card">
    <div class="item-desc-title card-header"><i class="fa fa-file-text-o" aria-hidden="true"></i> Description</div>
    <div class="item-desc-text card-body">{{description}}</div>
    <div><hr/></div>
    <div class="item-desc-tags">
      <b>Tags:</b>
      <span v-for="tag in tags">
        #{{tag}}
      </span>
    </div>
    <hr/>
  </div>
</template>

<script>

export default {
  name: 'ItemDescription',
  props: ['description', 'tags'],
  data () {
    return {
      tags,
      item: {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        tags: 'abc, def, ghi'
      },
    }
  },
  methods: {
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
  height: 350px auto;
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

.item-desc-tags {
  height: 10px;
  padding-left: 10px;
}
</style>
