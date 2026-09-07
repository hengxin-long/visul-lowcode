import type { FormComponent } from "@/types/form"

export const baseFields: FormComponent[] = [
  {
    label: '密码框',
    id: '',
    componentType: 'password',
    field: 'password',
    props: {
      label: '密码',
      require: true,
      tyep: 'password',
      placeholder: '请输入密码',
      disabled: false,
      clearable: true,
      readonly: false,
      maxlength: 30,
      minlength: 0,
      size: 'default'
    }
  },
  {
    label: '文本框',
    id: '',
    componentType: 'input',
    field: 'field',
    props: {
      label: '文本框',
      require: true,
      type: 'text',
      placeholder: '请输入文本',
      clearable: true,
      disabled: false,
      readonly: false,
      maxlength: 30,
      minlength: 0,
      size: 'default'
    }
  },
  {
    label: '日期',
    id: '',
    componentType: 'date',
    field: 'date',
    props: {
      readonly: false,
      disabled: false,
      size: 'default',
      editable: true,
      clearable: true,
      placeholder: '日期',
      format: 'YYYY-MM-DD'
    }
  },
  {
    label: '数字框',
    id: '',
    componentType: 'inputNumber',
    field: 'number',
    props: {
      max: 10,
      min: 0,
      step: 1,
      precision: 2,
      disabled: false,
      controlsPosition: '',
      readonly: false,
      controls: true,
      align: 'center'
    }
  },
  {
    label: '多选框',
    id: '',
    componentType: 'checkbox',
    field: 'checkbox',
    props: {
      trueValue: '',
      falseValue: '',
      label: '多选',
      checked: false,
      disabled: false,
      border: false,
      size: 'default'
    }
  },
  {
    label: '单选框',
    id: '',
    componentType: 'radio',
    field: 'radio',
    props: {
      value: 1,
      label: '单选',
      disabled: false,
      border: false,
      size: 'default'
    }
  },
  {
    label: '下拉框',
    id: '',
    componentType: 'select',
    field: 'select',
    props: {
      multiple: false,
      disabled: false,
      options: [
        { label: '选项1', value: '选项1' },
        { label: '选项2', value: '选项2' },
        { label: '选项3', value: '选项3' },
      ],
      size: 'default',
      clearable: true,
      placeholder: '下拉框'
    }
  },
  {
    label: '评分',
    id: '',
    componentType: 'rate',
    field: 'rate',
    props: {
      max: 5,
      size: 'default',
      disabled: false,
      allowHalf: false,
      lowThreshold: 2,
      highThreshold: 4,
      clearable: true,
      showText: false,
      textColor: 'balck',
      texts: ['one', 'two', 'three', 'four', 'five']
    }
  },
  {
    label: '按钮',
    id: '',
    componentType: 'button',
    field: 'button',
    props: {
      label: '按钮',
      type: 'default',
      size: 'default',
      color: '',
      plain: false,
      text: false,
      bg: false,
      link: false,
      round: false,
      circle: false,
      dashed: false,
      disabled: false,
      loading: false,
    }
  },
  {
    label: '标题',
    id: '',
    componentType: 'title',
    field: 'title',
    props: {
      fontSize: 20,
      color: 'black',
      level: 1,
      textAlign: 'left',
      fontWeight: '400'
    }
  },
  
]