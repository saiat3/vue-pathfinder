<template>
  <div id="node" :class="`${className}`">
  </div>
</template>

<script>
  export default {
    name: 'Node',
    props: ['isStart', 'isFinish', 'isVisited'],
    data() {
      return {
        className: ''
      }
    },
    methods: {
      updateClass() {
        if (this.isStart) {
          this.className = 'is-start-node'
        } else if (this.isFinish) {
          this.className = 'is-finish-node'
        } else if (this.isVisited) {
          this.className = 'is-visited-node'
        } else {
          this.className = '';
        }
      }
    },
    beforeMount() {
      this.updateClass()
    },
    watch: {
      isStart() {
        this.updateClass();
      },
      isFinish() {
        this.updateClass();
      },
      isVisited() {
        this.updateClass();
      },
    }
  }
</script>

<style lang="scss">
  #node {
    width: 35.8px;
    height: 35.58px;
    background-color: #ffb6c3;
    border: 1px solid black;
    display: inline-block;
    text-align: center;

    &:hover {
      background-color: red;
      cursor: pointer;
    }

    &.is-start-node {
      background-color: blue;
    }

    &.is-finish-node {
      background-color: aqua;
    }

    &.is-visited-node {
      background-color: green;
    }

  }
</style>
