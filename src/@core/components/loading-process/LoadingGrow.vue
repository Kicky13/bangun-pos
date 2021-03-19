<template>
  <div class="loader">
    <div class="d-flex align-items-center spinnerload">
      <b-spinner
        small
        type="grow"
        variant="primary"
      />
      <b-spinner
        type="grow"
        variant="primary"
      />
      <b-spinner
        small
        type="grow"
        variant="primary"
      />
    </div>
  </div>
</template>

<script>
import {
  VBTooltip, BSpinner,
} from 'bootstrap-vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BSpinner,
  },
}
</script>

<style scoped>
.loader{
    position: absolute;
    top:0px;
    right:0px;
    width:100%;
    height:100%;
    background-color:#eceaea;
    background-size: 50px;
    background-repeat:no-repeat;
    background-position:center;
    z-index:10000000;
    opacity: 0.8;
    filter: alpha(opacity=40);
}
.spinnerload{
    left: 50%;
    top: 50%;
    position: absolute;
}
</style>
