<template>
  <!-- 
   用conponent标签动态渲染组件
   要渲染的实际组件由 is 属性决定。
   当 is 是字符串，它既可以是 HTML 标签名也可以是组件的注册名。
   或者，is 也可以直接绑定到组件的定义。
    -->
  <component :is="tag" :style="styleObj">
    {{ text }}
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FormComponent } from '@/types/form';

/** 
 * 接收父组件传递的参数
 * 我这个自定义组件，对外接收一个参数，参数名必须一样；
 * 传给我的 com 必须遵守 FormComponent 这个数据类型；
 * 科普：因为defineProps返回的是个对象，defineProps<> 里面描述的是「props 对象的结构」
 * 所以外层必须是对象 {}
 */
const props = defineProps<{
  com: FormComponent,
}>()

/** 拼接标题标签（h1 h2 h3...） */
const tag = computed(() => `h${props.com.props?.level}`)
const text = computed(() => props.com.props?.innerText)
/** 
 * 给html原生标签添加样式
 * 有变化就更新
 */
const styleObj = computed(() => ({
  fontSize: props.com.props?.fontSize,
  color: props.com.props?.color,
  textAlign: props.com.props?.textAlign,
  fontWeight: props.com.props?.fontWeight,
}))

</script>

<style scoped lang="scss"></style>