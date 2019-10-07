<template>
  <div id="pathfinder">
    <node v-for="index in 945"
          :index="index"
          :key="index"></node>
  </div>
</template>

<script>
  import Node from "./node/Node";

  export default {
    name: 'Pathfinder',
    components: {Node},
  }
</script>

<style>
  #pathfinder {
    font-size: 0;
    border: 1px solid black;
    width: 1890px;
    margin: 0 auto;
  }
</style>
