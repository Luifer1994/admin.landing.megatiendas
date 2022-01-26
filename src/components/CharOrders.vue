<template>
  <div id="chart">
    <apexchart
      class="container"
      type="pie"
      width="480"
      :options="options()"
      :series="series"
      height="370"
    ></apexchart>
  </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
export default {
  name: "CharOrders",
  components: {
    apexchart: VueApexCharts,
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      urlApi: process.env.VUE_APP_URL_API,
      token: localStorage.getItem("token"),

      series: [],
      option: [],
    };
  },
  methods: {
    async getData() {
      const res = await axios.get(this.urlApi + "cunt-coupon-for-city");
      const arr = res.data;
      arr.forEach((element) => {
        this.series.push(element.count);
        this.option.push(element.city);
      });
    },
    options() {
      return {
        chart: {
          width: 450,
          type: "pie",
        },
        legend: {
          position: "top",
        },
        labels: this.option,
        colors: [
          "#F24D98",
          "#2021A0",
          "#C2151B",
          "#59D044",
          "#F3A002",
          "#F2F44D",
          "#1CC5DC",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 320,
              },
            },
          },
        ],
      };
    },
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