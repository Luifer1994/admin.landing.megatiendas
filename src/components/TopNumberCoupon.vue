<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="getCategorie()"
      :series="getSerie()"
    ></apexchart>
  </div>
</template>
<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";
export default {
  name: "TopNumberCoupon",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      urlApi: process.env.VUE_APP_URL_API,
      token: localStorage.getItem("token"),
      serie: [],
      categorie: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await axios.get(this.urlApi + "top-client-for-coupon");
      const data = res.data;
      data.forEach((element) => {
        this.serie.push(element.coupon_count);
        this.categorie.push(element.name);
      });
      console.log(this.serie);
    },

    getSerie() {
      return [
        {
          name: "Cupones",
          data: this.serie,
        },
      ];
    },

    getCategorie() {
      return {
        chart: {
          height: 350,
          type: "bar",
          stacked: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        colors: ["#1CC5DC"],

        xaxis: {
          categories: this.categorie,
        },
      };
    },
  },
};
</script>