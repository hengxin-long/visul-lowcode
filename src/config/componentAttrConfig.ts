
export interface PropObj {
  label: string,
  prop: string,
  type: string,
  /** 生成属性控件的限制属性 */
  limit?: Record<string, any>
}

export const componentAttrConfig: Record<string, PropObj[]> = {
  input: [
    { label: '标签文本', prop: 'label', type: 'input' },
    { label: '占位提示', prop: 'placeholder', type: 'input' },
    { label: '文本框类型', prop: 'type', type: 'inputType' },
    { label: '是否禁用', prop: 'disabled', type: 'switch' },
    { label: '是否只读', prop: 'readonly', type: 'switch' },
    { label: '最大长度', prop: 'maxlength', type: 'number', limit: { min: 0 } },
    { label: '最小长度', prop: 'minlength', type: 'number', limit: { min: 0 } },
    { label: '是否显示清除按钮', prop: 'clearable', type: 'switch' },
    { label: '输入框尺寸', prop: 'size', type: 'enum' },
    { label: '宽度，输入带后缀%或px的数', prop: 'width', type: 'input' }
  ],
  inputNumber: [
    { label: '最大值', prop: 'max', type: 'number' },
    { label: '最小值', prop: 'min', type: 'number' },
    { label: '步数', prop: 'step', type: 'number' },
    { label: '控制按钮位置', prop: 'controls-position', type: 'posiEnum' },
    { label: '大小', prop: 'size', type: 'enum' },
    { label: '数值精度', prop: 'precision', type: 'number', limit: { min: 0, max: 100 } },
    { label: '是否禁用', prop: 'disabled', type: 'switch' },
    { label: '是否只读', prop: 'readonly', type: 'switch' },
    { label: '是否使用控制按钮', prop: 'controls', type: 'switch' },
    { label: '内部输入文本对齐', prop: 'align', type: 'positionEnum' },
  ],
  radio: [
    { label: '单选框的值', prop: 'value', type: 'input' },
    { label: '单选框的label', prop: 'label', type: 'input' },
    { label: '是否禁用', prop: 'disabled', type: 'switch' },
    { label: '是否显示边框', prop: 'border', type: 'switch' },
    { label: '单选框的尺寸', prop: 'size', type: 'enum' },
  ],
  checkbox: [
    { label: '选中时的值', prop: 'true-value', type: 'input' },
    { label: '没有选中时的值', prop: 'false-value', type: 'input' },
    { label: '多选标签', prop: 'label', type: 'input' },
    { label: '当前是否勾选', prop: 'checked', type: 'switch' },
    { label: '是否禁用', prop: 'disabled', type: 'switch' },
    { label: '是否显示边框', prop: 'border', type: 'switch' },
    { label: 'Checkbox 的尺寸', prop: 'size', type: 'enum' },
  ],
  rate: [
    { label: '最大分值', prop: 'max', type: 'number', limit: { min: 1 } }, // default: 5
    { label: '尺寸', prop: 'size', type: 'enum' },
    { label: '是否为只读', prop: 'disabled', type: 'switch' },
    { label: '是否允许半选', prop: 'allow-half', type: 'switch' },
    { label: '低分和中等分数的界限值， 值本身被划分在低分中', prop: 'low-threshold', type: 'number', limit: { min: 0 } },
    { label: '高分和中等分数的界限值， 值本身被划分在高分中', prop: 'high-threshold', type: 'number', limit: { min: 0 } },
    { label: '是否可以重置值为0', prop: 'clearable', type: 'switch' },
    { label: '是否显示辅助文字', prop: 'show-text', type: 'switch' },
    { label: '辅助文字的颜色', prop: 'text-color', type: 'input' },
    { label: '辅助文字数组', prop: 'texts', type: 'array' },
  ],
  select: [
    { label: '是否多选', prop: 'multiple', type: 'switch' },
    { label: '是否禁用', prop: 'disabled', type: 'switch' },
    { label: '选项的数据源', prop: 'options', type: 'options' },
    { label: '输入框尺寸', prop: 'size', type: 'enum' },
    { label: '是否可以清空选项', prop: 'clearable', type: 'switch' },
    { label: '占位符，默认为“下拉框”', prop: 'placeholder', type: 'input' },
    { label: '宽度，输入带后缀%或px的数', prop: 'width', type: 'input' }
  ],
  colorPicker: [
    { label: '是否禁用', prop: 'disabled', type: 'switch' },
    { label: '文本框可输入', prop: 'clearable', type: 'switch' },
    { label: '尺寸', prop: 'size', type: 'enum' },
    { label: '是否支持透明度选择', prop: 'show-alpha', type: 'switch' },
    { label: 'ColorPicker下拉框的类名', prop: 'popper-class', type: 'input' },
    { label: '预定义颜色', prop: 'predefine', type: 'array' },
  ],
  date: [
    { label: '是否只读', prop: 'readonly', type: 'switch' },
    { label: '是否禁用', prop: 'disabled', type: 'switch' },
    { label: '输入框尺寸', prop: 'size', type: 'enum' },
    { label: '文本框可输入', prop: 'editable', type: 'switch' },
    { label: '是否显示清除按钮', prop: 'clearable', type: 'switch' },
    { label: '非范围选择时的占位内容', prop: 'placeholder', type: 'input' },
    { label: '显示在输入框中的格式', prop: 'format', type: 'input' }, // YYYY-MM-DD
    { label: '宽度，输入带后缀%或px的数', prop: 'width', type: 'input' }
  ],
  button: [
    { label: '按钮名', prop: 'label', type: 'input' },
    { label: '按钮类型，在设置color时，后者优先。', prop: 'type', type: 'btnEnum' },
    { label: '尺寸', prop: 'size', type: 'enum' },
    { label: '是否为朴素按钮', prop: 'plain', type: 'switch' },
    { label: '是否为文字按钮', prop: 'text', type: 'switch' },
    { label: '是否显示文字按钮背景颜色', prop: 'bg', type: 'switch' },
    { label: '是否为链接按钮', prop: 'link', type: 'switch' },
    { label: '是否为圆角按钮', prop: 'round', type: 'switch' },
    { label: '是否为圆形按钮', prop: 'circle', type: 'switch' },
    { label: '是否是虚线按钮', prop: 'dashed', type: 'switch' },
    { label: '按钮是否为禁用状态', prop: 'disabled', type: 'switch' },
    { label: '是否为加载中状态', prop: 'loading', type: 'switch' },
    { label: '自定义按钮颜色', prop: 'color', type: 'input' },
    { label: '宽度，输入带后缀%或px的数', prop: 'width', type: 'input' }
  ],
  title: [
    { label: '标题级别', prop: 'level', type: 'number', limit: { min: 1, max: 6 } },
    { label: '标题内容', prop: 'innerText' , type: 'input' },
    { label: '字体颜色', prop: 'color', type: 'input' },
    { label: '字体位置', prop: 'textAlign', type: 'input' },
    { label: '字体加粗（400不加粗 700加粗）', prop: 'fontWeight', type: 'input' },
  ]
}
