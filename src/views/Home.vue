<template>
  <div>
    <SubHeader>
      Home
    </SubHeader>
    <div class="home-page">
      <img src="../assets/home_page.png"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .home-page {
    margin: 5px 70px 0;
    > img {
     width: 100%;
    }
  }
</style>
<script>
    import SubHeader from "../components/SubHeader";
    export default {
        components: {SubHeader}
    }
</script>