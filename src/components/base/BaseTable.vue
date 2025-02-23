<script setup lang="ts">
import type { BaseTableColumn } from '@/types/BaseTableColumn';
import _ from 'lodash';
import BaseSpinner from '@/components/base/BaseSpinner.vue';

const emit = defineEmits(['rowClicked', 'rowCtrlClicked']);

const props = defineProps({
    rows: { type: Array as PropType<Record<string, unknown>[]>, required: true },
    columns: { type: Array as PropType<BaseTableColumn[]>, required: true },
    loadingMore: { type: Boolean, default: false },
});

const selectedRowVModel = defineModel({ type: Object });
const hoveredRowIndex = ref<number | null>(null);

function selectRow(row: Record<string, unknown>, isCtrl?: boolean): void {
    if (isCtrl) {
        emit('rowCtrlClicked', row);
        return;
    }
    emit('rowClicked', row);

    if (_.isEqual(selectedRowVModel.value, row)) {
        selectedRowVModel.value = null;
    } else {
        selectedRowVModel.value = _.cloneDeep(row);
    }
}
</script>

<template>
    <table class="base-table">
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key">
                    {{ column.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, index) in rows"
                :key="index"
                :class="{ selected: _.isEqual(selectedRowVModel, row) }"
                @mouseover="hoveredRowIndex = index"
                @mouseleave="hoveredRowIndex = null"
                @focusin="hoveredRowIndex = index"
                @focusout="hoveredRowIndex = null"
                @click.exact="selectRow(row)"
                @click.ctrl="selectRow(row, true)"
                @keyup.enter="selectRow(row)"
            >
                <td v-for="column in columns" :key="column.key">
                    <slot
                        name="cell"
                        :row="row"
                        :cell="row[column.key]"
                        :column="column"
                        :hovered="hoveredRowIndex === index"
                        :index="index"
                    ></slot>
                </td>
            </tr>
            <tr v-if="props.loadingMore">
                <td :colspan="columns.length">
                    <div class="py-4 w-full">
                        <BaseSpinner class="m-auto" />
                    </div>
                </td>
            </tr>
        </tbody>
        <tfoot v-if="$slots.foot">
            <tr>
                <td v-for="column in columns" :key="column.key">
                    <slot name="foot" :column="column"></slot>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<style lang="scss" scoped>
.base-table {
    border-collapse: separate;
    border-spacing: 0;
    display: table;
    font-size: 14px;
    margin: 0;
    width: 100%;
    tr {
        background-color: var(--background-color);
    }
    thead {
        tr {
            position: sticky;
            top: 0;
            z-index: 10;
            th {
                border-bottom: 1px solid var(--border-color);
                font-weight: 600;
                text-align: left;
                padding: 10px 5px;
                color: var(--text-color);
            }
        }
    }

    tbody {
        tr {
            background-color: var(--background-color);
            cursor: pointer;
            &:hover {
                background: var(--hover-color);
            }

            td {
                border-bottom: 1px solid var(--border-color);
                height: 40px;
                padding: 5px;
                color: var(--text-color);
            }
            &.selected {
                background: var(--selected-background-color);
                &:hover {
                    background: var(--selected-background-color);
                }
            }
        }
    }

    tfoot {
        tr {
            position: sticky;
            bottom: 0;
            z-index: 10;
            background-color: var(--background-color);
            td {
                border-top: 2px solid var(--border-color);
                font-size: 13px;
                font-weight: 600;
                padding: 10px 5px;
                color: var(--text-color);
            }
        }
    }
}
</style>
