<template>
  <div class="item-picture">
    <div class="item-name">{{item.name}}</div>
    <div class="image"><img src=""/></div>
  </div>
</template>

<script>
export default {
  name: 'ItemPicture',
  data() {
      return {
        item: {
          name: 'A book about cats'
        }
      }
  }
}
</script>
