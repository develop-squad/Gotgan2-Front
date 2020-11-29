<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar  :englishSwitch="englishSwitch">
      <sidebar-link to="/admin/stockDashboard">
        <md-icon>view_module</md-icon>
        <p>{{ englishSwitch ? "Stock Dashboard" : "재고 대시보드" }}</p>
      </sidebar-link>

      <sidebar-link to="/admin/stockDetail">
        <md-icon>content_paste</md-icon>
        <p>{{ englishSwitch ? "Stock Detail" : "재고 상세" }}</p>
      </sidebar-link>

      <sidebar-link to="/admin/rentDashboard">
        <md-icon>view_quilt</md-icon>
        <div class="md-badge-content" v-if="showNum > 0">
          <div class="md-badge md-theme-default md-position-top">
            <div>
              {{ showNum }}
            </div>
          </div>
        </div>
        <p>{{ englishSwitch ? "Rent Dashboard" : "반출입 대시보드" }}</p>
      </sidebar-link>

      <sidebar-link to="/admin/userManagement">
        <md-icon>person</md-icon>
        <p>{{ englishSwitch ? "User Management" : "유저 관리" }}</p>
      </sidebar-link>

      <sidebar-link to="/admin/setting">
        <md-icon>settings_applications</md-icon>
        <p>{{ englishSwitch ? "Setting" : "설정" }}</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar
        :userName="userName"
        :englishSwitch="englishSwitch"
      ></top-navbar>

      <dashboard-content :englishSwitch="englishSwitch"></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import router from "../../main.js";
import axios from "axios";

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter
  },
  data() {
    return {
      userName: "",
      rentNum: 0,
      showNum: 0,
      englishSwitch: false,
    };
  },
  mounted() {
    const sessionCode = this.getSession();

    this.$EventBus.$on("updateSideBarBadge", () => {
      this.updateData(sessionCode);
    });

    this.$EventBus.$on("changeLanguage", () => {
      this.changeLanguage();
    });

    if (sessionCode) {
      this.loginCheck(sessionCode);
    }

    this.updateData(sessionCode);
  },
  methods: {
    getSession() {
      return sessionStorage.getItem("session");
    },
    loginCheck(sessionCode) {
      let signInParams = new URLSearchParams();
      signInParams.append("session", sessionCode);

      axios
        .post("https://api.devx.kr/GotGan/v1/login.php", signInParams)
        .then((response) => {
          if (response.data.result == 0) {
            this.userName = response.data.user_name;
          } else {
            // 로그인 실패
            alert("다시 로그인 하시오.");
            router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateData(sessionCode) {
      let params = new URLSearchParams();
      params.append("session", sessionCode);

      axios
        .post("https://api.devx.kr/GotGan/v1/rent_list.php", params)
        .then((response) => {
          this.rentNum = 0;

          response.data.rents.forEach(el => {
            el.rent_status == 1 ? this.rentNum++ : 0;
          })

          this.showNum != this.rentNum ? (this.showNum = this.rentNum) : 0;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeLanguage() {
      this.englishSwitch = !this.englishSwitch;
    },
  },
  updated() {
    const sessionCode = this.getSession();
    this.updateData(sessionCode);
    this.$EventBus.$emit("changeTitle");
  },
};
</script>

<style lang="scss">
.md-badge-content {
  position: absolute !important;
  left: 2.3rem;
  bottom: 1.6rem;
}
</style>
