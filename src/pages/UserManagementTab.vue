<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">
              {{ this._props.englishSwitch ? "User Management" : "유저 관리" }}
            </h4>
            <p class="category">
              {{
                this._props.englishSwitch
                  ? "Card about user management"
                  : "유저 관리 관련 카드"
              }}
            </p>
          </md-card-header>
          <md-card-content>
            <user-table :englishSwitch="englishSwitch"></user-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { UserTable } from "@/components";

export default {
  props: {
    englishSwitch: Boolean,
  },
  components: {
    UserTable,
  },
};
</script>
