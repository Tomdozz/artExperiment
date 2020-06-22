<template>
  <div class="">
    <button v-on:click="clearWaypoints">Clear waypoints</button>
    <button v-on:click="clearDrawing">Clear drawing</button>
    <button v-on:click="clearDots">Clear dots</button>
    <button v-on:click="saveCanvas">Save canvas</button>
    <button v-on:click="toggleSettings">Open settings</button>
    <transition name="expand">
      <div v-if="showSettings" class="settingsOverlay">
        <div class="close" v-on:click="toggleSettings"></div>
        <div class="controls">
          <Settings @settingsarray="getSettings" />
          {{ settingsArray }}
        </div>
      </div>
    </transition>
    <div class="drawboard" id="p5Canvas"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import waypoints from "@/js/Learn.js";
import Settings from "@/components/Settings.vue";
export default {
  name: "Home",

  components: {
    Settings
  },
  data() {
    return {
      message: "",
      radar: "",
      settings: "",
      waypointsVue: waypoints,
      settingsArray: [],
      showSettings: false
    };
  },
  mounted() {
    // Thansk to: https://github.com/mitsuyacider/p5VueDemo
    this.radar = "";
    this.radar = require("@/js/Learn.js");
    const P5 = require("p5");
    new P5(this.radar.main, "radar");
    this.radar.setDelegate(this.callbackOnP5);
  },
  // NOTE: Add callback method
  methods: {
    callbackOnP5: function(timeStr) {
      this.message = timeStr;
    },
    clearWaypoints: function() {
      this.radar.clearWaypoints();
    },
    clearDots: function() {
      this.radar.clearDots();
    },
    clearDrawing: function() {
      this.radar.clearDrawing();
      //console.log(this.radar.getWaypoints());
      //this.waypointsVue = this.radar.waypoints;
    },
    saveCanvas: function() {
      this.radar.saveCanvas();
    },
    getSettings(value) {
      this.settingsArray = value;
      this.radar.setSettings(this.settingsArray);
    },
    toggleSettings() {
      this.showSettings = !this.showSettings;
    }
  }
};
</script>
<style scoped lang="scss">
.controls {
  display: inline-block;
  //width: 20%;
}
.drawboard {
  display: inline-block;
  //width: 80%;
}
.expand-enter-active {
  animation: bounce-in 0.5s;
}
.expand-leave-active {
  animation: bounce-in 0.5s reverse;
}
.settingsOverlay {
  position: fixed;
  width: 60%;
  height: 70%;
  background-color: white;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.settingsBtn {
  position: relative;
  left: 90%;
  transform: translate(-50%, 0%);
  cursor: pointer;
}
.close {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 0.3;
  cursor: pointer;
  animation: spin 1s linear infinite;
  animation-play-state: paused;
}
.close:hover {
  opacity: 1;
  animation-play-state: running;
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: black;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
</style>
