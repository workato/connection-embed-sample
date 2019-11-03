<template>
  <div v-if="opened">
    <div class="overlay"></div>
    <div class="modal">
      <i class="fa fa-close" v-on:click="close"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Modal",
        data() {
            return {
                opened: false
            }
        },
        methods: {
            open() {
               this.opened = true;
                document.addEventListener('click', this.handleDocumentClick, true);
            },

            close() {
                this.opened = false;
                document.removeEventListener('click', this.handleDocumentClick, true);
            },

            handleDocumentClick(event) {
                if (!this.opened) {
                    return;
                }


                if (event.target.closest('.modal')) {
                    return;
                }

                this.close()
            }
        }
    }
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .6);
  z-index: 9999;
}
  .modal {
    position: fixed;
    z-index: 10000;
    right: 0;
    top: 50px;
    bottom: 0;
    width: 600px;
    background: #fff;
    padding: 20px;
    overflow: auto;

    .fa {
      position: absolute;
      right: 25px;
      top : 25px;
      cursor: pointer;
    }
  }
</style>