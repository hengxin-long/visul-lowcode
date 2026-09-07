<template>
  <div class="form-center">
    <CountCard />
    <FormList />
  </div>
</template>

<script setup lang="ts">
import CountCard from './components/FormCountCard.vue';
import FormList from './components/FormList.vue';
import {ref} from 'vue'


</script>

<style scoped lang="scss">
.form-center {
  padding: 30px;
}
</style>