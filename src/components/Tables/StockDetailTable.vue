<template>
  <div>
    <md-list class="list">
      <md-list-item style="border: black" class="headerList">
        <div class="list-line header">
          <span class="list-header">{{
            this._props.englishSwitch ? "Product" : "종류"
          }}</span>
          <span class="list-header">{{
            this._props.englishSwitch ? "Rentable" : "대여 가능"
          }}</span>
          <span class="list-header">{{
            this._props.englishSwitch ? "Unusable" : "사용 불가"
          }}</span>
          <span class="list-header">{{
            this._props.englishSwitch ? "Failure" : "고장"
          }}</span>
          <span class="list-header">{{
            this._props.englishSwitch ? "Repair" : "수리중"
          }}</span>
          <span class="list-header">{{
            this._props.englishSwitch ? "Renting" : "대여중"
          }}</span>
          <span class="list-header">{{
            this._props.englishSwitch ? "Total" : "총 갯수"
          }}</span>
        </div>
      </md-list-item>

      <md-content class="md-scrollbar tableScrollDiv">
        <md-list-item v-for="(item, index) in productGroup" :key="index">
          <div class="list-line" @click="toggle(item)">
            <span class="list-item">{{ item.group_name }}</span>
            <span class="list-item">{{
              item.group_count_available - item.group_count_rent
            }}</span>
            <span class="list-item">{{ item.group_count_unavailable }}</span>
            <span class="list-item">{{ item.group_count_broken }}</span>
            <span class="list-item">{{ item.group_count_repair }}</span>
            <span class="list-item">{{ item.group_count_rent }}</span>
            <span class="list-item">{{
              item.group_count_available +
              item.group_count_unavailable +
              item.group_count_broken +
              item.group_count_repair
            }}</span>
          </div>
          <md-table v-show="item.showTable">
            <md-table-row>
              <md-table-head>{{
                _props.englishSwitch ? "Barcode" : "바코드ID"
              }}</md-table-head>
              <md-table-head>{{
                _props.englishSwitch ? "Index" : "물품 인덱스"
              }}</md-table-head>
              <md-table-head>{{
                _props.englishSwitch ? "Product" : "이름"
              }}</md-table-head>
              <md-table-head>{{
                _props.englishSwitch ? "Attached" : "소속"
              }}</md-table-head>
              <md-table-head>{{
                _props.englishSwitch ? "Generation Date" : "구매 일자"
              }}</md-table-head>
            </md-table-row>

            <md-table-row
              v-for="(product, index) in item.products"
              :key="index"
              @click="toggleDialog(product)"
            >
              <md-table-cell>{{ product.product_barcode }}</md-table-cell>
              <md-table-cell>{{ product.product_index }}</md-table-cell>
              <md-table-cell>{{ product.product_name }}</md-table-cell>
              <md-table-cell>{{ product.product_owner_name }}</md-table-cell>
              <md-table-cell>{{ product.product_created }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-list-item>
      </md-content>
    </md-list>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>{{
        this._props.englishSwitch ? "Product Detail" : "제품 상세"
      }}</md-dialog-title>
      <md-dialog-content>
        <div>
          {{ this._props.englishSwitch ? "Barcode" : "바코드 ID" }} :
          {{ dialogInfo.product_barcode }}
        </div>
        <div>
          {{ this._props.englishSwitch ? "Product" : "이름" }} :
          {{ dialogInfo.product_name }}
        </div>
        <div>
          {{ this._props.englishSwitch ? "Attached" : "소속" }} :
          {{ dialogInfo.product_owner_name }}
        </div>
        <div>
          {{ this._props.englishSwitch ? "Generation Date" : "구매 일자" }}
          :
          {{ dialogInfo.product_created }}
        </div>
        <div>{{ this._props.englishSwitch ? "Log" : "로그" }}</div>
        <md-content class="md-scrollbar logScrollDiv">
          <md-table :table-header-color="tableHeaderColor">
            <md-table-row>
              <md-table-head>{{
                this._props.englishSwitch ? "Time" : "생성 시간"
              }}</md-table-head>
              <md-table-head>{{
                this._props.englishSwitch ? "Type" : "로그 타입"
              }}</md-table-head>
              <md-table-head>{{
                this._props.englishSwitch ? "ID" : "생성 유저 ID"
              }}</md-table-head>
              <md-table-head>{{
                this._props.englishSwitch ? "User Name" : "생성 유저 이름"
              }}</md-table-head>
            </md-table-row>

            <md-table-row v-for="(log, index) in logList" :key="index">
              <md-table-cell>{{ log.time }}</md-table-cell>
              <md-table-cell>{{ log.type }}</md-table-cell>
              <md-table-cell>{{ log.userID }}</md-table-cell>
              <md-table-cell>{{ log.userName }}</md-table-cell>
            </md-table-row>

            <md-table-row v-if="logList.length == 0">
              <md-table-cell>{{
                this._props.englishSwitch ? "No Log" : "로그가 없습니다."
              }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-content>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import axiosPost from "../../globalFunction.js";

export default {
  name: "stock-detail-table",
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
      showDialog: false,
      dialogInfo: {},
      showTable: false,
      logList: [],
    };
  },
  mounted() {
    this.getProductDetail();
  },
  methods: {
    getSession() {
      return sessionStorage.getItem("session");
    },
    getProductDetail() {
      let productParams = new URLSearchParams();
      productParams.append("session", this.getSession());

      axiosPost(
        "https://api.devx.kr/GotGan/v2/product_overview.php",
        productParams,
        (res) => {
          res.data.groups.forEach((el) => {
            el.products = [];
            el.showTable = false;
            this.productGroup.push(el);
          });

          this.getProductOverview(productParams);
        },
        null
      );
    },
    getProductOverview(productParams) {
      axiosPost(
        "https://api.devx.kr/GotGan/v2/product_list.php",
        productParams,
        (res) => {
          res.data.products.forEach((e) => {
            this.productGroup.forEach((f) => {
              if (f.group_index == e.product_group_index) {
                f.products.push(e);
              }
            });
          });
        },
        null
      );
    },
    toggle(group) {
      group.showTable = !group.showTable;
      this.$forceUpdate();
    },
    toggleDialog(product) {
      this.showDialog = true;
      this.dialogInfo = product;

      let logParams = new URLSearchParams();
      logParams.append("session", this.getSession());
      logParams.append("log_product", product.product_index);

      axiosPost(
        "https://api.devx.kr/GotGan/v2/log_list.php",
        logParams,
        (res) => {
          this.logList = [];
          res.data.logs.forEach((el) => {
            let logInfo = {
              time: el.log_time,
              type: res.data.types[el.log_type - 1].type_name,
              userName: el.log_user_name,
              userID: el.log_user_id,
            };
            this.logList.push(logInfo);
          });
        },
        null
      );
    },
  },
};
</script>

<style>
.list {
  display: block;
}

.header {
  height: 32px !important;
}

.list-header,
.list-item {
  padding-left: 8px;
  font-weight: 300;
  position: inherit !important;
}

.list-header {
  font-size: 1.0625rem;
  color: rgba(0, 0, 0, 0.54);
  color: var(--md-theme-default-text-accent-on-background, rgba(0, 0, 0, 0.54));
}

.list-line {
  height: 48px;
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-bottom: thin solid #f0f0f0;
  padding-bottom: 4px;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: background-color, font-weight;
  will-change: background-color, font-weight;
}

.list-line:hover {
  background-color: #f0f0f0;
}

.tableScrollDiv
  > .md-list-item
  > .md-list-item-container
  > .md-list-item-content,
.headerList > .md-list-item-container > .md-list-item-content {
  min-height: 1rem !important;
  display: block !important;
}

.md-disabled {
  padding: 0 !important;
}

.list-line > .list-item {
  height: fit-content;
  padding: 1rem 0;
}

.tableScrollDiv {
  max-height: 30rem;
  overflow: auto;
}

.logScrollDiv {
  max-height: 20rem;
  overflow: auto;
}
</style>
