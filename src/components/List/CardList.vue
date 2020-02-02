<template>
  <div class="component__card-list">
    <ul :class="class_.join(' ')">
      <li v-for="(item, index) in list" :key="index">
        <a @click="checkItem(item, index)">
          <slot name="content" :item="item" :index="index">
            无数据
          </slot>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CardList',
  props: {
    list: {
      type: Array,
      require: true,
      default: function () { return [] }
    },
    type: {
      type: Array,
      default: function () {
        return ['list-zoom']
      }
    }
  },
  data () {
    return {
      class_: ['list', 'list-vertical'].concat(this.type)
    }
  },
  methods: {
    checkItem: function (item, i) {
      this.$emit('checkItem', item, i)
    }
  }
}
</script>
<style lang="less" scoped>
.keyframes (@prefix,@name,@content) when (@prefix=def) {
  @keyframes @name {
    @content();
  }
}
.keyframes (@prefix,@name,@content) when (@prefix=moz) {
  @-moz-keyframes @name {
    @content();
  }
}
.keyframes (@prefix,@name,@content) when (@prefix=o) {
  @-o-keyframes @name {
    @content();
  }
}
.keyframes (@prefix,@name,@content) when (@prefix=webkit) {
  @-webkit-keyframes  @name{
    @content();
  }
}
.keyframes (@prefix,@name,@content) when (@prefix=all) {
  .keyframes(moz,@name,@content);
  .keyframes(o,@name,@content);
  .keyframes(webkit,@name,@content);
  .keyframes(def,@name,@content);
}

.keyframes(all, slide-right-up, {
  50%{
    width: 100%;
    height: 7px;
  }
  100%{
    width: 100%;
    height: 100%;
  }
});

ul{
  float: left;
}

.list{
  list-style: none;
  a{
    display: block;
    text-decoration: none;
    box-sizing: border-box;
    padding: 25px;
    transform-origin: 50% 50%;
    background: #ffffff;
    border-radius: 10px;
  }
}

.list-vertical{
  width: 100%;
  margin: 2em auto;
  li{
    margin: 1em auto;
    border-radius: 10px;
    &:first-child{
      margin-top: 0;
    }
  }
}

.list-horizontal{
  width: 100%;
  margin: 15px 3%;
  li{
    float: left;
    width: 20%;
    text-align: center;
  }
}

.list-hover-zoom-tilt{
  background: #0b090a;
  a{
    color: #8ad0bd;
    background: #2b2529;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    &:hover{
      background: #584b54;
      transform: scale(1.4) translate(15px, 0) perspective(700px) rotateY(30deg);
      box-shadow: 0 3px 5px 0 rgba(33,33,33,0.2), -4px 0 5px 0 rgba(33,33,33,0.3), 0 0 0 1px rgba(33,33,33,0.4), inset -5px 0 5px 0 rgba(33,33,33,0.5);
    }
    &:active{
      transform: scale(1.3) translate(10px, 0) rotateY(27deg);
    }
  }
}

.list-zoom{
  a{
    color: #2b2529;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover{
      transform: scale(1.02);
      box-shadow: 0 0 15px 0 rgba(33,33,33,0.2);
    }
    &:active{
      transform: scale(1.02);
      box-shadow: inset 0 0 3px 0 rgba(33,33,33,0.1);
    }
  }
}

.list-zoom-2{
  a{
    position: relative;
    border-left: 4px solid #988692;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    &:after{
      display: block;
      content: '';
      background: #fceef3;
      width: 0;
      height: 5px;
      position: absolute;
      z-index: -1;
      bottom: 0;
      left: 0;
      transition: width 0.4s ease, background 0.3s ease, height 0.4s ease;
    }
    &:hover{
      background: transparent;
      border-color: #65c2a7;
      transform: scale(1.2) translate(22px, 0);
      box-shadow: none;
      &:after{
        animation: slide-right-up 0.5s ease forwards;
        -webkit-animation-iteration-count: 1; /* Chrome, Safari, Opera */
        animation-iteration-count: 1;
      }
    }
    &:active{
      &:after{
        background: #f8dde6;
      }
    }
  }
}

.list-hover-zoom-tilt-forward{
  background: #372f34;
  a{
    background: #de5988;
    color: #330a18;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    &:hover{
      background: #b84588;
      transform: scale(1.5) translate(0, 3px) perspective(700px) rotateX(35deg);
      box-shadow: 0 1px 3px 0 rgba(33,33,33,0.6);
    }
    &:active{
      transform: scale(1.4) translate(0, 5px) perspective(700px) rotateX(20deg);
    }
  }
}
</style>
