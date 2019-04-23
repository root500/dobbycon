<template>
  <div id="app" class="app">
    <div class="dummy"></div>
    <section class="window">
      <div class="window-inner">
        <header class="header">
          <div class="manage-btns">
            <span class="manage-btn manage-btn--close"></span>
            <span class="manage-btn manage-btn--minimize"></span>
            <span class="manage-btn manage-btn--maximize"></span>
          </div>

          <div class="header-content">
            <div class="members"></div>
            <div class="meta">
              <h1 class="meta-title">{{ meta.title }}</h1>
              <div class="meta-members">
                <img2x src="/user.png"/>{{ meta.members }}
              </div>
            </div>
          </div>
        </header>
        <div class="content">
          <message ref="message"/>
        </div>
        <div class="controls">
          <button @click="saveToImg">Save</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Message from './components/message';

  export default {
    name: 'App',
    components: {
      Message,
    },

    data() {
      return {
        meta: {
          // title: '개발 못하는 잉여들 잡담방',
          title: '명품 도비콘 제작기',
          members: 23,
        },
      }
    },

    methods: {
      saveToImg() {
        this.$refs.message.save();
      },
    }
  }
</script>

<style lang="scss">
  @import "assets/lib";
  @import "~normalize.css";

  html {
    font-size: 62.5%;
  }
  body {
    position: relative;
    font-family: 'Helvetica Neue', 'Apple SD Gothic Neo';
  }
  h1 {
    margin: 0;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .dummy {
    display: none;
    position: absolute;
    left: 20px;
    top: 45px;
    background: url("/static/screenshot.png") no-repeat;
    width: 100%;
    height: 100%;
    background-size: (1460px / 2) (1636px / 2);
    opacity: 0.5;
    z-index: 1;

    &:hover {
      opacity: 0;
    }
  }
  .app {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .window {
    display: flex;
    align-items: stretch;
    position: relative;
    width: 320px;
    height: 480px;
    border-radius: 7px;
    border: 1px solid rgba($black, 0.15);
    background-color: $white;
    box-shadow: 0 10px 35px rgba($black, 0.25);

    &:before {
      position: absolute;
    }

    &-inner {
      flex: 1;
      overflow: hidden;
      border-radius: 6px;
      background-color: $win-bg;
    }

    .header {
      height: (90px - 1px);
      background-color: #f9f9f9;
      border-bottom: 1px solid #e2e2e2;

      &-content {
        padding-left: 12px;
        padding-top: 34px;
        display: flex;
      }
    }

    .members {
      width: 44px;
      height: 44px;
    }
    .meta {
      margin-left: 12px;

      &-title {
        margin-top: 1px;
        font-size: 1.5rem;
        font-weight: normal;
      }
      &-members {
        margin-left: 1px;
        margin-top: 12px;
        color: #7c7c7c;
        font-size: 1.2rem;

        > img {
          display: inline-block;
          margin-right: 4px;
        }
      }
    }

    .manage-btns {
      position: absolute;
      left: 8px;
      top: 5px;
      display: flex;
    }
    .manage-btn {
      $colors: (
        close: #ff554e,
        minimize: #ffb62a,
        maximize: #24c339,
      );
      $size: 12px;

      position: relative;
      width: $size;
      height: $size;
      margin-right: 8px;
      border-radius: $size;
      border: 1px solid;
      box-sizing: border-box;

      @each $name, $color in $colors {
        &--#{$name} {
          background-color: $color;
          border-color: darken($color, 5%);
        }
      }
    }

    .content {
      .message {
        margin-left: 10px;
        margin-top: 15px;

        /*margin-top: 184px;*/
      }
    }
  }
</style>
