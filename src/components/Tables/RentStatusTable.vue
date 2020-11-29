<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>{{
          this._props.englishSwitch ? "Name" : "이름"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Product" : "항목"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Rent Start Date" : "시작일"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Rent End Date" : "반납예정일"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Button" : "처리 버튼"
        }}</md-table-head>
      </md-table-row>

      <md-table-row
        class="statusRow"
        slot="md-table-row"
        v-for="item in rentList"
        :key="item.rent_index"
      >
        <md-table-cell>{{ item.rent_user_name }}</md-table-cell>
        <md-table-cell>{{ item.rent_product_name }}</md-table-cell>
        <md-table-cell>{{ item.rent_time_start }}</md-table-cell>
        <md-table-cell>{{ item.rent_time_end }}</md-table-cell>
        <md-table-cell>
          <md-button
            class="md-raised rentButton"
            data-background-color="red"
            @click="returnButton(item)"
            >{{
              this._props.englishSwitch ? "Return Check" : "반납 확인"
            }}</md-button
          >
        </md-table-cell>
      </md-table-row>
      <md-table-row v-if="rentStatusNum == 0">
        <md-table-cell>{{
          this._props.englishSwitch ? "No Rent status" : "대여 신청이 없습니다."
        }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "rent-status-table",
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
      rentStatusNum: 0,
    };
  },
  mounted() {
    this.$EventBus.$on("updateRentStatusTable", () => {
      this.getRentList();
    });

    this.$EventBus.$on("sendReturn", (index) => {
      this.sendReturn(index);
    });

    this.getRentList();
  },
  methods: {
    getSession() {
      return sessionStorage.getItem("session");
    },
    getRentList() {
      let rentParams = new URLSearchParams();
      rentParams.append("session", this.getSession());

      axios
        .post("https://api.devx.kr/GotGan/v1/rent_list.php", rentParams)
        .then((response) => {
          this.rentStatusNum = 0;
          this.rentList = [];

          response.data.rents
            .filter((el) => el.rent_status == 2)
            .forEach((el) => {
              this.rentList.push(el);
              this.rentStatusNum++;
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    returnButton(obj) {
      this.$EventBus.$emit("returnButton", obj);
    },
    sendReturn(index) {
      var returnParams = new URLSearchParams();
      returnParams.append("session", this.getSession());
      returnParams.append("rent_index", index);

      axios
        .post("https://api.devx.kr/GotGan/v1/rent_return.php", returnParams)
        .then((response) => {
          this.exportData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
