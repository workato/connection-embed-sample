<template>
  <div>
    <div class="widget__title">
      <div class="connection__icon" :class="'connection__icon_' + connection.provider"></div>
      <div>
        <div class="widget__title-name">
          {{connection.name}}
        </div>
        <div class="widget__title-status" :class="{'widget__title-status_success': isConnected}">
          {{ isConnected ? 'Connected' : 'Disconnected'}}
        </div>
      </div>
    </div>
    <div class="widget__content">
      <div v-if="hideIframe" class="spinner"></div>
      <iframe v-bind:src="iframeSrc" :style="{height: height, visibility: hideIframe ? 'hidden' : 'visible'}"></iframe>
    </div>
  </div>
</template>

<script>
    import {config} from '../config';

    export default {
        name: "Connection",
        props: {
            connection: Object
        },
        data() {
            return {
                isConnected: false,
                iframeSrc: null,
                height: '100%',
                hideIframe: true
            }
        },
        async mounted() {
            window.addEventListener('message', this.receiveMessage);
            this.isConnected = this.connection.authorization_status === 'success';

            const token = await fetch('/workato-jwt').then(res => res.json());
            this.iframeSrc = `${config.workatoOrigin}/direct_link/embedded/connections/${this.connection.id}?workato_dl_token=${token}`;
            this.hideIframe = false;
        },

        destroyed() {
            window.removeEventListener('message', this.receiveMessage);
        },

        methods: {
            receiveMessage(event) {
                let data;
                if(typeof event.data !== 'object') {
                  data = JSON.parse(event.data);
                } else {
                  data = event.data;
                }

                switch (data.type) {
                    case 'heightChange':
                        this.height = data.payload.height + 'px';
                        break;
                    case 'connectionStatusChange':
                        this.hideIframe = false;
                        this.isConnected = data.payload.connected;
                        break;
                    case 'error':
                        console.log(data.payload.message);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  .widget {
    &__title {
      padding: 10px;
      display: flex;
    }

    &__title-name {
      font-size: 18px;
      font-weight: 600;
    }

    &__title-status {
      font-size: 12px;
      position: relative;
      padding-left: 10px;
      color: #92A3AD;

      &:before {
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        top: 50%;
        left: 0;
        background: #92A3AD;
        display: block;
        position: absolute;
        transform: translateY(-50%);
      }

      &_success {
        color: #5aa028;

        &:before {
          background: #5aa028;
        }
      }
    }

    &__content {
      padding: 10px 10px 0;
      position: relative;

      .spinner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }

    &__content-loading {
      padding-top: 10px;
    }
  }

  .connection__icon {
    width: 40px;
    height: 40px;
  }

  iframe {
    width: 100%;
    border: 0;
  }
</style>
