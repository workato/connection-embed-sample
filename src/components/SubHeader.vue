<template>
  <div class="sub-header">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "SubHeader"
    }
</script>

<style scoped>
 .sub-header {
   padding: 20px 74px;
   font-size: 20px;
   font-weight: bold;
   color: #37434C;
   box-shadow: 0 1px 3px #979797;
 }
</style>