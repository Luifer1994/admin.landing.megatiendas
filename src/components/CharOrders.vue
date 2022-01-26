<template>
  <div id="container">
    <apexchart
      class="container"
      type="pie"
      width="380"
      :options="chartOptions"
      :series="series"
      height="300"
    ></apexchart>
  </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
export default {
  name: "CharOrders",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 350,
              },
            },
          },
        ],
      },
    };
  },
};
</script>
<style>
#container {
  width: 100%;
  display: inline-block;
}
@media screen and (min-width: 1200px) {
  .container {
    margin-left: 200px;
  }
}
</style>