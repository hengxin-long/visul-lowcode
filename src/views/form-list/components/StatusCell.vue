<template>
  <div
    class="row-box"
    v-if="info"
  >
    <div
      class="status-box"
      :style="`background-color: ${info?.bgColor};`"
    >
      <div
        class="circle"
        :style="`background-color: ${info?.circleCol};`"
      ></div>
      <p>{{ info?.meaning }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { statusMap } from "@/config/statusMap";

  const props = defineProps(["status"]);

  /** 一个单元格的状态发生变化了的回调 */
  const info = computed(() => {
    return statusMap[props.status as keyof typeof statusMap];
  });
</script>

<style scoped lang="scss">
  .row-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .status-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 5px;
    width: 70px;
    height: 21px;
    font-size: 12px;
    background-color: #5cd945ff;
    border-radius: 5px;
    text-align: center;
    line-height: 21px;

    .circle {
      width: 10px;
      height: 8px;
      border-radius: 50%;
      background-color: #7cff5eff;
      margin-right: 5px;
    }
  }
</style>
