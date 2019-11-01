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
      <iframe v-bind:src="iframeSrc" :style="{height: height}"></iframe>
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
                height: '100%'
            }
        },
        async mounted() {
            window.addEventListener('message', this.receiveMessage);

            const token = await fetch('/workato-jwt').then(res => res.json());

            this.isConnected = this.connection.authorization_status === 'success';
            this.iframeSrc = `${config.workatoOrigin}/direct_link/embedded/connections/${this.connection.id}?workato_dl_token=${token}`;
        },

        destroyed() {
            window.removeEventListener('message', this.receiveMessage);
        },

        methods: {
            receiveMessage(event) {
                const data = JSON.parse(event.data);

                switch (data.type) {
                    case 'heightChange':
                        this.height = data.payload.height + 'px';
                        break;
                    case 'connectionStatusChange':
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

    }

    &__title-status {
      font-size: 12px;
      position: relative;
      padding-left: 5px;
      color: #92A3AD;

      &:before {
        content: '';
        width: 3px;
        height: 3px;
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
      padding: 10px;
    }
  }

  iframe {
    width: 100%;
    border: 0;
  }
</style>