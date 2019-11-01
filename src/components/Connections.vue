<template>
  <div>
    <h2 v-if="!selectedConnection">
      Manage connections
    </h2>
    <h2 v-if="selectedConnection" class="back-header" v-on:click="selectedConnection = null">
      <i class="fa fa-caret-left"></i>
      Back to all connections
    </h2>
    <div v-if="connections.length > 0 && selectedConnection === null" class="connections">
      <div class="connections__header">
        All connections
      </div>
      <ul class="connections__list">
        <li v-for="connection in connections"
          class="connections__item"
          :class="{'connections__item_error': connection.authorization_status !== 'success'}" v-on:click="openConnection(connection)">
          <div class="connection__icon" :class="'connection__icon_' + connection.provider"></div>
          <div>
            <div class="connections__item-name">{{connection.name}}</div>
            <div v-if="connection.authorization_status === 'success'" class="connections__item-date">
                connected on {{ connection.authorized_at | moment("L LT")}}
            </div>
          </div>
          <i class="fa fa-chevron-right"></i>
        </li>
      </ul>
    </div>

    <div v-if="selectedConnection !== null" class="connection-widget-wrapper">
      <Connection :connection="selectedConnection" :token="token"></Connection>
    </div>
    <div v-if="loading" class="spinner"></div>

    <div v-if="hasError">
      Something went wrong...
    </div>
  </div>
</template>

<script>
    import Connection from "./Connection";
    export default {
        name: "Connections",
        components: {Connection},
        data() {
            return {
                connections: [],
                loading: false,
                token: null,
                selectedConnection: null,
                hasError: null
            }
        },
        async mounted() {
            this.loading = true;
            try {
                this.token = await fetch('/workato-jwt').then(res => res.json());
                this.connections = await fetch('/workato-connections').then(res => res.json());
            }
            catch (e) {
                console.error(e);
                this.hasError = true;
            }
            finally {
                this.loading = false;
            }

        },
        methods: {
            openConnection(connection)  {
                this.selectedConnection = connection;
            }
        }
    }
</script>

<style scoped lang="scss">
  h2 {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
    border-bottom: 1px solid #DFDFDE;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  .back-header {
    .fa {
      margin-right: 10px;
    }

    font-size: 14px;
    margin-top: 3px;
    cursor: pointer;
  }

  .spinner {
    animation: spin .8s infinite linear;
    border-color: #CFCFCE rgba(200,200,200, 0.5) rgba(200,200,200, 0.5);
    border-radius: 50%;
    border-style: solid;
    border-width: 4px;
    display: block;
    height: 20px;
    vertical-align: middle;
    width: 20px;
    margin: 30px auto;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  .connections {
    border: 1px solid #DFDFDE;

    &__header {
      background: #F7F9FA;
      border-bottom: 1px solid #DFDFDE;
      padding: 10px;
      color: #637A87;
      text-transform: uppercase;
      font-weight: 600;
    }

    &__list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &__item {
      padding: 10px;
      border-bottom: 1px solid #DFDFDE;
      position: relative;
      display: flex;
      align-items: center;
      border-left: 2px solid transparent;
      cursor: pointer;

      .fa {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
      }

      &:hover {
        background: #f7f9fa;
      }



      &:last-child {
        border-bottom: none;
      }

      &_error {
        border-left: 2px solid #B6270A;
      }
    }

    &__item-name {
      font-weight: 600;
    }

    &__item-date {
      color: #92A3AD;
      font-size: 12px;
    }

  }

  .connection-widget-wrapper {
    border: 1px solid #DFDFDE;
    background: #F7F9FA;
    min-height: 200px;
  }

</style>