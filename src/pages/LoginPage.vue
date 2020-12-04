<template>
  <div class="md-layout loginBackground">
    <div class="md-layout-item md-size-20"></div>
    <md-card class="md-layout-item md-size-60 md-gutter card">
      <div class="md-layout" style="height: 100%">
        <div
          class="md-layout-item md-xlarge-size-50 md-large-size-45 md-medium-size-45 logoDiv"
        >
          <img src="../assets/img/gotgan-logo.png" class="logoImg" />
        </div>

        <div
          class="md-layout-item md-xlarge-size-50 md-large-size-55 md-medium-size-55"
          style="margin: auto"
        >
          <div class="md-layout" style="height: 100%">
            <div class="md-layout-item md-size-20"></div>
            <div class="md-layout-item md-size-60">
              <h3 class="loginText">Makerspace Stock Management Systme</h3>

              <md-field :class="messageClass" :md-counter="false">
                <label for="userID">ID</label>
                <md-input
                  name="userID"
                  v-model="userID"
                  maxlength="20"
                  required
                />
                <span class="md-error">There is an error</span>
              </md-field>
              <md-field :class="messageClass" :md-counter="false">
                <label for="userPW">Password</label>
                <md-input
                  name="userPW"
                  v-model="userPassword"
                  type="password"
                  maxlength="20"
                  required
                />

                <span class="md-error">There is an error</span>
              </md-field>

              <transition-group name="slide-fade">
                <div v-bind:key="showCard">
                  <md-field :md-counter="false" v-if="showCard">
                    <label for="userName">이름</label>
                    <md-input
                      name="userName"
                      v-model="userName"
                      maxlength="20"
                      required
                    />

                    <span class="md-error">There is an error</span>
                  </md-field>

                  <md-field :md-counter="false" v-if="showCard">
                    <label for="userEmail">이메일</label>
                    <md-input
                      name="userEmail"
                      v-model="userEmail"
                      maxlength="20"
                    />
                  </md-field>

                  <md-field :md-counter="false" v-if="showCard">
                    <label for="user_Phone">전화번호</label>
                    <md-input
                      name="user_Phone"
                      v-model="userPhone"
                      maxlength="20"
                    />
                  </md-field>

                  <md-field :md-counter="false" v-if="showCard">
                    <label for="userGroup">유저그룹</label>
                    <md-input
                      name="userGroup"
                      v-model="userGroup"
                      maxlength="20"
                    />
                  </md-field>

                  <md-field :md-counter="false" v-if="showCard">
                    <label for="userSID">학번</label>
                    <md-input name="userSID" v-model="userSID" maxlength="20" />
                  </md-field>
                </div>
              </transition-group>
              <div class="buttonSpace">
                <md-button
                  class="md-raised"
                  v-on:click="onClickSignInButton"
                  v-if="showCard == 0"
                  >Sign in</md-button
                >

                <md-button v-on:click="showCard = 0" v-if="showCard == 1"
                  >Cancle</md-button
                >
                <md-button v-on:click="signUp" v-if="showCard == 1"
                  >Register</md-button
                >
              </div>
              <div class="buttonSpace">
                <a class="signIn" v-on:click="showCard = 1" v-if="showCard == 0"
                  >Create your account -></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import router from "../main.js";
import axiosPost from "../globalFunction.js";

export default {
  data() {
    return {
      userID: "",
      userPassword: "",
      hasMessages: false,
      showCard: 0,
      userLevel: 0,
      userName: "",
      userGroup: 0,
      userSID: "",
      userEmail: "",
      userPhone: "",
    };
  },
  mounted() {
    this.loginCheck();
  },
  methods: {
    onClickSignInButton() {
      if (this.userID == "" || this.userPassword == "") {
        this.hasMessages = true;
      } else {
        let signInParams = new URLSearchParams();

        signInParams.append("user_id", this.userID);
        signInParams.append("user_pw", this.userPassword);

        this.signIn(signInParams);
      }
    },
    signIn(signInParams) {
      axiosPost(
        "https://api.devx.kr/GotGan/v2/login.php",
        signInParams,
        (res) => {
          console.log(res);
          this.$emit("child", res.data);

          if (res.data.result == 0) {
            sessionStorage.setItem("session", res.data.session);

            router.push(
              res.data.user_level == 2 ? "/admin/stockdashboard" : "/user"
            );
          } else {
            alert("입력된 정보가 잘못되었습니다.");
          }
        },
        null
      );
    },
    signUp() {
      let signUpParams = new URLSearchParams();
      signUpParams.append("user_id", this.userID);
      signUpParams.append("user_pw", this.userPassword);
      signUpParams.append("user_level", this.userLevel);
      signUpParams.append("user_name", this.userName);
      signUpParams.append("user_email", this.userEmail);
      signUpParams.append("user_phone", this.userPhone);
      signUpParams.append("user_group", this.userGroup);
      signUpParams.append("user_sid", this.userSID);

      axiosPost(
        "https://api.devx.kr/GotGan/v2/login.php",
        signUpParams,
        (res) => {
          alert("회원가입이 완료되었습니다.");
        },
        null
      );
    },
    getSession() {
      return sessionStorage.getItem("session");
    },
    loginCheck() {
      const sessionData = this.getSession();
      if (sessionData != null) {
        let signInParams = new URLSearchParams();
        signInParams.append("session", sessionData);
        this.signIn(signInParams);
      }
    },
  },
  computed: {
    messageClass() {
      return {
        "md-invalid": this.hasMessages,
      };
    },
  },
  updated() {
    if (this.userID != "") {
      this.hasMessages = false;
    }
  },
};
</script>

<style>
@media (min-width: 1920px) {
  .card {
    margin: 8rem 0 !important;
  }
}

/* large */
@media (min-width: 1280px) and (max-width: 1919px) {
  .card {
    margin: 6rem 0 !important;
  }
  .loginText {
    font-size: 1.1rem;
  }
}

/* medium */
@media (min-width: 960px) and (max-width: 1279px) {
  .card {
    margin: 4rem 0 !important;
  }
  .loginText {
    font-size: 0.9rem;
  }
}

.cardDiv {
  transition-property: all;
  transition-duration: 1s;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.loginBackground {
  height: -webkit-fill-available;
  background-image: url("../assets/img/Login_Background2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.loginText {
  text-align: center;
  font-weight: 400;
}

.signIn {
  color: #999999 !important;
  margin: 0 auto;
}

.signIn:hover {
  color: green !important;
  cursor: pointer;
  margin: 0 auto;
}

.buttonSpace {
  text-align: center;
}

.logoImg {
  width: 80% !important;
}

.logoDiv {
  margin: auto;
  text-align: center;
}
</style>
