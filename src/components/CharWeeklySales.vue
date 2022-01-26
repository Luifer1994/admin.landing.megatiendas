<template>
  <div id="container">
    <apexchart
      type="area"
      :options="categories()"
      :series="series()"
      height="300"
    ></apexchart>
  </div>
  <input type="hidden" :value="data" />
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
export default {
  name: "CharWeeklySales",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      data: [],
      total: [],
      urlApi: process.env.VUE_APP_URL_API,
      token: localStorage.getItem("token"),
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      const res = await axios.get(this.urlApi + "cunt-coupon-for-day");
      for (var key in res.data) {
        this.data.push(key);
      }
      const totalArray = Object.entries(res.data);

      totalArray.forEach((element) => {
        this.total.push(element[1].length);
      });
    },
    categories() {
      return {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: this.data,
        },
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
      };
    },
    series() {
      return [
        {
          name: "Total",
          data: this.total,
        },
      ];
    },
  },
};
</script>
<style>
#container {
  width: 100%;
  display: inline-block;
}
</style>