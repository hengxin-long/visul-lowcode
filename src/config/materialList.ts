import type { FormComponent } from "@/types/form"

export const baseFields: FormComponent[] = [
  {
    label: '标题',
    icon: 'SetUp',
    id: '',
    componentType: 'title',
    field: 'title',
    props: {
      innerText: '标题',
      color: 'black',
      level: 1,
      textAlign: 'left',
      fontWeight: '400',
    }
  },
  {
    label: '文本框',
    icon: 'Document',
    id: '',
    componentType: 'input',
    field: 'field',
    props: {
      align: 'left',
      label: '文本框',
      require: true,
      type: 'text',
      placeholder: '请输入文本',
      clearable: true,
      disabled: false,
      readonly: false,
      maxlength: 30,
      minlength: 0,
      size: 'default',
      width: '100%'
    }
  },
  {
    label: '数字框',
    icon: 'Coin',
    id: '',
    componentType: 'inputNumber',
    field: 'number',
    props: {
      align: 'left',
      max: 10,
      min: 0,
      step: 1,
      precision: 2,
      disabled: false,
      controlsPosition: '',
      readonly: false,
      controls: true,
    }
  },
  {
    label: '日期',
    icon: 'MostlyCloudy',
    id: '',
    componentType: 'date',
    field: 'date',
    props: {
      align: 'left',
      readonly: false,
      disabled: false,
      size: 'default',
      editable: true,
      clearable: true,
      placeholder: '日期',
      format: 'YYYY-MM-DD',
      width: '100%'
    }
  },
  {
    label: '单选框',
    icon: 'Open',
    id: '',
    componentType: 'radio',
    field: 'radio',
    props: {
      align: 'left',
      value: 1,
      label: '单选',
      disabled: false,
      border: false,
      size: 'default'
    }
  },
  {
    label: '多选框',
    icon: 'Select',
    id: '',
    componentType: 'checkbox',
    field: 'checkbox',
    props: {
      align: 'left',
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
    label: '下拉框',
    icon: 'Tickets',
    id: '',
    componentType: 'select',
    field: 'select',
    props: {
      align: 'left',
      multiple: false,
      disabled: false,
      options: [
        { label: '选项1', value: '选项1' },
        { label: '选项2', value: '选项2' },
        { label: '选项3', value: '选项3' },
      ],
      size: 'default',
      clearable: true,
      placeholder: '下拉框',
      width: '100%'
    }
  },
  {
    label: '按钮',
    icon: 'Pointer',
    id: '',
    componentType: 'button',
    field: 'button',
    props: {
      align: 'left',
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
      width: '100%'
    }
  },
  {
    label: '评分',
    icon: 'Star',
    id: '',
    componentType: 'rate',
    field: 'rate',
    props: {
      align: 'left',
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
]