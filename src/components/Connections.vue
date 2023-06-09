<template>
  <div class="full-height no-scroll-padding">
    <h2 v-if="!selectedConnection">
      Manage connections
    </h2>
    <h2 v-if="selectedConnection" class="back-header" v-on:click="backToConnections()">
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
          :class="{'connections__item_disconnected': connection.authorization_status !== 'success', }" v-on:click="openConnection(connection)">
          <div class="connections__content">
            <div class="connection__icon" :class="'connection__icon_' + connection.provider"></div>
            <div>
              <div class="connections__item-name">{{connection.name}}</div>
              <div v-if="connection.authorization_status === 'success'" class="connections__item-date">
                  connected on {{ connection.authorized_at | moment("L LT")}}
              </div>
            </div>
          </div>
          <div class="connections__item-status">Access requested</div>
          <i class="fa fa-chevron-right"></i>
        </li>
      </ul>
    </div>

    <div v-if="selectedConnection !== null" class="connection-widget-wrapper full-height">
      <Connection :connection="selectedConnection"></Connection>
    </div>
    <div v-if="loading && connections.length === 0" class="spinner"></div>

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
                selectedConnection: null,
                hasError: null
            }
        },
        async mounted() {
            this.getConnections();
        },
        methods: {
            openConnection(connection)  {
                this.selectedConnection = connection;
            },

            backToConnections() {
                this.selectedConnection = null;
                this.getConnections();
            },

            async getConnections() {
                this.loading = true;
                try {
                    this.connections = await fetch('/workato-connections').then(res => res.json());
                    this.connections.sort((a, b) => {
                        if (a.authorization_status === b.authorization_status) {
                            return 0;
                        }

                        if (a.authorization_status === 'success') {
                            return 1;
                        }

                        return -1;
                    })
                }
                catch (e) {
                    console.error(e);
                    this.hasError = true;
                }
                finally {
                    this.loading = false;
                }
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
      justify-content: space-between;
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

      &_disconnected {
        border-left: 4px solid #E67009;
        .connections__item-status {
          display: block;
        }
      }
    }

    &__item-name {
      font-weight: 600;
    }

    &__item-date {
      color: #92A3AD;
      font-size: 12px;
    }

    &__content {
      display: flex;
      align-items: center;
    }

    &__item-status {
      display: none;
      color: #E67009;
      font-size: 12px;
      padding: 0 25px 0 10px;
      position: relative;

      &:before {
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        top: 5px;
        left: 0;
        background: #E67009;
        display: block;
        position: absolute;
      }
    }

  }

  .connection-widget-wrapper {
    border: 1px solid #DFDFDE;
    background: #F7F9FA;
    min-height: 200px;
  }

  .full-height {
    height: 100%;
  }

  .no-scroll-padding {
    overflow: hidden;
    padding-bottom: 100px;
  }
</style>
