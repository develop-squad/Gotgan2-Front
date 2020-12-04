<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">
              {{
                this._props.englishSwitch
                  ? "Rent Request"
                  : "대여 신청 현황"
              }}
            </h4>
            <p class="category">
              {{
                this._props.englishSwitch
                  ? "Show about the current requested rent info"
                  : "현재 신청되어 있는 대여 정보 보여주기"
              }}
            </p>
          </md-card-header>

          <md-card-content>
            <rent-request-table
              table-header-color="red"
              :englishSwitch="englishSwitch"
            ></rent-request-table>
          </md-card-content>
        </md-card>

        <md-card>
          <md-card-header data-background-color="red">
            <h4 class="title">
              {{ this._props.englishSwitch ? "Rent Status" : "반출 현황" }}
            </h4>
            <p class="category">
              {{
                this._props.englishSwitch
                  ? "Show about the current rent status"
                  : "현재 반출되어 있는 재고 보여주기"
              }}
            </p>
          </md-card-header>

          <md-card-content>
            <rent-status-table
              table-header-color="red"
              :englishSwitchle="englishSwitch"
            ></rent-status-table>
          </md-card-content>
        </md-card>
      </div>
    </div>

    <md-dialog :md-active.sync="showAllowDialog">
      <md-dialog-title>{{
        this._props.englishSwitch ? "Rent Allow" : "대여 허가"
      }}</md-dialog-title>

      <md-dialog-content>
        <p>
          {{ this._props.englishSwitch ? "Name" : "이름" }} :
          {{ dialogInfo.rent_user_name }}
        </p>
        <p>
          {{ this._props.englishSwitch ? "Product" : "대여 품목" }} :
          {{ dialogInfo.rent_product_name }}
        </p>
        <p>
          {{
            this._props.englishSwitch ? "Rent Start date" : "대여 시작일"
          }}
          : {{ dialogInfo.rent_time_start }}
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="onClickButton(showAllowDialog, 'sendAllow')"
          >{{ this._props.englishSwitch ? "Allow" : "허가" }}</md-button
        >
        <md-button class="md-primary" @click="showAllowDialog = false">{{
          this._props.englishSwitch ? "Cancel" : "취소"
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showRejectDialog">
      <md-dialog-title>{{
        this._props.englishSwitch ? "Rent Reject" : "대여 거부"
      }}</md-dialog-title>

      <md-dialog-content>
        <p>
          {{ this._props.englishSwitch ? "Name" : "이름" }} :
          {{ dialogInfo.rent_user_name }}
        </p>
        <p>
          {{ this._props.englishSwitch ? "Product" : "대여 품목" }} :
          {{ dialogInfo.rent_product_name }}
        </p>
        <p>
          {{
            this._props.englishSwitch ? "Rent Start Date" : "대여 시작일"
          }}
          : {{ dialogInfo.rent_time_start }}
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="onClickButton(showRejectDialog, 'sendReject')"
          >{{ this._props.englishSwitch ? "Reject" : "거부" }}</md-button
        >
        <md-button class="md-primary" @click="showRejectDialog = false">{{
          this._props.englishSwitch ? "Cancel" : "취소"
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showReturnDialog">
      <md-dialog-title>{{
        this._props.englishSwitch ? "Return Check" : "반납 확인"
      }}</md-dialog-title>

      <md-dialog-content>
        <p>
          {{ this._props.englishSwitch ? "Name" : "이름" }} :
          {{ dialogInfo.rent_user_name }}
        </p>
        <p>
          {{ this._props.englishSwitch ? "Product" : "대여 품목" }} :
          {{ dialogInfo.rent_product_name }}
        </p>
        <p>
          {{
            this._props.englishSwitch ? "Rent Start Date" : "대여 시작일"
          }}
          : {{ dialogInfo.rent_time_start }}
        </p>
        <p>
          {{ this._props.englishSwitch ? "Rent End Date" : "대여 종료일" }}
          : {{ dialogInfo.rent_time_end }}
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="onClickButton(showReturnDialog, 'sendReturn')"
          >{{ this._props.englishSwitch ? "Check" : "확인" }}</md-button
        >
        <md-button class="md-primary" @click="showReturnDialog = false">{{
          this._props.englishSwitch ? "Cancel" : "취소"
        }}</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { RentRequestTable, RentStatusTable } from "@/components";

export default {
  props: {
    englishSwitch: Boolean,
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
  mounted() {
    this.$EventBus.$on("allowButton", (params) => {
      showDialog(showAllow, params);
    });

    this.$EventBus.$on("rejectButton", (params) => {
      showDialog(showReject, params);
    });

    this.$EventBus.$on("returnButton", (params) => {
      showDialog(showReturn, params);
    });
  },
  methods: {
    showDialog(type, dialogInfo) {
      this.dialogInfo = dialogInfo;
      this[type] = true;
    },
    onClickButton(type, showDialog) {
      this[showDialog] = false;
      this.$EventBus.$emit(type, this.dialogInfo.rent_index);
    },
  },
};
</script>
