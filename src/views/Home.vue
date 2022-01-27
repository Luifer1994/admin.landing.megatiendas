<template>
  <div class="row g-3 mb-3">
    <div class="col-md-6 col-xxl-6">
      <div class="card h-md-100 ecommerce-card-min-width">
        <div class="card-header bg-light">
          <div class="row align-items-center">
            <div class="col">
              <h6 class="mb-0">Cupones por día</h6>
            </div>
          </div>
        </div>
        <CouponForDay></CouponForDay>
      </div>
    </div>
    <div class="col-md-6 col-xxl-6">
      <div class="card h-md-100">
        <div class="card-header bg-light">
          <div class="row align-items-center">
            <div class="col">
              <h6 class="mb-0">Cupones por ciudad</h6>
            </div>
          </div>
        </div>
        <CouponForCity></CouponForCity>
      </div>
    </div>
  </div>
  <div class="row g-0">
    <div class="col-lg-6 pe-lg-2 mb-3">
      <div class="card h-lg-100 overflow-hidden">
        <div class="card-header bg-light">
          <div class="row align-items-center">
            <div class="col">
              <h6 class="mb-0">Top 10 clientes con mas cupones</h6>
            </div>
          </div>
        </div>
        <TopNumberCoupon></TopNumberCoupon>
      </div>
    </div>
    <!-- <div class="col-lg-6 ps-lg-2 mb-3">
      <div class="card h-lg-100">
        <div class="card-header">
          <div class="row flex-between-center">
            <div class="col-auto">
              <h6 class="mb-0">Total Sales</h6>
            </div>
          </div>
        </div>
        <div class="card-body h-100 pe-0">
          <CharTotalSales></CharTotalSales>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import CouponForCity from "../components/CouponForCity.vue";
import CouponForDay from "../components/CouponForDay.vue";
import TopNumberCoupon from "../components/TopNumberCoupon.vue";
export default {
  name: "Home",
  components: {
    CouponForCity,
    CouponForDay,
    TopNumberCoupon,
  },
};
</script>
