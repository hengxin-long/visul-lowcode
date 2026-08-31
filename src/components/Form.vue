<template>
  <div ref="componet" class="form-component" v-for="com in formSchema?.schema.components" :key="com.id"
    @click.stop="handleSelect(com)">
    <!-- 动态渲染组件 -->
    <!-- 
              v-bind：绑定组件属性
              手动双向绑定
              :model-value -> props
              @update:model-value -> function
              as keyof typeof map  告诉TS：这个字符串一定是 map 对象的合法 key，消除类型报错。
            -->
    <p v-if="com.componentType === 'input' || com.componentType === 'password'">{{ com.props.label }}</p>

    <component :is="map[com.componentType as keyof typeof map]" v-bind="com.props">
      <span v-if="com.componentType === 'button'">{{ com.props.label }}</span>
    </component>
  </div>
</template>

<script setup lang="ts">
import { useDesignStore } from '@/stores/design';
import { componentMap } from '@/utils/componentMap';

const map = componentMap
const { handleSelect } = useDesignStore()
defineProps(['formSchema'])
</script>

<style scoped lang="scss">
.form-component {
  width: 100%;
  margin: 8px 0;
}
</style>