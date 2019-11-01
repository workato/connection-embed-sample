<template>
  <div class="app">
    <div class="header">
      <div ref="mainMenuToggle"
        class="menu-btn"
        :class="{'menu-btn_active': mainMenuOpened}"
        @click="mainMenuOpened = !mainMenuOpened">
        <div class="menu-btn__line"></div>
        <div class="menu-btn__line"></div>
        <div class="menu-btn__line"></div>
      </div>
      <Menu class="main-menu" :opened.sync="mainMenuOpened" :toggleElem="$refs.mainMenuToggle">
        <div class="main-menu__items" @click="mainMenuOpened = false">
          <RouterLink class="main-menu__item main-menu__item_home" to="/" exact-active-class="main-menu__item_active">
            Home
          </RouterLink>
          <div class="main-menu__item main-menu__item_campaigns">
            Campaigns
          </div>
          <div class="main-menu__item main-menu__item_content">
            Content
          </div>
          <div class="main-menu__item main-menu__item_assets">
            Assets
          </div>
          <div class="main-menu__item main-menu__item_requests">
            Requests
          </div>
          <div class="main-menu__item main-menu__item_analytics">
            Analytics
          </div>
          <RouterLink class="main-menu__item main-menu__item_integration" to="/integration" active-class="main-menu__item_active">
            Integration
          </RouterLink>
        </div>
        <img class="main-menu__footer" src="./assets/menu_footer.png"/>
      </Menu>
      <router-link class="logo" to="/"></router-link>
      <Search/>

      <svg class="header__icon" width="12" height="18">
        <g fill="none" fill-rule="evenodd">
          <path d="M-1242-15H198v1062h-1440z"/>
          <path d="M11.873 6.998a.35.35 0 0 0-.311-.19H6.394L7.7.928a.35.35 0 0 0-.627-.28L.067 10.455a.35.35 0 0 0 .285.556H5.52L4.214 16.89a.35.35 0 0 0 .627.28l7.006-9.808a.35.35 0 0 0 .026-.364z" fill="#FFF"/>
        </g>
      </svg>

      <div class="user">
        John Connor
        <div class="user__icon">
          JC
        </div>
      </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Search from '@/components/Search';
  import Menu from "@/components/Menu";

  export default {
    components: {
      Menu,
      Search
    },

    data() {
      return {
        mainMenuOpened: false,
        userMenuOpened: false
      }
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #fff;
    color: #37434C;
    font-size: 14px;
  }

  body,
  button {
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
  }

  body, html {
    height: 100%;
  }

  .app {
    height: 100%;
    display: flex;
    flex-direction: column;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .header {
    background: #242E42;
    display: flex;
    align-items: center;
    position: relative;
    padding-right: 20px;
    flex: 0 0 auto;

    &__icon {
      margin-left: 10px;
    }
  }

  .content {
    flex: 1 1 auto;
  }

  .menu-btn {
    background: #131313;
    position: relative;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    flex: 0 0 auto;

    &__line {
      background: #fff;
      height: 3px;
      border-radius: 2px;
      width: 20px;
      transition: transform .3s ease, opacity .3s ease;

      & + & {
        margin-top: 3px;
      }

      .menu-btn_active & {
        &:first-child {
          transform: translateY(6px) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:last-child {
          transform: translateY(-6px) rotate(-45deg);
        }
      }
    }
  }

  .main-menu {
    &__items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 25px;
    }

    &__item {
      min-height: 40px;
      padding: 58px 5px 5px;
      cursor: pointer;
      background-repeat: no-repeat;
      background-position: center 5px;
      background-size: auto 45px;
      text-align: center;
      font-size: 13px;

      &,
      &:link,
      &:visited,
      &:hover,
      &:active {
        text-decoration: none;
      }

      &,
      &:link,
      &:visited {
        color: #50636d;
      }

      &.main-menu__item_active,
      &:hover,
      &:active {
        color: #0085FF;
      }

      &_home {
        background-image: url("./assets/home_icon.png");

        &.main-menu__item_active {
          background-image: url("./assets/home_icon_active.png");
        }
      }

      &_campaigns {
        background-image: url("./assets/campaigns_icon.png");
      }

      &_content {
        background-image: url("./assets/content_icon.png");
      }

      &_assets {
        background-image: url("./assets/assets_icon.png");
      }

      &_requests {
        background-image: url("./assets/requests_icon.png");
      }

      &_analytics {
        background-image: url("./assets/analytics_icon.png");
      }

      &_integration {
        background-image: url("./assets/integration_icon.png");

        &.main-menu__item_active {
          background-image: url("./assets/integration_icon_active.png");
        }
      }
    }

    &__footer {
      margin: 35px 0 5px 10px;
      display: block;
      width: 209px;
      height: 18px;
      cursor: pointer;
    }
  }

  .logo {
    margin-left: 20px;
    width: 150px;
    margin-right: auto;
    height: 29px;
    background: url("./assets/logo.png") center / contain no-repeat;
    flex: 0 0 auto;
  }

  .user {
    margin-left: 10px;
    color: #D8D8D8;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    width: 150px;
    text-align: right;

    &__icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      color: #617783;
      background: #D8D8D8;
      text-align: center;
      margin-left:10px;
    }
  }

  .button {
    cursor: pointer;
    background: #34373E;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border: none;
    padding: 10px 12px;
    border-radius: 2px;

    &_link {
      &:link,
      &:visited,
      &:hover,
      &:active {
        text-decoration: none;
      }
    }

    &_block {
      display: block;
      width: 100%;
      text-align: left;
    }

    .fas {
      margin-right: 5px;
    }
  }

  .connection {
    &__icon {
      width: 32px;
      height: 32px;
      background-position: center;
      background-size: cover;
      margin-right: 10px;

      &_box {
        background-image: url("assets/providers/box.svg");
      }

      &_salesforce {
        background-image: url("assets/providers/salesforce.svg");
      }

      &_zendesk {
        background-image: url("assets/providers/zendesk.svg");
      }

      &_jira {
        background-image: url("assets/providers/jira.svg");
      }

      &_marketo {
        background-image: url("assets/providers/marketo.svg");
      }

      &_hubspot {
        background-image: url("assets/providers/hubspot.svg");
      }
    }
  }
</style>
