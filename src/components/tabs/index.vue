<template>
  <div class="component__tabs-box">
    <div class="tabs-wrap" ref="bar-child">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="checkList($event, item, index)"
        class="bar"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="ink-bar" ref="inkbar"></div>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  props: {
    list: {
      type: Array,
      required: true
    },
    activeKey: {
      type: String,
      default: function () { return '1' }
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs['bar-child'].$children)
      let w = this.$refs['bar-' + this.activeKey][0].offsetWidth
      this.$refs.inkbar.style.width = w + 'px'
      this.$refs.inkbar.style.transform = 'translate3d(30px, 0px, 0px)'
    })
  },
  methods: {
    checkList: function (e, item, i) {
      console.log(e)
      let width = e.target.offsetWidth
      console.log(this.$refs.inkbar, width)
      this.$refs.inkbar.style.width = width + 'px'
      let l = (e.target.offsetLeft + 30) - 6
      this.$refs.inkbar.style.transform = 'translate3d(' + l + 'px, 0px, 0px)'
      // this.$emit('change', item, i)
    }
  }
}
</script>
<style lang="less" scoped>
.component__tabs-box{
  box-sizing: border-box;
  background: #fff;
  padding: 0 24px;
  position: relative;
  .tabs-wrap{
    position: relative;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding-left: 0;
    list-style: none;
    -webkit-transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: -webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1);
    transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
    div{
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      height: 100%;
      margin: 0 24px 0 0;
      padding: 12px 6px;
      text-decoration: none;
      cursor: pointer;
      -webkit-transition: color .3s cubic-bezier(.645,.045,.355,1);
      transition: color .3s cubic-bezier(.645,.045,.355,1);
      color: #606266;
      &:hover{
        color: darken(#606266, 10%)
      }
    }
    .bar-active{
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
    }
  }
  .ink-bar{
    position: absolute;
    bottom: 2px;
    left: 0;
    z-index: 1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 2px;
    background-color: #1890ff;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
}
</style>
