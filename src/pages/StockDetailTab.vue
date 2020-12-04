<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <!-- 재고 상세 테이블 카드-->
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">
              {{ this._props.englishSwitch ? "Stock Detail" : "재고 상세" }}
            </h4>
            <p class="category">
              {{
                this._props.englishSwitch
                  ? "Show about stock details"
                  : "상세한 재고 보여주기"
              }}
            </p>
          </md-card-header>

          <md-card-content>
            <stock-detail-table
              :englishSwitch="englishSwitch"
            ></stock-detail-table>
          </md-card-content>
        </md-card>

        <!-- 재고 / 그룹 추가 카드-->
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">
              {{
                this._props.englishSwitch
                  ? "Stock / Group Add"
                  : "재고 / 그룹 추가"
              }}
            </h4>
            <p class="category">
              {{ this._props.englishSwitch ? "Add" : "추가하기" }}
            </p>
          </md-card-header>

          <md-card-content>
            <md-tabs
              md-dynamic-height
              @md-changed="onChangeTab($event)"
              class="md-accent"
            >
              <md-tab
                id="stockAddTab"
                :md-label="
                  this._props.englishSwitch ? 'Stock Add' : '재고 추가'
                "
              >
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="product_name">{{
                        this._props.englishSwitch ? "Product Name" : "항목 이름"
                      }}</label>
                      <md-input
                        v-model="addProductName"
                        name="product_name"
                        id="product_name"
                        autocomplete="family-name"
                        :disabled="sending"
                        required
                      />
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="product_group">{{
                        this._props.englishSwitch ? "Group" : "그룹"
                      }}</label>
                      <md-select
                        v-model="addProductGroup"
                        name="product_group"
                        id="product_group"
                        md-dense
                        :disabled="sending"
                        required
                      >
                        <md-option value="group_add">{{
                          this._props.englishSwitch ? "Add Group" : "그룹 추가"
                        }}</md-option>
                        <md-option
                          v-for="(item, index) in productGroups"
                          v-bind:value="item.group_index"
                          :key="index"
                        >
                          {{ item.group_name }}
                        </md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="product_status">{{
                        this._props.englishSwitch ? "Status" : "상태"
                      }}</label>
                      <md-select
                        v-model="addProductStatus"
                        name="product_status"
                        id="product_status"
                        md-dense
                        :disabled="sending"
                      >
                        <md-option value="0">{{
                          this._props.englishSwitch ? "Normal" : "일반"
                        }}</md-option>
                        <md-option value="1">{{
                          this._props.englishSwitch ? "Unusable" : "사용불가"
                        }}</md-option>
                        <md-option value="2">{{
                          this._props.englishSwitch ? "Failure" : "고장"
                        }}</md-option>
                        <md-option value="3">{{
                          this._props.englishSwitch ? "Repair" : "수리중"
                        }}</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="add_ProductOwner">{{
                        this._props.englishSwitch ? "Attached" : "소속"
                      }}</label>
                      <md-select
                        v-model="addProductOwner"
                        name="add_ProductOwner"
                        id="add_ProductOwner"
                        md-dense
                        :disabled="sending"
                      >
                        <md-option
                          v-for="(item, index) in userGroups"
                          v-bind:value="item.group_index"
                          :key="index"
                        >
                          {{ item.group_name }}
                        </md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="product_barcode">{{
                        this._props.englishSwitch ? "Barcode" : "바코드"
                      }}</label>
                      <md-input
                        v-model="addProductBarcode"
                        name="product_barcode"
                        id="product_barcode"
                        autocomplete="family-name"
                        :disabled="sending"
                      />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter" v-if="showGroupAdd">
                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field>
                      <label for="product_group_name">{{
                        this._props.englishSwitch ? "Group Name" : "그룹 이름"
                      }}</label>
                      <md-input
                        v-model="addGroupName"
                        name="product_group_name"
                        id="product_group_name"
                        autocomplete="family-name"
                        :disabled="sending"
                        required
                      />
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-10 md-small-size-100">
                    <md-field>
                      <label for="group_rentable">{{
                        this._props.englishSwitch
                          ? "Rentable"
                          : "대여 가능 여부"
                      }}</label>
                      <md-select
                        v-model="addGroupRentable"
                        name="group_rentable"
                        id="group_rentable"
                        md-dense
                        :disabled="sending"
                        required
                      >
                        <md-option value="0">{{
                          this._props.englishSwitch ? "X" : "불가"
                        }}</md-option>
                        <md-option value="1">{{
                          this._props.englishSwitch ? "O" : "가능"
                        }}</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field>
                      <label for="product_group_rentable_day">{{
                        this._props.englishSwitch
                          ? "Rentable Day"
                          : "대여 가능 일수"
                      }}</label>
                      <md-input
                        v-model="addGroupRentableDay"
                        name="product_group_rentable_day"
                        id="product_group_rentable_day"
                        autocomplete="family-name"
                        :disabled="addGroupRentable == 0"
                      />
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field>
                      <label for="product_group_priority">{{
                        this._props.englishSwitch ? "Priority" : "중요도"
                      }}</label>
                      <md-select
                        v-model="addGroupPriority"
                        name="product_group_priority"
                        id="product_group_priority"
                        md-dense
                        :disabled="sending"
                      >
                        <md-option value="0">{{
                          this._props.englishSwitch ? "Normal" : "일반항목"
                        }}</md-option>
                        <md-option value="1">{{
                          this._props.englishSwitch ? "Focus" : "중요항목"
                        }}</md-option>
                        <md-option value="2">{{
                          this._props.englishSwitch
                            ? "Intensive"
                            : "집중관리항목"
                        }}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>
              </md-tab>

              <md-tab
                id="groupAddTab"
                :md-label="
                  this._props.englishSwitch ? 'Group Add' : '그룹 추가'
                "
              >
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field>
                      <label for="product_group_name">{{
                        this._props.englishSwitch ? "Group Name" : "그룹 이름"
                      }}</label>
                      <md-input
                        v-model="addGroupName"
                        name="product_group_name"
                        id="product_group_name"
                        autocomplete="family-name"
                        :disabled="sending"
                        tabIndex="-1"
                        required
                      />
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-10 md-small-size-100">
                    <md-field>
                      <label for="group_rentable">{{
                        this._props.englishSwitch
                          ? "Rentable"
                          : "대여 가능 여부"
                      }}</label>
                      <md-select
                        v-model="addGroupRentable"
                        name="group_rentable"
                        id="group_rentable"
                        md-dense
                        :disabled="sending"
                        tabIndex="-1"
                        required
                      >
                        <md-option value="0">{{
                          this._props.englishSwitch ? "O" : "불가"
                        }}</md-option>
                        <md-option value="1">{{
                          this._props.englishSwitch ? "X" : "가능"
                        }}</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field>
                      <label for="product_group_rentable_day">{{
                        this._props.englishSwitch
                          ? "Rentable Day"
                          : "대여 가능 일수"
                      }}</label>
                      <md-input
                        v-model="addGroupRentableDay"
                        name="product_group_rentable_day"
                        id="product_group_rentable_day"
                        autocomplete="family-name"
                        tabIndex="-1"
                        :disabled="addGroupRentable == 0"
                      />
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field>
                      <label for="product_group_priority">{{
                        this._props.englishSwitch ? "Priority" : "중요도"
                      }}</label>
                      <md-select
                        v-model="addGroupPriority"
                        name="product_group_priority"
                        id="product_group_priority"
                        md-dense
                        tabIndex="-1"
                        :disabled="sending"
                      >
                        <md-option value="0">{{
                          this._props.englishSwitch ? "Normal" : "일반항목"
                        }}</md-option>
                        <md-option value="1">{{
                          this._props.englishSwitch ? "Focus" : "중요항목"
                        }}</md-option>
                        <md-option value="2">{{
                          this._props.englishSwitch
                            ? "Intensive"
                            : "집중관리항목"
                        }}</md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>
              </md-tab>
            </md-tabs>

            <md-card-actions>
              <md-button
                type="submit"
                class="md-primary"
                :disabled="sending"
                @click="onClickaddProductButton"
                >{{
                  this._props.englishSwitch ? "Submit" : "재고 추가"
                }}</md-button
              >
            </md-card-actions>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { StockDetailTable } from "@/components/";

export default {
  props: {
    userInfo_Tab: Object,
    englishSwitch: Boolean,
  },
  components: {
    StockDetailTable,
  },
  data() {
    return {
      sending: false,
      productGroups: [],
      userGroups: [],
      showGroupAdd: false,
      addProductName: "",
      addProductGroup: "",
      addProductStatus: 0,
      addProductOwner: 1,
      addProductBarcode: "",
      addGroupName: "",
      addGroupRentable: 0,
      addGroupRentableDay: "",
      addGroupPriority: 0,
      tabSelect: 0,
    };
  },
  mounted() {
    let getParams = new URLSearchParams();
    getParams.append("session", this.getSession());
    this.getProductData(getParams);
    this.getUserData(getParams);
  },
  methods: {
    getSession() {
      return sessionStorage.getItem("session");
    },
    getProductData(param) {
      axios
        .post("https://api.devx.kr/GotGan/v1/product_overview.php", param)
        .then((response) => {
          response.data.groups.forEach((el) => {
            this.productGroups.push(el);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserData(param) {
      axios
        .post("https://api.devx.kr/GotGan/v1/user_list.php", param)
        .then((response) => {
          response.data.groups.forEach((el) => {
            this.userGroups.push(el);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendGroupAddData(param, product) {
      axios
        .post("https://api.devx.kr/GotGan/v1/product_group_add.php", param)
        .then((response) => {
          if (product != 0) {
            product.product_group = response.data.product_group_index;
            let addProductParams = new URLSearchParams();
            addProductParams.append("session", this.getSession());
            addProductParams.append("products", JSON.stringify([product]));

            this.sendProductAddData(addProductParams);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendProductAddData(param) {
      axios
        .post("https://api.devx.kr/GotGan/v1/product_add.php", param)
        .then((response) => {
          location.reload();
          alert("상품 등록이 완료되었습니다.")
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickaddProductButton() {
      let addGroupParams = new URLSearchParams();

      const sessionCode = this.getSession();

      addGroupParams.append("session", sessionCode);
      addGroupParams.append("product_group_name", this.addGroupName);
      this.addGroupRentableDay == "" ? (this.addGroupRentableDay = 0) : 0;
      addGroupParams.append("product_group_rentable", this.addGroupRentableDay);
      addGroupParams.append("product_group_priority", this.addGroupPriority);

      if (this.tabSelect) {
        this.sendGroupAddData(addGroupParams, 0);
      } else {
        let productInfo = {
          product_group: this.addProductGroup,
          product_name: this.addProductName,
          product_status: this.addProductStatus,
          product_owner: this.addProductOwner,
          product_barcode: this.addProductBarcode,
        };

        if (this.addProductGroup == "group_add") {
          this.sendGroupAddData(addGroupParams, productInfo);
        } else {
          let addProductParams = new URLSearchParams();
          addProductParams.append("session", sessionCode);
          addProductParams.append("products", JSON.stringify([productInfo]));

          this.sendProductAddData(addProductParams);
        }
      }
    },
    onChangeTab(activeTab) {
      if (activeTab == "stockAddTab") {
        this.tabSelect = 0;
      } else if (activeTab == "groupAddTab") {
        this.tabSelect = 1;
      }
      this.addGroupRentable = 0;
      this.addGroupRentableDay = "";
    },
  },
  updated() {
    this.showGroupAdd = this.addProductGroup == "group_add";
  },
};
</script>

<style>
.md-tabs-navigation {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  margin: 0 !important;
  padding: 0 !important;
}
.md-tab-nav-button > .md-ripple > .md-button-content {
  color: black !important;
}

.md-tabs.md-theme-default.md-accent .md-tabs-navigation {
  background-color: #00000000 !important;
}

.md-tabs.md-theme-default.md-accent .md-tabs-navigation > .md-active {
  border-bottom: solid;
  border-color: blue;
}

.md-list-item-text {
  height: fit-content !important;
}
</style>
