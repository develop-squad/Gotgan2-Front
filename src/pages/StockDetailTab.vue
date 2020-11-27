<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <!-- 재고 상세 테이블 카드-->
        <md-card>
          <md-card-header data-background-color="red" v-if="!this._props.EnglishSwitchTab">
            <h4 class="title">재고 상세</h4>
            <p class="category">상세한 재고 보여주기</p>
          </md-card-header>

          <md-card-header data-background-color="red" v-if="this._props.EnglishSwitchTab">
            <h4 class="title">Stock Detail</h4>
            <p class="category">Show about stock details</p>
          </md-card-header>

          <md-card-content>
            <stock-detail-table :userInfo_Table="UserInfoTab" :englishSwitch_Table="EnglishSwitchTab"></stock-detail-table>
          </md-card-content>
        </md-card>

        <!-- 재고 / 그룹 추가 카드-->
        <md-card>
          <md-card-header data-background-color="red" v-if="!this._props.EnglishSwitchTab">
            <h4 class="title">재고 / 그룹 추가</h4>
            <p class="category">추가하기</p>
          </md-card-header>

          <md-card-header data-background-color="red" v-if="this._props.EnglishSwitchTab">
            <h4 class="title">Stock / Group Add</h4>
            <p class="category">Add</p>
          </md-card-header>

          <md-card-content>
            <md-tabs md-dynamic-height @md-changed="test($event)" class="md-accent">
              <md-tab id="stockAddTab" md-label="재고 추가" v-if="!this._props.EnglishSwitchTab">
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field >
                      <label for="product_name">항목 이름</label>
                      <md-input v-model="AddProductName" name="product_name" id="product_name" autocomplete="family-name" :disabled="sending" required/>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="product_group">그룹</label>
                      <md-select v-model="AddProductGroup" name="product_group" id="product_group" md-dense :disabled="sending" required>
                        <md-option value="group_add">그룹 추가</md-option>
                        <md-option v-for="item in ProductGroups" v-bind:value="item.group_index">
                          {{ item.group_name }}
                        </md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="product_status">상태</label>
                      <md-select v-model="AddProductStatus"  name="product_status" id="product_status"  md-dense :disabled="sending">
                        <md-option value="0">일반</md-option>
                        <md-option value="1">사용불가</md-option>
                        <md-option value="2">고장</md-option>
                        <md-option value="3">수리중</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field >
                      <label for="add_ProductOwner">소속</label>
                      <md-select v-model="AddProductOwner"  name="add_ProductOwner" id="add_ProductOwner"  md-dense :disabled="sending">
                        <md-option v-for="item in UserGroups" v-bind:value="item.group_index">
                          {{ item.group_name }}
                        </md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field >
                      <label for="product_barcode">바코드</label>
                      <md-input v-model="AddProductBarcode" name="product_barcode" id="product_barcode" autocomplete="family-name" :disabled="sending" />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter" v-if="showGroupAdd">

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_name">그룹 이름</label>
                      <md-input v-model="AddGroupName" name="product_group_name" id="product_group_name" autocomplete="family-name" :disabled="sending" required/>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-10 md-small-size-100">
                    <md-field>
                      <label for="group_rentable">대여 가능 여부</label>
                      <md-select v-model="AddGroupRentable"  name="group_rentable" id="group_rentable"  md-dense :disabled="sending" required>
                        <md-option value="0">불가</md-option>
                        <md-option value="1">가능</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_rentable_day">대여 가능 일수</label>
                      <md-input v-model="AddGroupRentableDay" name="product_group_rentable_day" id="product_group_rentable_day" autocomplete="family-name" :disabled="AddGroupRentable == 0" />
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_priority">중요도</label>
                      <md-select v-model="AddGroupPriority"  name="product_group_priority" id="product_group_priority"  md-dense :disabled="sending">
                        <md-option value="0">일반항목</md-option>
                        <md-option value="1">중요항목</md-option>
                        <md-option value="2">집중관리항목</md-option>
                      </md-select>

                    </md-field>
                  </div>
                </div>
              </md-tab>

              <md-tab id="stockAddTab" md-label="Stock Add" v-if="this._props.EnglishSwitchTab">
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-small-size-100">
                    <md-field >
                      <label for="product_name">Product Name</label>
                      <md-input v-model="AddProductName" name="product_name" id="product_name" autocomplete="family-name" :disabled="sending" required/>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="product_group">Group</label>
                      <md-select v-model="AddProductGroup" name="product_group" id="product_group" md-dense :disabled="sending" required>
                        <md-option value="group_add">Add Group</md-option>
                        <md-option v-for="item in ProductGroups" v-bind:value="item.group_index">
                          {{ item.group_name }}
                        </md-option>
                      </md-select>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout md-gutter">

                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label for="product_status">Status</label>
                      <md-select v-model="AddProductStatus"  name="product_status" id="product_status"  md-dense :disabled="sending">
                        <md-option value="0">Normal</md-option>
                        <md-option value="1">Unusable</md-option>
                        <md-option value="2">Failure</md-option>
                        <md-option value="3">Repair</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field >
                      <label for="add_ProductOwner">Attached</label>
                      <md-select v-model="AddProductOwner"  name="add_ProductOwner" id="add_ProductOwner"  md-dense :disabled="sending">
                        <md-option v-for="item in UserGroups" v-bind:value="item.group_index">
                          {{ item.group_name }}
                        </md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-small-size-100">
                    <md-field >
                      <label for="product_barcode">Barcode</label>
                      <md-input v-model="AddProductBarcode" name="product_barcode" id="product_barcode" autocomplete="family-name" :disabled="sending" />
                    </md-field>
                  </div>
                </div>
                <div class="md-layout md-gutter" v-if="showGroupAdd">

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_name">Group Name</label>
                      <md-input v-model="AddGroupName" name="product_group_name" id="product_group_name" autocomplete="family-name" :disabled="sending" required/>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-10 md-small-size-100">
                    <md-field>
                      <label for="group_rentable">Rentable</label>
                      <md-select v-model="AddGroupRentable"  name="group_rentable" id="group_rentable"  md-dense :disabled="sending" required>
                        <md-option value="0">X</md-option>
                        <md-option value="1">O</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_rentable_day">Rentable Day</label>
                      <md-input v-model="AddGroupRentableDay" name="product_group_rentable_day" id="product_group_rentable_day" autocomplete="family-name" :disabled="AddGroupRentable == 0" />
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_priority">Priority</label>
                      <md-select v-model="AddGroupPriority"  name="product_group_priority" id="product_group_priority"  md-dense :disabled="sending">
                        <md-option value="0">Normal</md-option>
                        <md-option value="1">Focus</md-option>
                        <md-option value="2">Intensive</md-option>
                      </md-select>

                    </md-field>
                  </div>
                </div>
              </md-tab>

              <md-tab id="groupAddTab" md-label="그룹 추가" v-if="!this._props.EnglishSwitchTab">
                <div class="md-layout md-gutter">

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_name">그룹 이름</label>
                      <md-input v-model="AddGroupName" name="product_group_name" id="product_group_name" autocomplete="family-name" :disabled="sending" tabIndex="-1" required/>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-10 md-small-size-100">
                    <md-field>
                      <label for="group_rentable">대여 가능 여부</label>
                      <md-select v-model="AddGroupRentable"  name="group_rentable" id="group_rentable"  md-dense :disabled="sending" tabIndex="-1" required>
                        <md-option value="0">불가</md-option>
                        <md-option value="1">가능</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_rentable_day">대여 가능 일수</label>
                      <md-input v-model="AddGroupRentableDay" name="product_group_rentable_day" id="product_group_rentable_day" autocomplete="family-name" tabIndex="-1" :disabled="AddGroupRentable == 0" />
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_priority">중요도</label>
                      <md-select v-model="AddGroupPriority"  name="product_group_priority" id="product_group_priority"  md-dense tabIndex="-1" :disabled="sending">
                        <md-option value="0">일반항목</md-option>
                        <md-option value="1">중요항목</md-option>
                        <md-option value="2">집중관리항목</md-option>
                      </md-select>

                    </md-field>
                  </div>
                </div>
              </md-tab>

              <md-tab id="groupAddTab" md-label="Group Add" v-if="this._props.EnglishSwitchTab">
                <div class="md-layout md-gutter">

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_name">Group Name</label>
                      <md-input v-model="AddGroupName" name="product_group_name" id="product_group_name" autocomplete="family-name" :disabled="sending" tabIndex="-1" required/>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-10 md-small-size-100">
                    <md-field>
                      <label for="group_rentable">Rentable</label>
                      <md-select v-model="AddGroupRentable"  name="group_rentable" id="group_rentable"  md-dense :disabled="sending" tabIndex="-1" required>
                        <md-option value="0">O</md-option>
                        <md-option value="1">X</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_rentable_day">Rentable Day</label>
                      <md-input v-model="AddGroupRentableDay" name="product_group_rentable_day" id="product_group_rentable_day" autocomplete="family-name" tabIndex="-1" :disabled="AddGroupRentable == 0" />
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-30 md-small-size-100">
                    <md-field >
                      <label for="product_group_priority">Priority</label>
                      <md-select v-model="AddGroupPriority"  name="product_group_priority" id="product_group_priority"  md-dense tabIndex="-1" :disabled="sending">
                        <md-option value="0">Normal</md-option>
                        <md-option value="1">Focus</md-option>
                        <md-option value="2">Intensive</md-option>
                      </md-select>

                    </md-field>
                  </div>
                </div>
              </md-tab>
            </md-tabs>


            <md-card-actions>
              <md-button type="submit" class="md-primary" :disabled="sending" @click="addProductButton()" v-if="!this._props.EnglishSwitchTab">재고 추가</md-button>
              <md-button type="submit" class="md-primary" :disabled="sending" @click="addProductButton()" v-if="this._props.EnglishSwitchTab">Submit</md-button>
            </md-card-actions>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

var params = new URLSearchParams();
import {
  StockDetailTable
} from "@/components/";

export default {
  props: {
    UserInfoTab: Object,
    EnglishSwitchTab: Boolean
  },
  components: {
    StockDetailTable
  },
  data() {
    return {
      sending: false,
      ProductGroups: [],
      UserGroups: [],
      showGroupAdd: false,
      AddProductName: "",
      AddProductGroup: "",
      AddProductStatus: 0,
      AddProductOwner: 1,
      AddProductBarcode: "",
      AddGroupName: "",
      AddGroupRentable: 0,
      AddGroupRentableDay: "",
      AddGroupPriority: 0,
      tabSelect: 0
    };
  },
  created(){
    console.log("StockDetailTab");
    console.log(this._props);

    params.append('session', this.getCookie("session"));

    this.exportProductData(params);
    this.exportUserData(params);

  },
  methods: {
    exportProductData (param){
      //let vue = this;
      axios.post('https://api.devx.kr/GotGan/v1/product_overview.php', param)
      .then((response) =>{
        for(let index = 0; index < response.data.groups.length; index++){
          //vue.ProductGroups.push(response.data.groups[index]);
          this.ProductGroups.push(response.data.groups[index]);
        }
      })
      .catch((error) =>{
        console.log(error);
      });
    },
    exportUserData (param){
      //let vue = this;
      axios.post('https://api.devx.kr/GotGan/v1/user_list.php', param)
      .then((response) =>{
        for(let index = 0; index < response.data.groups.length; index++){
          //vue.UserGroups.push(response.data.groups[index]);
          this.UserGroups.push(response.data.groups[index]);
        }
      })
      .catch((error) =>{
        console.log(error);
      });
    },
    sendGroupAddData (param, product){
      //let vue = this;
      axios.post('https://api.devx.kr/GotGan/v1/product_group_add.php', param)
      .then((response) =>{
        if(product != 0){
          product.product_group = response.data.product_group_index;
          let array = new Array();
          array.push(product);
          let addProductParams = new URLSearchParams();
          //addProductParams.append('session', vue.getCookie("session"));
          addProductParams.append('session', this.getCookie("session"));
          addProductParams.append('products', JSON.stringify(array));

          //vue.sendProductAddData(addProductParams);
          this.sendProductAddData(addProductParams);
        }
      })
      .catch((error) =>{
        console.log(error);
      });
    },
    sendProductAddData (param){
      //let vue = this;
      axios.post('https://api.devx.kr/GotGan/v1/product_add.php', param)
      .then((response) =>{
        // 새로고침 말고 테이블만 로드 필요
        location.reload();
      })
      .catch((error) =>{
        console.log(error);
      });
    },
    addProductButton (){
      // 재고 추가 버튼
      let addGroupParams = new URLSearchParams();

      if(this.tabSelect){
        // 그룹 추가
        addGroupParams.append('session', this.getCookie("session"));
        addGroupParams.append('product_group_name', this.AddGroupName);
        this.AddGroupRentableDay == "" ? this.AddGroupRentableDay = 0 : 0;
        addGroupParams.append('product_group_rentable', this.AddGroupRentableDay);
        addGroupParams.append('product_group_priority', this.AddGroupPriority);

        this.sendGroupAddData(addGroupParams, 0);
      }else{
        // 재고 추가
        let addProductParams = new URLSearchParams();

        let array = new Array();

        let obj = {
          'product_group' : this.AddProductGroup,
          'product_name' : this.AddProductName,
          'product_status' : this.AddProductStatus,
          'product_owner' : this.AddProductOwner,
          'product_barcode' : this.AddProductBarcode
        };

        if(this.AddProductGroup == "group_add"){
          // 재고 + 그룹 추가
          addGroupParams.append('session', this.getCookie("session"));
          addGroupParams.append('product_group_name', this.AddGroupName);
          this.AddGroupRentableDay == "" ? this.AddGroupRentableDay = 0 : 0;
          addGroupParams.append('product_group_rentable', this.AddGroupRentableDay);
          addGroupParams.append('product_group_priority', this.AddGroupPriority);

          this.sendGroupAddData(addGroupParams, obj);
        }else{
          // 재고만 추가
          array.push(obj);
          addProductParams.append('session', this.getCookie("session"));
          addProductParams.append('products', JSON.stringify(array));

          this.sendProductAddData(addProductParams);
        }
      }
    },
    getCookie (_name){
      let value = document.cookie.match(`(^|;) ? ${_name} =([^;]*)(;|$)`);
      return value? value[2] : null;
    },
    test (activeTab){
      if(activeTab == "stockAddTab"){
        this.tabSelect = 0;
      }else if(activeTab == "groupAddTab"){
        this.tabSelect = 1;;
      }
      this.AddGroupRentable = 0;
      this.AddGroupRentableDay = "";
    }
  },
  updated(){
    this.AddProductGroup == "group_add" ? this.showGroupAdd = true : this.showGroupAdd = false;
  }
};
</script>

<style>
.md-tabs-navigation {
  -webkit-box-shadow: none!important;
  box-shadow: none!important;
  margin: 0!important;
  padding: 0!important;
}
.md-tab-nav-button>.md-ripple>.md-button-content {
  color: black!important;
}

.md-tabs.md-theme-default.md-accent .md-tabs-navigation {
  background-color: #00000000!important;
}

.md-tabs.md-theme-default.md-accent .md-tabs-navigation > .md-active {
  border-bottom: solid;
  border-color: blue;
}

.md-list-item-text {
  height: fit-content!important;
}

</style>
