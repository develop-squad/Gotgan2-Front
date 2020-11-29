<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">
              {{
                this._props.englishSwitch_Tab ? "Language Change" : "언어 변환"
              }}
            </h4>
            <md-switch v-model="englishSwitch" @change="switchLanguage"
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
    UserInfoTab: Object,
    EnglishSwitchTab: Boolean,
  },
  data() {
    return {
      englishSwitch: false,
    };
  },
  created() {
    this.englishSwitch = this._props.EnglishSwitchTab;
    console.log(this._props.EnglishSwitchTab);
  },
  updated() {},
  methods: {
    switchLanguage() {
      this.$EventBus.$emit("changeLanguage");
    },
  },
};
</script>
