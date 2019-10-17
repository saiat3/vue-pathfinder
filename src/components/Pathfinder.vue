<template>
  <div>

    <div class="header">
      <button :disabled="disableRunBtn" class="run-btn btn" @click="runDijkstra()">Run Dijkstra</button>
      <button :disabled="disableResetBtn" class="reset-btn btn" @click="reset()">Reset</button>
    </div>

    <div id="pathfinder">
      <div class="row" v-for="row in grid">
        <div v-for="nodeObject in row"
             id="node"
             @mousedown="handleMouseDown(nodeObject.row, nodeObject.col)"
             @mouseenter="handleMouseEnter(nodeObject.row, nodeObject.col)"
             @mouseup="handleMouseUp"
             :class="{
              'is-start-node' : nodeObject.isStart,
              'is-finish-node' : nodeObject.isFinish,
              'is-visited-node' : nodeObject.isVisited,
              'is-path' : nodeObject.isPath,
              'is-wall' : nodeObject.isWall,
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
        mouseIsPressed: false,
        disableRunBtn: false,
        disableResetBtn: false,
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
      reset() {
        this.initGrid();
        this.grid = [...this.grid];
        this.disableRunBtn = false;
      },
      animateDijkstra(visitedNodesInOrder, shortestPathNodesInOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            this.grid[node.row][node.col].isVisited = true;
            this.grid = [...this.grid];
            if (visitedNodesInOrder.length - 1 === i) {
              for (let j = 0; j < shortestPathNodesInOrder.length; j++) {
                setTimeout(() => {
                  const innerNode = shortestPathNodesInOrder[j];
                  this.grid[innerNode.row][innerNode.col].isPath = true;
                  this.grid = [...this.grid];
                  if (shortestPathNodesInOrder.length - 1 === j) {
                    this.disableResetBtn = false;
                  }
                }, 30 * j)
              }
            }
          }, 5 * i)
        }
      },
      handleMouseDown(row, col) {
        this.mouseIsPressed = true;
        this.getNewGridWithWallToggled(row, col);
      },
      handleMouseEnter(row, col) {
        if (this.mouseIsPressed) {
          this.getNewGridWithWallToggled(row, col);
        }
      },
      handleMouseUp() {
        this.mouseIsPressed = false;
      },
      getNewGridWithWallToggled(row, col) {
        this.grid[row][col].isWall = true;
        this.grid = [...this.grid];
      },
      async runDijkstra() {
        this.disableRunBtn = true;
        this.disableResetBtn = true;

        const startNode = this.grid[MainService.START_ROW][MainService.START_COL];
        const finishNode = this.grid[MainService.FINISH_ROW][MainService.FINISH_COL];

        let visitedNodesInOrder = await DijkstraService.dijkstra(this.grid, startNode, finishNode);
        let shortestPathNodesInOrder = await DijkstraService.getNodesInShortestPathOrder(finishNode);

        for (let i = 0; i < this.grid.length; i++) {
          for (let j = 0; j < this.grid[i].length; j++) {
            this.grid[i][j].isVisited = false;
          }
        }
        this.animateDijkstra(visitedNodesInOrder, shortestPathNodesInOrder);
      }
    }
  }
</script>

<style lang="scss">

  .btn {
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

    &[disabled] {
      background-color: #ebebeb;

      &:hover {
        color: rgb(128, 128, 128);
        border: 1px solid #cecece;
        cursor: not-allowed;
      }
    }
  }

  .header {
    margin-left: 6px;

    .run-btn {
      margin-right: 6px;
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

      &.is-path {
        background-color: #fcda19;
      }

      &.is-start-node {
        background-color: blue;
      }

      &.is-finish-node {
        background-color: aqua;
      }

      &.is-wall {
        background-color: #6d1f1f;
      }

      &:hover {
        background-color: red;
        cursor: pointer;
      }
    }
  }
</style>
