<template>
  <div class="message">
    <canvas id="message-canvas" ref="canvas" class="message-canvas" height="300"></canvas>
  </div>
</template>

<script>
  import {fabric} from 'fabric';
  import canvasToImg from 'canvas-to-image';

  export default {
    name: 'Message',

    props: {
      profile: {
        type: String,
        default: 'dobby',
      },
      nickname: {
        type: String,
        default: 'Stereo',
      },
      says: {
        type: Array,
        default: () => [
          '도비는 이제 자유에요',
          '넵 도비',
          '???',
          '월월월',
        ],
      }
    },

    data() {
      return {
        canvas: null,
      }
    },

    created() {
    },

    mounted() {
      this.$nextTick(this.draw);
    },

    methods: {
      draw() {
        const PROFILE_SIZE = 36;

        const SAY_LEFT = 48;
        const SAY_TOP = 24;
        const SAY_TEXT_HPAD = 10;
        const SAY_TEXT_VPAD = 8;

        const fontFamily = "'Helvetica Neue', 'Apple SD Gothic Neo'";

        let lastSayTop = SAY_TOP;

        const nickname = new fabric.Text(this.nickname);

        let profile;
        let arrow;

        this.canvas = new fabric.Canvas(this.$refs.canvas, {
          backgroundColor: '#b5cbd7',
          selection: false,
        });

        fabric.Image.fromURL(`/static/img/${this.profile}.jpg`, img => {
          profile = img;
          profile.set({
            left: 0,
            top: 0,
          });
          profile.scaleToWidth(PROFILE_SIZE);
          profile.scaleToHeight(PROFILE_SIZE);

          this.canvas.add(profile);
        });

        nickname.set({
          left: PROFILE_SIZE + 9,
          top: 2,
          fill: '#4c555a',
          fontSize: 13,
          fontFamily,
        });

        this.canvas.add(nickname);

        fabric.Image.fromURL('/static/img/say-arrow.png', img => {
          arrow = img;
          arrow.set({
            left: SAY_LEFT - 6,
            top: SAY_TOP + 6,
          });
          arrow.scaleToWidth(14 / 2);
          arrow.scaleToHeight(18 / 2);

          this.canvas.add(arrow);
          arrow.moveTo(1);
        });

        this.says.forEach(say => {
          let height;

          const text = new fabric.Text(say, {
            left: SAY_LEFT + SAY_TEXT_HPAD,
            top: lastSayTop + SAY_TEXT_VPAD + 1,
            fill: '#000',
            fontSize: 13,
            fontFamily,
          });

          height = parseInt(text.height) + SAY_TEXT_VPAD * 2;

          const textBox = new fabric.Rect({
            left: SAY_LEFT,
            top: lastSayTop,
            width: parseInt(text.width) + SAY_TEXT_HPAD * 2,
            height,
            fill: '#fff',
            rx: 3,
            ry: 3,
            shadow: new fabric.Shadow({
              blur: 0,
              color: 'rgba(0,0,0, 0.1)',
              offsetX: 0,
              offsetY: 1,
            }),
          });

          this.canvas.add(textBox);
          this.canvas.add(text);

          textBox.moveTo(2);
          text.moveTo(3);

          lastSayTop += height + 6;
        });

        this.canvas.forEachObject(obj => {
          obj.selectable = false;
        });

        this.canvas.renderAll();
      },

      save() {
        canvasToImg('message-canvas', {
          name: this.says[0],
          type: 'png'
        });
        // const downloader = this.$refs.downloader;
        //
        // downloader.download = "image.png";
        // downloader.href = this.$refs.canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../assets/lib";

  .message {
    display: flex;

    &-profile {
      $size: 36px;

      overflow: hidden;
      width: $size;
      height: $size;
      mask-image: url(/static/img/profile-mask.png);
      mask-size: contain;
      box-shadow: inset 0 0 5px 1px rgba($black, 0.3);
    }

    &-downloader {
      display: none;
    }
  }
</style>
