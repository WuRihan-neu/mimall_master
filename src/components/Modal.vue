<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask">
      </div>
      <div class="modal-dialog">
          <div class="modal-header">
              <span>{{title}}</span>
              <a href="javascript:;" class="icon-close" v-on:click="$emit('cancel')"></a>
          </div>
          <div class="modal-body">
              <slot name="body"></slot>
          </div>
          <div class="modal-footer">
              <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
              <a href="javascript:;" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
              <div class="btn-group"  v-if="btnType==3" >
                  <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
                  <a href="javascript:;" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
              </div>
          </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
    name:'modal',
    props:{
        // 弹框类型主要分为小small，中middle，大large，表单form
        modalType:{
            type: String,
            default:'form'
        },
        // 标题
        title: String,
        // 按钮，类型：1确认2取消3兼具
        btnType: String,
        sureText: {
            type: String,
            default: '确认'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        showModal: Boolean       
    }
}
</script>
<style lang="scss">
@import './../assets/css/mixin.scss'; 
@import './../assets/css/config.scss'; 
@import './../assets/css/modal.scss';  
</style>