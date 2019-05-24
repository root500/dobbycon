<template>
  <div id="app" class="app">
    <section class="window">
      <div class="window-inner">
        <header class="header">
          <div class="manage-btns">
            <span class="manage-btn manage-btn--close"></span>
            <span class="manage-btn manage-btn--minimize"></span>
            <span class="manage-btn manage-btn--maximize"></span>
          </div>

          <div class="header-content">
            <div class="members">
              <img2x src="/members.png"/>
            </div>
            <div class="meta">
              <h1 class="meta-title">{{ meta.title }}</h1>
              <div class="meta-members">
                <img2x src="/user.png"/>{{ meta.members }}
              </div>
            </div>
          </div>
        </header>

        <div class="content">
          <message ref="message" :profile="profiles[parseInt(profile)]" :says="says"/>
        </div>

        <div class="profiles">
          <template v-for="(item, index) in profiles">
            <label>
              <input v-model="profile" type="radio" :value="index" :true-value="index === profile">
              <span>{{ item.label }}</span>
            </label>
          </template>
        </div>
        <div class="controls">
          <textarea title="message" v-model="saysText" @change="isEdited = true" cols="30" rows="10" class="controls-text"></textarea>
          <button @click="saveToImg" class="controls-save">저장</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Message from './components/Message';

  export default {
    name: 'App',
    components: {
      Message,
    },

    data() {
      return {
        isEdited: false,

        meta: {
          title: '명품도비콘 생성기',
          members: 23,
        },

        profiles: [
          { name: 'dobby', label: '도비', nickname: 'Stereo', say: '도비는 이제 자유에요', },
          { name: 'dugi', label: '더기', nickname: '더기더기', say: '더기도 퇴근하고 싶당', sub: 'card' },
          { name: 'viny', label: '비니', nickname: '서경빈', say: '핵도비 나와라', sub: 'master' },
          { name: 'poo', label: '푸라맹', nickname: '안티푸라면', say: '살려죠' },
        ],

        profile: '0',
        saysText: '도비는 이제 자유에요',
      }
    },

    computed: {
      says() {
        return this.saysText.split('\n');
      }
    },

    watch: {
      profile(val) {
        const profile = this.profiles[parseInt(val)];

        if(!this.isEdited) {
          this.saysText = profile.say;
        }

        gtag('event', 'changeProfile', {
          'event_category': profile.name
        });
      }
    },

    methods: {
      saveToImg() {
        gtag('event', 'save', {
          'event_category': this.says[0],
        });

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
    font-family: 'Helvetica Neue', 'Apple SD Gothic Neo', sans-serif;
  }
  h1 {
    margin: 0;
  }
  img {
    max-width: 100%;
    height: auto;
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
      display: flex;
      flex-direction: column;
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
          border-color: darken($color, 7%);
        }
      }
    }

    .content {
      flex: 1;
    }

    .profiles {
      padding: 10px;
      border-top: 1px solid #e2e2e2;
      background-color: #f7f7f7;
      font-size: 1.2rem;

      > label {
        margin-right: 10px;
      }
    }

    .controls {
      position: relative;
      border-top: 1px solid #e2e2e2;
      background-color: $white;
      height: 93px;

      &-text {
        border: 0;
        padding: 10px;
        padding-right: (80px + 12px + 15px);
        width: 100%;
        height: 100%;
        font-size: 1.4rem;
        box-sizing: border-box;
        resize: none;

        &:focus {
          outline: 0;
        }
      }
      &-save {
        position: absolute;
        right: 14px;
        top: 12px;
        bottom: 12px;
        width: 80px;
        font-size: 1.4rem;
        text-align: center;
        background-color: #fee333;
        border: 1px solid #f1d730;
        border-radius: 4px;
        -webkit-appearance: none;
        cursor: pointer;
      }
    }
  }
</style>
