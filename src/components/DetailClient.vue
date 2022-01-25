<template>
  <div class="main-body">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="main-breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/clients" href="index.html">Clientes</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Detalle</li>
      </ol>
    </nav>
    <!-- /Breadcrumb -->

    <div class="row gutters-sm">
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <div class="avatar avatar-5xl">
                <div class="avatar-name rounded-circle bg-primary">
                  <span>{{ avatar }}</span>
                </div>
              </div>
              <div class="mt-3">
                <h4>{{ name }}</h4>
                <p class="text-secondary mb-1">{{ this.data.city }}</p>
                <p class="text-muted font-size-sm">
                  {{ this.data.direction }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card mb-3">
          <div class="card-header bg-light">
            <h5 class="mb-0">Datos personales</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Nombre completo</h6>
              </div>
              <div class="col-sm-9 text-secondary">{{ name }}</div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Documento</h6>
              </div>
              <div class="col-sm-9 text-secondary">{{ data.document }}</div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Email</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ data.email }}
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Celular</h6>
              </div>
              <div class="col-sm-9 text-secondary">{{ data.phone }}</div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Ciudad</h6>
              </div>
              <div class="col-sm-9 text-secondary">{{ data.city }}</div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Dirección</h6>
              </div>
              <div class="col-sm-9 text-secondary">
                {{ data.direction }}
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div class="card mb-3 mt-4">
          <div class="card-header bg-light">
            <h5 class="mb-0">Cupones</h5>
          </div>
          <div class="card-body fs--1">
            <div class="d-flex" v-for="coupon in data.coupon" :key="coupon">
              <div class="flex-1 position-relative ps-3">
                <h6 class="fs-0 mb-0">
                  Número: <b>{{ coupon.coupon }}</b>
                  <span
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Verified"
                    aria-label="Verified"
                    style="color: blue"
                    ><i class="far fa-check-circle"></i
                  ></span>
                </h6>
                <h6 class="fs-0 mb-0">
                  Serie: <b>{{ coupon.serie }}</b>
                </h6>
                <p class="text-1000 mb-0">
                  {{ formatDate(coupon.created_at) }}
                </p>
                <div class="border-dashed-bottom my-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "DetailClient",
  mounted() {
    this.getDetailClient(this.$route.params.id);
  },
  data() {
    return {
      urlApi: process.env.VUE_APP_URL_API,
      token: localStorage.getItem("token"),
      detail: null,
      avatar: null,
      name: null,
      city: null,
      data: {},
    };
  },
  methods: {
    async getDetailClient(id) {
      const res = await axios.get(this.urlApi + "detail-coupon-client/" + id, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.detail = res.data.data;
      this.avatar =
        this.detail.name.charAt(0) + this.detail.last_name.charAt(0);
      this.name = this.detail.name + " " + this.detail.last_name;
      this.data = this.detail;
    },
    formatDate(value) {
      moment.locale("es");
      if (value) {
        return moment(String(value)).format("LL");
      }
    },
  },
};
</script>