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

    <component :is="map[com.componentType as keyof typeof map]" v-bind="com.props" :model-value="tempData[com.field]"
      @update:model-value="(val: any) => tempData[com.field] = val">
      <span v-if="com.componentType === 'button'">{{ com.props.label }}</span>
    </component>
  </div>
</template>

<script setup lang="ts">
import { useDesignStore } from '@/stores/design';
import { componentMap } from '@/utils/componentMap';
import { ref, watch } from 'vue';
import type { FormComponent} from '@/types/form'

const map = componentMap
const { handleSelect } = useDesignStore()
const props = defineProps(['formSchema'])

/** 
 * 临时表单数据变量
 * 用于预览表单测试用，将临时数据和表单schema分开
 */
const tempData = ref<Record<string, any>>({})

/** 深度监听，组件有变化就调用 */
watch(() => props.formSchema.schema.components, (list) => {
  // console.log('list ' ,list)
  const obj: Record<string, any> = {}
  list.forEach((item: FormComponent) => {
    obj[item.field] = item.componentType === 'inputNumber' || item.componentType === 'rate' ? 1 : ''
  })
  tempData.value = obj
}, { deep: true, immediate: true })

</script>

<style scoped lang="scss">
.form-component {
  width: 100%;
  margin: 8px 0;
}
</style>