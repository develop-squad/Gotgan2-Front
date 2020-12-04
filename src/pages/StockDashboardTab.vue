<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">
              {{ this._props.englishSwitch ? "Stock" : "재고 현황" }}
            </h4>
            <p class="category">
              {{
                this._props.englishSwitch
                  ? "Show the present condition of stock"
                  : "재고 현황"
              }}
            </p>
          </md-card-header>

          <md-card-content>
            <stock-table
              table-header-color="red"
              :englishSwitch="englishSwitch"
            ></stock-table>
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item md-size-50">
        <chart-card
          :chart-data="rentChart.data"
          :chart-options="rentChart.options"
          chart-type="Line"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">
              {{ this._props.englishSwitch ? "Rent Chart" : "대여 현황" }}
            </h4>
            <p class="category">
              <span class="text-success"
                ><i class="fa fa-long-arrow-up"></i> 55%
              </span>
              {{
                this._props.englishSwitch
                  ? "Increase the previous month."
                  : "전월 대비 증가"
              }}
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              {{
                this._props.englishSwitch
                  ? "Updated 4 minutes ago"
                  : "4분 전 업데이트"
              }}
            </div>
          </template>
        </chart-card>
      </div>

      <div class="md-layout-item md-size-50">
        <chart-card
          :chart-data="overdueChart.data"
          :chart-options="overdueChart.options"
          chart-type="Line"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">
              {{
                this._props.englishSwitch
                  ? "Overdue Chart"
                  : "반납 연체 현황"
              }}
            </h4>
            <p class="category">
              <span class="text-success"
                ><i class="fa fa-long-arrow-up"></i> 10%
              </span>
              {{
                this._props.englishSwitch
                  ? "Decrease the previous month."
                  : "전월 대비 감소"
              }}
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              {{
                this._props.englishSwitch
                  ? "Updated 4 minutes ago"
                  : "4분 전 업데이트"
              }}
            </div>
          </template>
        </chart-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StockTable, ChartCard } from "@/components";

export default {
  props: {
    englishSwitch: Boolean,
  },
  components: {
    StockTable,
    ChartCard,
  },
  data() {
    return {
      rentChart: {
        data: {
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, 
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      overdueChart: {
        data: {
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
          series: [[15, 12, 7, 5, 8, 10, 9]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 20,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
    };
  },
};
</script>
