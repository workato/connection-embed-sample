<template>
  <div>
    <SubHeader>Integration</SubHeader>
    <div class="integration-page">
      <div class="integration-page__main">
        <ul class="list">
          <li class="list__item list__item_margin list__item_main" v-on:click="openConnections">
            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><rect fill="#108291" width="31.68" height="31.68" rx="1.44"/><path d="M8.127 17.465l2.294-2.294a3.063 3.063 0 0 1 2.25-.926c.897 0 1.661.323 2.294.97l.97-.97a3.102 3.102 0 0 1-.97-2.305c0-.883.305-1.629.915-2.24l2.272-2.282c.61-.625 1.36-.938 2.25-.938.883 0 1.629.305 2.24.916l1.62 1.61c.626.61.938 1.356.938 2.239 0 .882-.309 1.632-.926 2.25l-2.295 2.294a3.063 3.063 0 0 1-2.25.926c-.897 0-1.661-.323-2.294-.97l-.97.97c.647.633.97 1.401.97 2.306 0 .882-.305 1.628-.915 2.239l-2.272 2.282c-.61.625-1.36.938-2.25.938-.882 0-1.628-.305-2.239-.915l-1.621-1.61c-.625-.611-.938-1.357-.938-2.24 0-.882.309-1.632.927-2.25zm9.308-4.72l.204-.21c.114-.117.193-.196.237-.237.044-.04.114-.095.21-.165a.889.889 0 0 1 .585-.182c.294 0 .544.103.75.309.205.205.308.455.308.75a.885.885 0 0 1-.182.585c-.07.095-.125.165-.165.209-.04.044-.12.123-.237.237l-.21.204c.22.228.486.342.794.342.302 0 .552-.1.75-.298l2.295-2.294c.205-.206.308-.456.308-.75 0-.287-.102-.533-.308-.739l-1.622-1.61a1.065 1.065 0 0 0-.75-.298c-.294 0-.544.103-.75.309L17.38 11.19a1.021 1.021 0 0 0-.309.75c0 .308.122.577.364.805zm-7.809 7.709l1.622 1.61c.206.191.455.287.75.287.301 0 .551-.099.75-.298l2.272-2.283a1.02 1.02 0 0 0 .308-.75 1.07 1.07 0 0 0-.364-.805l-.204.21a6.731 6.731 0 0 1-.237.237c-.044.04-.114.096-.21.166a.884.884 0 0 1-.28.143 1.122 1.122 0 0 1-.304.039c-.294 0-.544-.103-.75-.31a1.022 1.022 0 0 1-.309-.749c0-.11.013-.211.039-.303a.882.882 0 0 1 .143-.282c.07-.095.125-.165.166-.21.04-.043.12-.122.237-.237l.21-.203a1.05 1.05 0 0 0-.794-.353 1.02 1.02 0 0 0-.75.308l-2.294 2.294a1.021 1.021 0 0 0-.31.75c0 .287.104.534.31.739z" fill="#FFF" fill-rule="nonzero"/></g></svg>
            Manage connections
            <i class="fa fa-chevron-right"></i>
          </li>
          <li class="list__item list__item_main">
            <svg width="32" height="32" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg"><g fill="#1060C2" fill-rule="evenodd"><path fill-rule="nonzero" d="M-2-2h23v23H-2z"/><path d="M9.5.875A8.625 8.625 0 1 0 18.125 9.5 8.635 8.635 0 0 0 9.5.875zm5.383 13.11a7.004 7.004 0 0 1-10.766 0 .18.18 0 0 1 .052-.274c.94-.463 1.91-.864 2.904-1.2l.484-.178a.694.694 0 0 0 .343-.52c.12-.426.055-.883-.179-1.26C7.118 9.89 6.53 9.07 6.53 7.022A2.905 2.905 0 0 1 9.5 3.859a2.905 2.905 0 0 1 2.972 3.162c0 2.05-.59 2.869-1.192 3.533a1.577 1.577 0 0 0-.18 1.259c.027.218.154.41.344.52l.485.179a23.91 23.91 0 0 1 2.902 1.198c.047.027.08.072.09.125a.179.179 0 0 1-.038.15z" fill="#F7F9FA"/></g></svg>
            Access control
          </li>
          <li class="list__item list__item_secondary">
            <div class="list__item-header">
              Settings
            </div>
            <div class="list__item-content">
              Edit and manage integration settings
            </div>
            <i class="fa fa-chevron-right"></i>
          </li>
          <li class="list__item list__item_secondary">
            <div class="list__item-header">
              Permissions
            </div>
            <div class="list__item-content">
              View and edit permissions for users
            </div>
            <i class="fa fa-chevron-right"></i>
          </li>
        </ul>
      </div>
      <div class="integration-page__aside">
        <img src="../assets/integration_page_aside.png"/>
      </div>
    </div>

   <Modal ref="connectionModal">
     <Connections></Connections>
   </Modal>
  </div>
</template>

<script>
    import SubHeader from "../components/SubHeader";
    import Modal from "../components/Modal";
    import Connections from "../components/Connections";
    export default {
        name: "Integration",
        components: {Connections, Modal, SubHeader},
        mounted() {
            document.addEventListener('click', this.handleDocumentClick, true);
        },

        destroyed() {
            document.removeEventListener('click', this.handleDocumentClick, true);
        },

        methods: {
            openConnections() {
                this.$refs.connectionModal.open();
            }
        }
    }

</script>

<style lang="scss" scoped>
  .integration-page {
    margin: 40px 70px 0;
    display: flex;
    justify-content: space-between;

    &__aside {
      width: 300px;
      margin-left: 26px;

      > img {
        width: 100%;
      }
    }

    &__main {
      margin-top: 5px;
      flex: 1;
    }
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;

    &__item {
      border: 1px solid #DBDBDB;
      border-bottom: none;
      padding: 16px;
      cursor: pointer;
      position: relative;

      &_main {
        font-size: 18px;
        display: flex;
        align-items: center;

        svg {
          margin-right: 10px;
        }
      }

      &_secondary {
        padding-left: 58px;
      }

      &:last-child,
      &_margin {
        margin-bottom: 16px;
        border-bottom: 1px solid #DBDBDB;
      }

      &:hover {
        background: #f7f9fa;
      }

      .fa {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
      }
    }

    &__item-header {
      font-weight: 600;
      margin-bottom: 10px;
    }
  }

</style>