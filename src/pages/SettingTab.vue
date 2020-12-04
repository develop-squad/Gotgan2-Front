<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">
              {{ this._props.englishSwitch ? "Language Change" : "언어 변환" }}
            </h4>
            <md-switch v-model="languageSwitch" @change="switchLanguage"
              >English</md-switch
            >
          </md-card-header>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    englishSwitch: Boolean,
  },
  data() {
    return {
      languageSwitch: false,
    };
  },
  mounted() {
    this.languageSwitch = this._props.englishSwitch;
  },
  methods: {
    switchLanguage() {
      this.$EventBus.$emit("changeLanguage");
    },
  },
};
</script>
