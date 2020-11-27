<template>
  <div class="md-layout loginBackground">
    <div class="md-layout-item md-size-20"></div>
    <md-card class="md-layout-item md-size-60 md-gutter card">
      <div class="md-layout" style="height:100%;">
        <div class="md-layout-item md-xlarge-size-50 md-large-size-45 md-medium-size-45 logoDiv" >
          <img src="../assets/img/gotgan-logo.png" class="logoImg">
        </div>

        <div class="md-layout-item md-xlarge-size-50 md-large-size-55 md-medium-size-55 " style="margin:auto;">
          <div class="md-layout" style="height:100%;">
            <div class="md-layout-item md-size-20">
            </div>
            <div class="md-layout-item md-size-60">
              <h3 class="loginText">Makerspace Stock Management Systme</h3>

              <md-field :class="messageClass" :md-counter="false">
                <label for="userID">ID</label>
                <md-input name="userID" v-model="UserID" maxlength="20" required/>
                <span class="md-error">There is an error</span>
              </md-field>
              <md-field :class="messageClass" :md-counter="false">

                <label for="userPW">Password</label>
                <md-input name="userPW" v-model="UserPassword" type="password"  maxlength="20" required/>
                <span class="md-error">There is an error</span>
              </md-field>

              <transition-group name="slide-fade">
                <div v-bind:key="showCard">
                  <md-field :md-counter="false" v-if="showCard">
                    <label for="userName">이름</label>
                    <md-input name="userName" v-model="UserName" maxlength="20" required/>
                    <span class="md-error">There is an error</span>
                  </md-field>

                  <md-field :md-counter="false" v-if="showCard">
                    <label for="userEmail">이메일</label>
                    <md-input name="userEmail" v-model="UserEmail" maxlength="20"/>
                  </md-field>

                  <md-field :md-counter="false" v-if="showCard">
                    <label for="user_Phone">전화번호</label>
                    <md-input name="user_Phone" v-model="UserPhone" maxlength="20"/>
                  </md-field>

                  <md-field :md-counter="false" v-if="showCard">
                    <label for="userGroup">유저그룹</label>
                    <md-input name="userGroup" v-model="UserGroup" maxlength="20"/>
                  </md-field>

                  <md-field :md-counter="false" v-if="showCard">
                    <label for="userSID">학번</label>
                    <md-input name="userSID" v-model="UserSID" maxlength="20"/>
                  </md-field>
                </div>
              </transition-group>
              <div class="buttonSpace">
                <md-button class="md-raised" v-on:click="signIn" :to="link" v-if="showCard == 0">Sign in</md-button>

                <md-button v-on:click="showCard = 0" v-if="showCard == 1">Cancle</md-button>
                <md-button v-on:click="signUp" v-if="showCard == 1">Register</md-button>
              </div>
              <div class="buttonSpace">
                <a class="signIn" v-on:click="showCard = 1" v-if="showCard == 0">Create your account -></a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import router from '../main.js'
import axios from 'axios';

export default {
  props: {
    _userInfo: Object
  },
  data(){
    return{
      UserID: "",
      UserPassword: "",
      link: "",
      hasMessages: false,
      showCard: 0,
      UserLevel: 0,
      UserName: "",
      UserGroup: 0,
      UserSID: "",
      UserEmail: "",
      UserPhone: ""
    }
  },
  methods: {
    signIn (){ 
     if(this.UserID == "" || this.UserPassword == ""){
        this.hasMessages = true;
      }else{
        let signInParams = new URLSearchParams();
        let vue = this;
        signInParams.append('user_id', this.UserID);
        signInParams.append('user_pw', this.UserPassword);

        axios.post('https://api.devx.kr/GotGan/v1/login.php', signInParams)
        .then((response)=> {
          vue.$emit("child",response.data);
          if(response.data.result == 0){
            //로그인 성공
            vue.setCookie("session", response.data.session);

            response.data.UserLevel == 2 ? router.push("/admin/stockdashboard") : router.push("/user");
          }else{
            // 로그인 실패
            alert("ERROR");
          }

        })
        .catch((error)=> {
          console.log(error);
        });
      } 
    },
    signUp (){
      let signUpParams = new URLSearchParams();
      signUpParams.append('user_id', this.UserID);
      signUpParams.append('user_pw', this.UserPassword);
      signUpParams.append('user_level', this.UserLevel);
      signUpParams.append('user_name', this.UserName);
      signUpParams.append('user_email', this.UserEmail);
      signUpParams.append('user_phone', this.UserPhone);
      signUpParams.append('user_group', this.UserGroup);
      signUpParams.append('user_sid', this.UserSID);

      axios.post('https://api.devx.kr/GotGan/v1/login.php', signUpParams)
      .then((response)=> {
        console.log(response.data);
      })
      .catch((error)=> {
        console.log(error);
      });
    },
    setCookie(_name, _value){
      let date = new Date();
      date.setTime(date.getTime() + 60 * 30 * 1000); // 30min
      //document.cookie = _name + '=' + _value + ';expires=' + date.toUTCString() + ';path=/';
      document.cookie = `${_name}=${_value};expires=${date.toUTCString()};path=/`;
    },
    getCookie(_name){
      let value = document.cookie.match(`(^|;) ?${_name} =([^;]*)(;|$)`);
      return value? value[2] : null;
    }
  },
  computed: {
    messageClass () {
      return {
        'md-invalid': this.hasMessages
      }
    }
  },
  updated() {
    if(this.UserID != ""){
      this.hasMessages = false;
    }
  },
  created() {
    if(this.getCookie("session") != null){
      let signInParams = new URLSearchParams();
      //let vue = this;
      signInParams.append("session", this.getCookie("session"));
      axios.post('https://api.devx.kr/GotGan/v1/login.php', signInParams)
      .then((response)=> {
        //vue.$emit("child",response.data);
        this.$emit("child",response.data);
        if(response.data.result == 0){
          //로그인 성공
          response.data.UserLevel == 2 ? router.push("/admin/stockdashboard") : router.push("/user");
        }
      })
      .catch((error)=> {
        console.log(error);
      });
    }
  }
};

</script>

<style>
/* xlarge */
@media (min-width: 1920px) {
  .card {
    margin: 8rem 0!important;
  }
  .loginText {

  }
}

/* large */
@media (min-width: 1280px) and (max-width: 1919px) {
  .card {
    margin: 6rem 0!important;
  }
  .loginText {
    font-size: 1.1rem;
  }
}

/* medium */
@media (min-width: 960px) and (max-width: 1279px) {
  .card {
    margin: 4rem 0!important;
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
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
transform: translateX(10px);
opacity: 0;
}

.loginBackground {
  height:-webkit-fill-available;
  background-image: url("../assets/img/Login_Background2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.loginText {
  text-align: center;
  font-weight: 400;
}

.signIn {
  color: #999999!important;
  margin: 0 auto;
}

.signIn:hover {
  color: green!important;
  cursor: pointer;
  margin: 0 auto;
}

.buttonSpace {
  text-align: center;
}

.logoImg {
  width: 80%!important;
}

.logoDiv {
  margin: auto;
  text-align: center;
}
</style>
