<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">
              {{
                this._props.englishSwitch_Tab
                  ? "Rent Request"
                  : "대여 신청 현황"
              }}
            </h4>
            <p class="category">
              {{
                this._props.englishSwitch_Tab
                  ? "Show about the current requested rent info"
                  : "현재 신청되어 있는 대여 정보 보여주기"
              }}
            </p>
          </md-card-header>

          <md-card-content>
            <rent-request-table
              table-header-color="red"
              :userInfo_Table="userInfo_Tab"
              :englishSwitch_Table="englishSwitch_Tab"
            ></rent-request-table>
          </md-card-content>
        </md-card>

        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">
              {{ this._props.englishSwitch_Tab ? "Rent Status" : "반출 현황" }}
            </h4>
            <p class="category">
              {{
                this._props.englishSwitch_Tab
                  ? "Show about the current rent status"
                  : "현재 반출되어 있는 재고 보여주기"
              }}
            </p>
          </md-card-header>

          <md-card-content>
            <rent-status-table
              table-header-color="red"
              :userInfo_Table="UserInfoTab"
              :englishSwitch_Table="englishSwitch_Tab"
            ></rent-status-table>
          </md-card-content>
        </md-card>
      </div>
    </div>

    <md-dialog :md-active.sync="showAllowDialog">
      <md-dialog-title>{{
        this._props.englishSwitch_Tab ? "Rent Allow" : "대여 허가"
      }}</md-dialog-title>

      <md-dialog-content>
        <p>
          {{ this._props.englishSwitch_Tab ? "Name" : "이름" }} :
          {{ dialogInfo.rent_user_name }}
        </p>
        <p>
          {{ this._props.englishSwitch_Tab ? "Product" : "대여 품목" }} :
          {{ dialogInfo.rent_product_name }}
        </p>
        <p>
          {{
            this._props.englishSwitch_Tab ? "Rent Start date" : "대여 시작일"
          }}
          : {{ dialogInfo.rent_time_start }}
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="sendAllowButton">{{
          this._props.englishSwitch_Tab ? "Allow" : "허가"
        }}</md-button>
        <md-button class="md-primary" @click="showAllowDialog = false">{{
          this._props.englishSwitch_Tab ? "Cancel" : "취소"
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showRejectDialog">
      <md-dialog-title>{{
        this._props.englishSwitch_Tab ? "Rent Reject" : "대여 거부"
      }}</md-dialog-title>

      <md-dialog-content>
        <p>
          {{ this._props.englishSwitch_Tab ? "Name" : "이름" }} :
          {{ dialogInfo.rent_user_name }}
        </p>
        <p>
          {{ this._props.englishSwitch_Tab ? "Product" : "대여 품목" }} :
          {{ dialogInfo.rent_product_name }}
        </p>
        <p>
          {{
            this._props.englishSwitch_Tab ? "Rent Start Date" : "대여 시작일"
          }}
          : {{ dialogInfo.rent_time_start }}
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="sendRejectButton">{{
          this._props.englishSwitch_Tab ? "Reject" : "거부"
        }}</md-button>
        <md-button class="md-primary" @click="showRejectDialog = false">{{
          this._props.englishSwitch_Tab ? "Cancel" : "취소"
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showReturnDialog">
      <md-dialog-title>{{
        this._props.englishSwitch_Tab ? "Return Check" : "반납 확인"
      }}</md-dialog-title>

      <md-dialog-content>
        <p>
          {{ this._props.englishSwitch_Tab ? "Name" : "이름" }} :
          {{ dialogInfo.rent_user_name }}
        </p>
        <p>
          {{ this._props.englishSwitch_Tab ? "Product" : "대여 품목" }} :
          {{ dialogInfo.rent_product_name }}
        </p>
        <p>
          {{
            this._props.englishSwitch_Tab ? "Rent Start Date" : "대여 시작일"
          }}
          : {{ dialogInfo.rent_time_start }}
        </p>
        <p>
          {{ this._props.englishSwitch_Tab ? "Rent End Date" : "대여 종료일" }}
          : {{ dialogInfo.rent_time_end }}
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="sendReturnButton">{{
          this._props.englishSwitch_Tab ? "Check" : "확인"
        }}</md-button>
        <md-button class="md-primary" @click="showReturnDialog = false">{{
          this._props.englishSwitch_Tab ? "Cancel" : "취소"
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { RentRequestTable, RentStatusTable } from "@/components";

export default {
  created() {
    let vue = this;

    this.$EventBus.$on("allowButton", (params) => {
      vue.showAllow(params);
    });

    this.$EventBus.$on("rejectButton", (params) => {
      vue.showReject(params);
    });

    this.$EventBus.$on("returnButton", (params) => {
      vue.showReturn(params);
    });
  },
  props: {
    UserInfoTab: Object,
    englishSwitch_Tab: Boolean,
  },
  data() {
    return {
      showAllowDialog: false,
      showRejectDialog: false,
      showReturnDialog: false,
      dialogInfo: {},
    };
  },
  components: {
    RentRequestTable,
    RentStatusTable,
  },
  methods: {
    showAllow(obj) {
      console.log(obj);
      this.dialogInfo = obj;
      this.showAllowDialog = true;
    },
    showReject(obj) {
      console.log(obj);
      this.dialogInfo = obj;
      this.showRejectDialog = true;
    },
    showReturn(obj) {
      console.log(obj);
      this.dialogInfo = obj;
      this.showReturnDialog = true;
    },
    sendAllowButton() {
      console.log(this.dialogInfo);
      // let vue = this;
      this.showAllowDialog = false;
      this.$EventBus.$emit("sendAllow", vue.dialogInfo.rent_index);
    },
    sendRejectButton() {
      // let vue = this;
      this.showRejectDialog = false;
      this.$EventBus.$emit("sendReject", vue.dialogInfo.rent_index);
    },
    sendReturnButton() {
      // let vue = this;
      this.showReturnDialog = false;
      this.$EventBus.$emit("sendReturn", vue.dialogInfo.rent_index);
    },
  },
};
</script>
