<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>{{
          this._props.englishSwitch ? "User Index" : "유저 인덱스"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "ID" : "ID"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Name" : "이름"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Group" : "소속"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Authority" : "권한"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "StudentID" : "학번"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Registration Date" : "가입일"
        }}</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in userList" :key="item.user_index">
        <md-table-cell>{{ item.user_index }}</md-table-cell>
        <md-table-cell>{{ item.user_id }}</md-table-cell>
        <md-table-cell>{{ item.user_name }}</md-table-cell>
        <md-table-cell>{{ item.user_group_name }}</md-table-cell>
        <md-table-cell>{{ item.user_level }}</md-table-cell>
        <md-table-cell>{{ item.user_sid }}</md-table-cell>
        <md-table-cell>{{ item.user_created }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axiosPost from "../../globalFunction.js";

export default {
  name: "stock-table",
  props: {
    englishSwitch: Boolean,
  },
  data() {
    return {
      userList: [],
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      let userParams = new URLSearchParams();
      userParams.append("session", this.getSession());

      axiosPost(
        "https://api.devx.kr/GotGan/v2/user_list.php",
        userParams,
        (res) => {
          res.data.users.forEach((el) => {
            this.userList.push(el);
          });
        },
        null
      );
    },
    getSession() {
      return sessionStorage.getItem("session");
    },
  },
};
</script>
