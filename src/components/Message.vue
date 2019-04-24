<template>
  <div class="message">
    <canvas id="message-canvas" ref="canvas" class="message-canvas"></canvas>
  </div>
</template>

<script>
  import {fabric} from 'fabric';
  import clipPath from '@/lib/clipPath';
  import canvasToImg from 'canvas-to-image';

  const OFFSET_X = 10;
  const OFFSET_Y = 10;

  const PROFILE_SIZE = 36;
  const PROFILE_SUB_SIZE = 15;

  const SAY_MAX_WIDTH =  200;
  const SAY_LEFT = 48;
  const SAY_TOP = 24;
  const SAY_TEXT_HPAD = 10;
  const SAY_TEXT_VPAD = 8;

  const fontFamily = "'Helvetica Neue', 'Apple SD Gothic Neo'";

  export default {
    name: 'Message',

    props: {
      profile: {
        type: Object,
        default: () => {},
      },
      says: {
        type: Array,
        default: () => [],
      }
    },

    data() {
      return {
        texts: [],
      }
    },

    created() {
      fabric.Image.prototype._render = clipPath;
    },

    mounted() {
      this.$nextTick(() => {
        this.init();
        this.updateProfile();
        this.update();
      });
    },

    watch: {
      profile() {
        this.updateProfile();
      },
      says() {
        this.update();
      }
    },

    methods: {
      init() {
        this.canvas = new fabric.Canvas(this.$refs.canvas, {
          backgroundColor: '#b5cbd7',
          selection: false,
        });

        this.nickname = new fabric.Text('', {
          left: OFFSET_X + PROFILE_SIZE + 9,
          top: OFFSET_Y + 2,
          fill: '#4c555a',
          fontSize: 13,
          fontFamily,
        });

        this.canvas.add(this.nickname);

        fabric.Image.fromURL('/static/img/say-arrow.png', img => {
          img.set({
            left: OFFSET_X + SAY_LEFT - 5,
            top: OFFSET_Y + SAY_TOP + 6,
            selectable: false,
          });
          img.scaleToWidth(14 / 2);
          img.scaleToHeight(18 / 2);

          this.arrow = img;

          this.canvas.add(this.arrow);
          this.arrow.moveTo(1);
        });
      },

      updateProfile() {
        this.nickname.text = this.profile.nickname;

        fabric.Image.fromURL(`/static/img/profiles/${this.profile.name}.jpg`, img => {
          img.set({
            left: OFFSET_X,
            top: OFFSET_Y,
            clipPath: new fabric.Path('M0-36c-26.28,0-36,9.72-36,36s9.72,36,36,36S36,26.28,36,0,26.28-36,0-36Z'),
          });
          img.scaleToWidth(PROFILE_SIZE, true);
          img.scaleToHeight(PROFILE_SIZE, true);

          this.canvas.remove(this.profileImg);
          this.profileImg = img;

          this.canvas.add(this.profileImg);
          this.profileImg.moveTo(1);
          this.canvas.renderAll();
        });

        this.canvas.remove(this.profileSub);

        if(this.profile.sub) {
          fabric.Image.fromURL(`/static/img/${this.profile.sub}.png`, img => {
            img.set({
              left: OFFSET_X + 25,
              top: OFFSET_Y + 20,
            });
            img.scaleToWidth(PROFILE_SUB_SIZE, true);
            img.scaleToHeight(PROFILE_SUB_SIZE, true);

            this.profileSub = img;

            this.canvas.add(this.profileSub);
            this.profileSub.moveTo(2);
            this.canvas.renderAll();
          });
        }
      },

      update() {
        const multiline = {};
        let lastSayTop = SAY_TOP;
        let maxWidth = 0;
        let objName = 'Text';

        this.texts.forEach(obj => {
          this.canvas.remove(obj);
        });

        this.says.forEach(say => {
          if(!say) return;

          let height;

          const test = new fabric.Text(say, {
            fontSize: 13,
            breakWords: true,
            fontFamily,
          });

          if(test.width > SAY_MAX_WIDTH) {
            objName = 'Textbox';
            multiline.width = SAY_MAX_WIDTH;
            multiline.breakWords = true;
          }

          const text = new fabric[objName](say, {
            left: OFFSET_X + SAY_LEFT + SAY_TEXT_HPAD,
            top: OFFSET_Y + lastSayTop + SAY_TEXT_VPAD + 1,
            fill: '#000',
            fontSize: 13,
            fontFamily,
            ...multiline,
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
            maxWidth = textBox.width;
          }

          this.canvas.add(textBox);
          this.canvas.add(text);

          this.texts.push(textBox, text);

          textBox.moveTo(2);
          text.moveTo(3);

          lastSayTop += height + 6;
        });

        this.canvas.forEachObject(obj => {
          obj.selectable = false;
        });

        this.canvas.setWidth((OFFSET_X * 2) + Math.max(
          SAY_LEFT + maxWidth,
          this.nickname.left + this.nickname.width)
        );
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
  }
</style>
