<template>
  <div>

    <button id="run-btn" @click="runDijkstra()">Run Dijkstra</button>

    <div id="pathfinder">
      <div class="row" v-for="row in grid">
        <div v-for="nodeObject in row" id="node" :class="{
          'is-start-node' : nodeObject.isStart,
          'is-finish-node' : nodeObject.isFinish,
          'is-visited-node' : nodeObject.isVisited,
        }">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MainService from "./MainService";
  import DijkstraService from "./DijkstraService";

  export default {
    name: 'Pathfinder',
    data() {
      return {
        tmp: [],
        grid: [],
        rowCount: 20,
        colCount: 50
      }
    },
    beforeMount() {
      this.initGrid();
    },
    methods: {
      initGrid() {
        for (let row = 0; row < this.rowCount; row++) {
          this.grid[row] = [];
          for (let col = 0; col < this.colCount; col++) {
            this.grid[row][col] = MainService.createNode(col, row);
          }
        }
      },
      animateDijkstra(visitedNodesInOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            this.grid[node.row][node.col].isVisited = true;
            this.grid = [...this.grid];
          }, 30 * i)
        }
      },


      async runDijkstra() {
        const startNode = this.grid[MainService.START_ROW][MainService.START_COL];
        const finishNode = this.grid[MainService.FINISH_ROW][MainService.FINISH_COL];
        let visitedNodesInOrder = await DijkstraService.dijkstra(this.grid, startNode, finishNode);
        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[i].length; j++) {
            this.grid[i][j].isVisited = false;
          }
        }
        this.animateDijkstra(visitedNodesInOrder);
      }
    }
  }
</script>

<style lang="scss">

  #run-btn {
    margin-left: 6px;
    margin-bottom: 10px;
    outline: none;
    background: none;
    border: 1px solid #cecece;
    padding: 10px 20px;

    &:hover {
      cursor: pointer;
      color: white;
      border: 1px solid #59ce79;
      background-color: #59ce79;
    }
  }

  #pathfinder {
    font-size: 0;
    border: 1px solid black;
    width: 1890px;
    margin: 0 auto;

    #node {
      width: 35.8px;
      height: 35.58px;
      background-color: #ffb6c3;
      border: 1px solid black;
      display: inline-block;
      text-align: center;

      &.is-visited-node {
        background-color: green;
      }

      &.is-start-node {
        background-color: blue;
      }

      &.is-finish-node {
        background-color: aqua;
      }

      &:hover {
        background-color: red;
        cursor: pointer;
      }
    }
  }
</style>
