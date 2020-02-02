<template>
  <div class="component__title-back">
    <span class="back-box" @click="back" v-if="showBack">
      <a-icon type="rollback" />
      <span>返回</span>
    </span>
    <h1>{{title}}</h1>
    <div class="right">
      <slot name="extra"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.component__title-back{
  position: relative;
  border-bottom: 1px solid #e8e8e8;
  background: #fff;
  border-radius: 8px;

  h1{
    width: 100%;
    height: 64px;
    text-align: center;
    line-height: 64px;
    margin-bottom: 0;
    font-size: 19px;
  }
  .back-box{
    position: absolute;
    display: flex;
    align-items: center;
    justify-items: center;
    left: 15px;
    top: 12px;
    width: 60px;
    height: 40px;
    font-size: 15px;
    color:#909399;
    cursor: pointer;
    span{
      padding-left: 6px;
    }
    &::hover{
      color: darken(#909399, 30%)
    }
  }
  .right{
    position: absolute;
    right: 0;
    top: 12px;
    height: 40px;
    padding:0 6px;
  }
}
</style>
