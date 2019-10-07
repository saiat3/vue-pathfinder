<template>
  <div id="node">
  </div>
</template>

<script>
  export default {
    name: 'Node',
    props: {
      index: {
        type: Number
      }
    }
  }
</script>

<style lang="scss">
  #node {
    width: 40px;
    height: 40px;
    background-color: #ffb6c3;
    border: 1px solid black;
    display: inline-block;
    text-align: center;


    &:hover {
      background-color: red;
      cursor: pointer;
    }


  }
</style>
