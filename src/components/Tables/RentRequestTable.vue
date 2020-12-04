<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>{{
          _props.englishSwitch ? "Name" : "이름"
        }}</md-table-head>
        <md-table-head>{{
          _props.englishSwitch ? "Product" : "항목"
        }}</md-table-head>
        <md-table-head>{{
          _props.englishSwitch ? "Rent Start Date" : "시작일"
        }}</md-table-head>
        <md-table-head>{{
          _props.englishSwitch ? "Button" : "처리 버튼"
        }}</md-table-head>
      </md-table-row>

      <md-table-row
        class="requestRow"
        slot="md-table-row"
        v-for="item in rentList"
        :key="item.rent_index"
      >
        <md-table-cell>{{ item.rent_user_name }}</md-table-cell>
        <md-table-cell>{{ item.rent_product_name }}</md-table-cell>
        <md-table-cell>{{ item.rent_time_start }}</md-table-cell>
        <md-table-cell>
          <md-button
            class="md-raised rentButton"
            data-background-color="blue"
            @click="allowButton(item)"
            >{{ _props.englishSwitch ? "Allow" : "허가" }}</md-button
          >
          <md-button
            class="md-raised rentButton"
            data-background-color="red"
            @click="rejectButtion(item)"
            >{{ _props.englishSwitch ? "Reject" : "거부" }}</md-button
          >
        </md-table-cell>
      </md-table-row>

      <md-table-row v-if="rentRequestNum == 0">
        <md-table-cell>{{
          _props.englishSwitch ? "No Rent request." : "대여 신청이 없습니다."
        }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axiosPost from "../../globalFunction.js";

export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    englishSwitch: Boolean,
  },
  data() {
    return {
      selected: [],
      rentList: [],
      rentRequestNum: 0,
    };
  },
  mounted() {
    this.getRentRequest();

    this.$EventBus.$on("sendAllow", (index) => {
      this.sendAllow(index);
    });

    this.$EventBus.$on("sendReject", (index) => {
      this.sendReject(index);
    });
  },
  methods: {
    getSession() {
      return sessionStorage.getItem("session");
    },
    getRentRequest() {
      let rentRequestParams = new URLSearchParams();
      rentRequestParams.append("session", this.getSession());

      this.rentRequestNum = 0;

      axiosPost(
        "https://api.devx.kr/GotGan/v2/rent_list.php",
        rentRequestParams,
        (res) => {
          this.rentList = [];

          res.data.rents
            .filter((el) => el.rent_status == 1)
            .forEach((el) => {
              this.rentList.push(el);
              this.rentRequestNum++;
            });
        },
        null
      );
    },
    allowButton(obj) {
      this.$EventBus.$emit("allowButton", obj);
    },
    sendAllow(index) {
      let allowParams = new URLSearchParams();
      allowParams.append("session", this.getSession());
      allowParams.append("rent_index", index);

      axiosPost(
        "https://api.devx.kr/GotGan/v2/rent_allow.php",
        allowParams,
        (res) => {
          this.getRentRequest();
          this.$EventBus.$emit("updateRentStatusTable");
          this.$EventBus.$emit("updateSideBarBadge");
        },
        null
      );
    },
    rejectButtion(obj) {
      this.$EventBus.$emit("rejectButton", obj);
    },
    sendReject(index) {
      let rejectParams = new URLSearchParams();
      rejectParams.append("session", this.getSession());
      rejectParams.append("rent_index", index);

      axiosPost(
        "https://api.devx.kr/GotGan/v2/rent_delete.php",
        rejectParams,
        (res) => {
          this.getRentRequest();
          this.$EventBus.$emit("updateRentStatusTable");
          this.$EventBus.$emit("updateSideBarBadge");
        },
        null
      );
    },
  },
};
</script>

<style>
.rentButton {
  margin: 0 0.8rem !important;
}
</style>
