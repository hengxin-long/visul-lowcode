<template>
  <div class="form-center">
    <CountCard />
    <FormList />
  </div>
</template>

<script setup lang="ts">
import CountCard from './CountCard.vue';
import FormList from './FormList.vue';
import {ref} from 'vue'


</script>

<style scoped lang="scss">
.form-center {
  padding: 30px;
}
</style>