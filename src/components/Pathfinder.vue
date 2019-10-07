<template>
  <div>

    <button @click="runDijkstra">Run</button>

    <div id="pathfinder">
      <div class="row"
           v-for="(row, rowIndex) in grid"
      >
        <node v-for="(nodeObject, colIndex) in row"
              :is-finish="nodeObject.isFinish"
              :is-visited="nodeObject.isVisited"
              :is-start="nodeObject.isStart"></node>
      </div>
    </div>
  </div>
</template>

<script>
  import Node from "./node/Node";
  import MainService from "./MainService";
  import DijkstraService from "./DijkstraService";

  export default {
    name: 'Pathfinder',
    data() {
      return {
        grid: [],
        rowCount: 20,
        colCount: 50
      }
    },
    components: {Node},
    beforeMount() {
      this.initGrid();
      console.log(this.grid[0][0]);
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
        console.log(this.grid);
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            const newGrid = this.grid.slice();
            newGrid[node.row][node.col] = {
              ...node,
              isVisited: true
            };
            this.$set(this.grid, newGrid);
          }, 10 * i);
        }
      },
      async runDijkstra() {
        const startNode = this.grid[MainService.START_ROW][MainService.START_COL];
        const finishNode = this.grid[MainService.FINISH_ROW][MainService.FINISH_COL];

        let visitedNodesInOrder =  await DijkstraService.dijkstra(this.grid, startNode, finishNode);

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

<style>
  #pathfinder {
    font-size: 0;
    border: 1px solid black;
    width: 1890px;
    margin: 0 auto;
  }
</style>
