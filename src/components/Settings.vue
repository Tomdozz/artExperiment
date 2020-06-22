<template>
  <!--TO-DO: Create liste with dynamic objects for settins -->
  <div>
    <div id="dotSize">
      <label for="dotSize">Dot size</label>
      <input
        class="inputRange"
        type="range"
        id="dotSize"
        name="dotSize"
        min="0"
        max="30"
        v-model="dotSize"
      />
      <input
        class="textSettingInput"
        v-model="dotSize"
        placeholder="Change dot size"
      />
    </div>
    <div id="lineSize">
      <label for="lineSize">Line size</label>
      <input
        class="inputRange"
        type="range"
        id="lineSize"
        name="lineSize"
        min="0"
        max="30"
        v-model="lineSize"
      />
      <input
        class="textSettingInput"
        v-model="lineSize"
        placeholder="Change line size"
      />
    </div>

    <div id="easing">
      <label>Line easing</label>
      <input
        class="textSettingInput"
        v-model="easing"
        placeholder="Change line easing"
      />
    </div>

    <div id="colors">
      <div class="colorpicker" :style="{ background: lineColor }">
        <span>Line Color</span>
        <color-picker
          theme="light"
          :color="lineColor"
          :sucker-hide="false"
          :sucker-canvas="lineSuckerCanvas"
          :sucker-area="lineSuckerArea"
          @changeColor="changeLineColor"
          @openSucker="openLineSucker"
        />
      </div>
      <div class="colorpicker" :style="{ background: backgroundColor }">
        <span>Backgroind Color</span>
        <color-picker
          theme="light"
          :color="backgroundColor"
          :sucker-hide="false"
          :sucker-canvas="backgroundSuckerCanvas"
          :sucker-area="backgroundSuckerArea"
          @changeColor="changeBackgroundColor"
          @openSucker="openBackgroundSucker"
        />
      </div>
      <div class="colorpicker" :style="{ background: dotColor }">
        <span>Dot Color</span>
        <color-picker
          theme="light"
          :color="dotColor"
          :sucker-hide="false"
          :sucker-canvas="dotSuckerCanvas"
          :sucker-area="dotSuckerArea"
          @changeColor="changeDotColor"
          @openSucker="openDotSucker"
        />
      </div>
    </div>

    <div id="buttons">
      <button
        v-on:click="
          (...settings) =>
            this.saveSettings([
              dotSize,
              lineSize,
              lineColor,
              backgroundColor,
              dotColor,
              easing
            ])
        "
      >
        save settings
      </button>
    </div>

    <div id="help">
      <p>D: Add dot</p>
      <p>P: Reset line to mousePosition</p>
    </div>
  </div>
</template>

<script>
import colorPicker from "@caohenghu/vue-colorpicker";

export default {
  name: "Settings",
  components: {
    colorPicker
  },
  data() {
    return {
      dotSize: 15,
      lineSize: 2,
      easing: 0.01,
      settings: [],

      //lineColorSelector
      // eslint-disable-next-line prettier/prettier
      lineColor: '#9CFFFF',
      lineSuckerCanvas: null,
      lineSuckerArea: [],
      lineIsSucking: false,

      //backgroundColorSelector
      // eslint-disable-next-line prettier/prettier
      backgroundColor: '#6A6A6A',
      backgroundSuckerCanvas: null,
      backgroundSuckerArea: [],
      backgroundIsSucking: false,

      //dotColorSelector
      // eslint-disable-next-line prettier/prettier
      dotColor: '#9CFFFF',
      dotSuckerCanvas: null,
      dotSuckerArea: [],
      dotIsSucking: false
    };
  },
  methods: {
    saveSettings: function(_settings) {
      this.settings = _settings;
      // eslint-disable-next-line prettier/prettier
      this.$emit('settingsarray', this.settings);
    },
    changeLineColor(color) {
      this.lineColor = color.hex;
    },
    // eslint-disable-next-line no-unused-vars
    openLineSucker(isOpen) {},
    changeBackgroundColor(color) {
      this.backgroundColor = color.hex;
    },
    // eslint-disable-next-line no-unused-vars
    openBackgroundSucker(isOpen) {},
    changeDotColor(color) {
      this.dotColor = color.hex;
    },
    // eslint-disable-next-line no-unused-vars
    openDotSucker(isOpen) {}
  },
  computed: {
    getCurrentDotSize: function() {
      return " " + this.dotSize;
    },
    getLineDotSize: function() {
      return " " + this.lineSize;
    }
  }
};
</script>

<style lang="scss">
.colorpicker {
  // width: 210px;
  padding: 10px;
  display: inline-block;
}
.inputRange {
  width: 200px;
}
.textSettingInput {
  width: 50px;
}
</style>
