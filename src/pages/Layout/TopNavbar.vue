<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">
          {{ _props.englishSwitch ? title : $route.name }}
        </h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <md-list-item>
              <h3 class="md-title">{{ userName }}</h3>
            </md-list-item>

            <md-list-item @click="logoutButton">
              <i class="material-icons">logout</i>
              <p class="hidden-lg hidden-md">Logout</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import axios from "axios";
import router from "../../main.js";

export default {
  props: {
    userName: String,
    englishSwitch: Boolean,
  },
  data() {
    return {
      session: "",
      title: "",
    };
  },
  mounted() {
    this.session = this.getSession();

    this.$EventBus.$on("changeTitle", () => {
      this.changeTitle();
    });
  },
  methods: {
    getSession() {
      return sessionStorage.getItem("session");
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logoutButton() {
      let logoutParams = new URLSearchParams();
      logoutParams.append("session", this.session);

      axios
        .post("https://api.devx.kr/GotGan/v1/login.php", logoutParams)
        .then((response) => {
          alert("로그아웃 되었습니다.");
          sessionStorage.removeItem("session");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeTitle() {
      switch (this.$route.name) {
        case "재고 대시보드":
          this.title = "Stock Dashboard";
          break;
        case "재고 상세":
          this.title = "Stock Detail";
          break;
        case "반출입 대시보드":
          this.title = "Rent Dashboard";
          break;
        case "유저 관리":
          this.title = "Uset Management";
          break;
        case "설정":
          this.title = "Setting";
          break;
      }
    },
  },
};
</script>

