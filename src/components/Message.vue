<template>
  <div class="message">
    <canvas id="message-canvas" ref="canvas" class="message-canvas"></canvas>
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
        default: () => [],
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

    watch: {
      says() {
        this.$nextTick(this.draw);
      }
    },

    methods: {
      draw() {

        const OFFSET_X = 10;
        const OFFSET_Y = 10;

        const PROFILE_SIZE = 36;

        const SAY_LEFT = 48;
        const SAY_TOP = 24;
        const SAY_TEXT_HPAD = 10;
        const SAY_TEXT_VPAD = 8;

        const fontFamily = "'Helvetica Neue', 'Apple SD Gothic Neo'";
        const nickname = new fabric.Text(this.nickname);

        let lastSayTop = SAY_TOP;
        let maxWidth = 0;

        let profile;
        let arrow;

        this.canvas = new fabric.Canvas(this.$refs.canvas, {
          backgroundColor: '#b5cbd7',
          selection: false,
        });

        fabric.Image.fromURL(`/static/img/${this.profile}.jpg`, img => {
          profile = img;
          profile.set({
            left: OFFSET_X,
            top: OFFSET_Y,
          });
          profile.scaleToWidth(PROFILE_SIZE);
          profile.scaleToHeight(PROFILE_SIZE);

          this.canvas.add(profile);
        });

        nickname.set({
          left: OFFSET_X + PROFILE_SIZE + 9,
          top: OFFSET_Y + 2,
          fill: '#4c555a',
          fontSize: 13,
          fontFamily,
        });

        this.canvas.add(nickname);

        fabric.Image.fromURL('/static/img/say-arrow.png', img => {
          arrow = img;
          arrow.set({
            left: OFFSET_X + SAY_LEFT - 6,
            top: OFFSET_Y + SAY_TOP + 6,
            selectable: false,
          });
          arrow.scaleToWidth(14 / 2);
          arrow.scaleToHeight(18 / 2);

          this.canvas.add(arrow);
          arrow.moveTo(1);
        });

        this.says.forEach(say => {
          let height;

          const text = new fabric.Text(say, {
            left: OFFSET_X + SAY_LEFT + SAY_TEXT_HPAD,
            top: OFFSET_Y + lastSayTop + SAY_TEXT_VPAD + 1,
            fill: '#000',
            fontSize: 13,
            fontFamily,
          });

          height = parseInt(text.height) + SAY_TEXT_VPAD * 2;

          const textBox = new fabric.Rect({
            left: OFFSET_X + SAY_LEFT,
            top: OFFSET_Y + lastSayTop,
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

          if(maxWidth < textBox.width) {
            console.log(textBox.width);
            maxWidth = textBox.width;
          }

          this.canvas.add(textBox);
          this.canvas.add(text);

          textBox.moveTo(2);
          text.moveTo(3);

          lastSayTop += height + 6;
        });

        this.canvas.forEachObject(obj => {
          obj.selectable = false;
        });

        this.canvas.setWidth((OFFSET_X * 2) + SAY_LEFT + maxWidth);
        this.canvas.setHeight((OFFSET_Y * 2) + lastSayTop);
        this.canvas.renderAll();
      },

      save() {
        canvasToImg('message-canvas', {
          name: this.says[0],
          type: 'png'
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../assets/lib";

  .message {
    display: flex;

    &-canvas {
      width: 100%;
      height: 100%;
    }

    &-downloader {
      display: none;
    }
  }
</style>
