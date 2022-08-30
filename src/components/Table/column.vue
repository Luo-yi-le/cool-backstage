<template>
  <el-table-column
    v-bind="$attrs"
    v-on="$listeners"
    :prop="column.prop"
    :label="column.label"
    :type="column.type"
    :index="column.index"
    :column-key="column.columnKey"
    :width="column.width"
    :min-width="column.minWidth"
    :fixed="column.fixed"
    :render-header="column.renderHeader"
    :sortable="column.sortable || false"
    :sort-method="column.sortMethod"
    :sort-by="column.sortBy"
    :sort-orders="column.sortOrders"
    :resizable="column.resizable || true"
    :formatter="column.formatter"
    :show-overflow-tooltip="column.showOverflowTooltip || true"
    :align="column.align || align || 'left'"
    :header-align="column.headerAlign || headerAlign || column.align || align || 'left'"
    :class-name="column.className"
    :label-class-name="column.labelClassName"
    :selectable="column.selectable"
    :reserve-selection="column.reserveSelection || false"
    :filters="column.filters"
    :filter-placement="column.filterPlacement"
    :filter-multiple="column.filterMultiple"
    :filter-method="column.filterMethod"
    :filtered-value="column.filteredValue"
  >
    <template slot="header" slot-scope="scope">
      <mimi-render
        v-if="column.renderHeader"
        :scope="scope"
        :render="column.renderHeader"
      >
      </mimi-render>
      <span v-else>{{ scope.column.label }}</span>
    </template>

    <template slot-scope="scope">
      <mimi-render :scope="scope" :render="column.render"> </mimi-render>
    </template>

    <template v-if="column.children">
      <mimi-column v-for="(col, index) in column.children" :key="index" :column="col">
      </mimi-column>
    </template>
  </el-table-column>
</template>

<script>
import MimiRender from "./render";
import forced from "./forced.js";
export default {
  name: "MimiColumn",
  props: {
    column: mimi.vue.getPropObject(),
    headerAlign: mimi.vue.getPropString(),
    align: mimi.vue.getPropString(),
  },
  components: {
    MimiRender,
  },
  methods: {
    setColumn() {
      if (this.column.type && forced[this.column.type]) {
        this.column.renderHeader = forced[this.column.type].renderHeader;
        this.column.render = this.column.render || forced[this.column.type].renderCell;
      } else if (this.column.type && mimi.format.assert(this.column.type)) {
        this.column.render = (h, scope) => {
          let value = mimi.script.clone(scope.row[scope.column.property]);
          return (
            <span
              class={"filed-" + this.column.prop}
              domPropsInnerHTML={mimi.format.make(this.column.type, value, this.column)}
            ></span>
          );
        };
      }
      if (this.column.formatter) {
        this.column.render = (h, scope) => {
          return (
            <span
              class={"filed-" + this.column.prop}
              domPropsInnerHTML={scope.column.formatter(
                scope.row,
                scope.column,
                scope.row,
                scope.$index,
                this.column
              )}
            ></span>
          );
        };
      }
      if (!this.column.render) {
        this.column.render = (h, scope) => {
          return (
            <span
              class={"filed-" + this.column.prop}
              domPropsInnerHTML={scope.row[scope.column.property]}
            ></span>
          );
        };
      }
    },
  },
  watch: {
    column: {
      handler() {
        this.setColumn();
      },
      immediate: true,
    },
  },
};
</script>
