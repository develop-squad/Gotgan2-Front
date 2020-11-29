<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>{{
          this._props.englishSwitch ? "Product" : "종류"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Rentable" : "대여 가능"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Unusable" : "사용 불가"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Failure" : "고장"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Repair" : "수리중"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Renting" : "대여중"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch ? "Total" : "총 갯수"
        }}</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, index) in productGroup" :key="index">
        <md-table-cell>{{ item.group_name }}</md-table-cell>
        <md-table-cell>{{
          item.group_count_available - item.group_count_rent
        }}</md-table-cell>
        <md-table-cell>{{ item.group_count_unavailable }}</md-table-cell>
        <md-table-cell>{{ item.group_count_broken }}</md-table-cell>
        <md-table-cell>{{ item.group_count_repair }}</md-table-cell>
        <md-table-cell>{{ item.group_count_rent }}</md-table-cell>
        <md-table-cell>{{
          item.group_count_available +
          item.group_count_unavailable +
          item.group_count_broken +
          item.group_count_repair
        }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "stock-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    englishSwitch: Boolean,
  },
  data() {
    return {
      productGroup: [],
    };
  },
  mounted() {
    this.exportData();
  },
  methods: {
    exportData() {
      let productParams = new URLSearchParams();
      productParams.append("session", this.getSession());

      axios
        .post(
          "https://api.devx.kr/GotGan/v1/product_overview.php",
          productParams
        )
        .then((response) => {
          response.data.groups.forEach((el) => {
            this.productGroup.push(el);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSession() {
      return sessionStorage.getItem("session");
    },
  },
};
</script>
