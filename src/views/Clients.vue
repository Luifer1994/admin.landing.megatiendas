<template>
  <div class="search-box" data-list='{"valueNames":["title"]}'>
    <input
      v-model="search"
      @keyup="list()"
      class="form-control search-input fuzzy-search"
      type="search"
      placeholder="Buscar..."
      aria-label="Search"
    />
    <span class="fas fa-search search-box-icon"></span>
  </div>
  <br />
  <div class="card shadow-none">
    <div class="card-body p-0 pb-3">
      <div class="d-flex align-items-center justify-content-end my-2 mx-3">
        <div class="mx-2">
          <button
            class="btn btn-falcon-success btn-sm"
            type="button"
            @click="exportData()"
          >
            <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span
            ><span class="ms-1">Exportar</span>
          </button>
        </div>
        <div class="btn-group my-2">
          <button
            class="btn btn-falcon-primary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Ver
          </button>
          <div class="dropdown-menu">
            <a
              class="dropdown-item"
              :class="{ active: limit == 5 }"
              style="cursor: pointer"
              @click="views(5)"
              >5</a
            >
            <a
              class="dropdown-item"
              :class="{ active: limit == 10 }"
              style="cursor: pointer"
              @click="views(10)"
              >10</a
            >
            <a
              class="dropdown-item"
              style="cursor: pointer"
              :class="{ active: limit == 15 }"
              @click="views(15)"
              >15</a
            >
            <a
              class="dropdown-item"
              :class="{ active: limit == 20 }"
              style="cursor: pointer"
              @click="views(20)"
              >20</a
            >
          </div>
        </div>
      </div>
      <div class="table-responsive scrollbar">
        <table class="table mb-0">
          <thead class="text-black bg-100">
            <tr>
              <th class="align-middle">DOCUMENTO</th>
              <th class="align-middle">NOMBRE</th>
              <th class="align-middle">EMAIL</th>
              <th class="align-middle">CELULAR</th>
              <th class="align-middle">CIUDAD</th>
              <th class="align-middle">TOTAL_CUPONES</th>
              <th class="align-middle">DETALLE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients" :key="client.id">
              <th class="align-middle">{{ client.document }}</th>
              <td class="align-middle">
                {{
                  client.name.toUpperCase() +
                  " " +
                  client.last_name.toUpperCase()
                }}
              </td>
              <td class="align-middle">{{ client.email.toUpperCase() }}</td>
              <td class="align-middle">{{ client.phone }}</td>
              <td class="align-middle">{{ client.city }}</td>
              <td class="align-middle">{{ client.coupon.length }}</td>
              <td class="align-middle">
                <router-link
                  :to="{ name: 'Detail', params: { id: client.id } }"
                  class="btn btn-falcon-warning btn-sm"
                  type="button"
                >
                  <span
                    style="font-size: 20px"
                    class="far fa-eye"
                    data-fa-transform="shrink-3 down-2"
                  ></span>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="..." class="mx-3 my-2">
        <ul class="pagination">
          <li
            class="page-item"
            v-for="link in links"
            :key="link"
            :class="{ active: link.active == true }"
          >
            <a
              @click="next(link.label)"
              style="cursor: pointer"
              class="page-link"
              >{{ link.label }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ExportJsonExcel from "js-export-excel";
export default {
  name: "Clients",
  data() {
    return {
      urlApi: process.env.VUE_APP_URL_API,
      token: localStorage.getItem("token"),
      clients: null,
      links: [],
      page: 1,
      limit: 10,
      search: "",
      option: {},
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    async exportData() {
      const res = await axios.get(this.urlApi + "coupon-export", {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      this.option.fileName = "Cupones";
      let sheetData = [];
      res.data.forEach((element) => {
        sheetData.push(element);
      });
      this.option.datas = [
        {
          sheetData,
          sheetName: "CUPONES",
          sheetHeader: [
            "NÚMERO",
            "SERIE",
            "FECHA DE REGISTRO",
            "DOCUMENTO",
            "NOMBRES",
            "APELLIDOS",
            "CELULAR",
            "EMAIL",
            "CIUDAD",
          ],
          columnWidths: [5, 3, 8, 7, 10, 10, 8, 12, 10],
        },
      ];
      var toExcel = new ExportJsonExcel(this.option);
      toExcel.saveExcel();
    },

    async list(limit = null, page = null) {
      if (limit) {
        this.limit = limit;
      }
      if (page) {
        this.page = page;
      }
      const res = await axios.get(
        this.urlApi +
          "list-coupon-client?limit=" +
          this.limit +
          "&page=" +
          this.page +
          "&search=" +
          this.search,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      this.clients = res.data.data.data;
      this.links = res.data.data.links.slice(1, res.data.data.links.length - 1);
    },
    next(num) {
      this.list(this.limit, num);
    },
    views(num) {
      this.limit = num;
      this.list(this.limit, this.page);
    },
  },
};
</script>