<script setup>
  defineProps({err:String|null,resolved:Boolean|undefined});
</script>
<template>
  <div class="spinner-container" v-if="!resolved">
    <div style="justify-content: center;height: calc(100vh - 36px);" class="column">
        <p style="color: red;font-size: 24px;" v-if="err">error:{{ err }}</p>
        <div class="loading-wheel" v-else></div>
    </div>
  </div>
</template>
<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.error-banner{
    width: 200px;
    height: 130px;
    border-radius: 16px;
    background-color: beige;
    border:1px solid black;
}
.loading-wheel {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3; /* Light grey background ring */
  border-top: 4px solid rgb(20, 192, 211); /* Vue Green animating slice */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
