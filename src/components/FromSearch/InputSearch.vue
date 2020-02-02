<template>
  <div id="components-form-demo-advanced-search">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSearch"
    >
      <a-row :gutter="24">
        <a-col
          v-for="(item, index) in data"
          :key="index"
          :span="8"
        >
          <a-form-item :label="item.label" :colon="false" :labelCol="{span: 6}">
            <a-input
              v-if="item.type == 'input'"
              v-decorator="[
                item.labelStr
              ]"
              :placeholder="item.placeholder"
            />
            <inputNumber
              v-if="item.type == 'inputNumber'"
              v-decorator="[
                item.labelStr,
                { initialValue: '' }
              ]"
              :placeholder="item.placeholder"
            />
            <a-select
              v-if="item.type == 'select'"
              v-decorator="[
                item.labelStr,
              ]"
              :placeholder="item.placeholder"
            >
              <a-select-option v-for="(_item, _index) in item.options" :key="_index" :value="_item.value">
                {{ _item.label }}
              </a-select-option>
            </a-select>
            <a-range-picker
              style="width: 100%"
              v-if="item.type == 'date'"
              v-decorator="[
                item.labelStr, {
                  rules: [{ type: 'array', message: 'Please select time!' }]
                }
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col
          :span="12"
        >
          <a-button
            type="primary"
            @click="newCreate"
            v-if="!hideCreateBtn"
          >
            新建
          </a-button>
        </a-col>
        <a-col
          :span="12"
          :style="{ textAlign: 'right' }"
        >
          <a-button
            type="primary"
            html-type="submit"
          >
            查询
          </a-button>
          <a-button
            :style="{ marginLeft: '8px' }"
            @click="handleReset"
          >
            重置
          </a-button>
          <a-button
            :style="{ marginLeft: '8px' }"
            @click="_export"
          >
            导出
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import inputNumber from './InputNumber'

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    hideCreateBtn: {
      type: Boolean,
      default: function () { return false }
    }
  },
  components: { inputNumber },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSearch: function (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) this.$emit('submit', values)
      })
    },
    handleReset: function () {
      this.form.resetFields()
      this.$emit('resetFields')
    },
    newCreate: function () {
      this.$emit('create')
    },
    _export: function () {
      this.$emit('_export')
    }
  }
}
</script>
<style >
.ant-advanced-search-form .ant-form-item {
  display: flex;
  margin-bottom: 6px;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>
