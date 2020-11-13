<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>{{
          this._props.englishSwitch_Table ? "Product" : "종류"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch_Table ? "Rentable" : "대여 가능"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch_Table ? "Unusable" : "사용 불가"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch_Table ? "Failure" : "고장"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch_Table ? "Repair" : "수리중"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch_Table ? "Renting" : "대여중"
        }}</md-table-head>
        <md-table-head>{{
          this._props.englishSwitch_Table ? "Total" : "총 갯수"
        }}</md-table-head>
      </md-table-row>

      <md-table-row v-for="item in productGroup">
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
    userInfo_Table: Object,
    englishSwitch_Table: Boolean,
  },
  data() {
    return {
      productGroup: [],
    };
  },
  created() {
    console.log("StockTable");
    console.log(this._props.userInfo_Table);

    this.exportData();
  },
  methods: {
    exportData: function () {
      var productParams = new URLSearchParams();
      var vue = this;

      productParams.append("session", vue.getCookie("session"));

      axios
        .post(
          "https://api.devx.kr/GotGan/v1/product_overview.php",
          productParams
        )
        .then(function (response) {
          for (var x = 0; x < Object.keys(response.data.groups).length; x++) {
            vue.productGroup.push(response.data.groups[x]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCookie: function (_name) {
      var value = document.cookie.match("(^|;) ?" + _name + "=([^;]*)(;|$)");
      return value ? value[2] : null;
    },
  },
};
</script>
