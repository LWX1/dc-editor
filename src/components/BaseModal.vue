<template>
    <el-dialog
        v-model="open"
        :title="title"
        :width="width"
        :before-close="handleClose"
        v-bind="$attrs"
    >
        <div :class="$attrs.fullscreen ? '' : 'my-modal-style'">
            <slot></slot>
        </div>
        <template
            #footer
            v-if="showFooter"
        >
            <div style="display: flex; justify-content: flex-end">
                <el-button @click="onCancel">{{ cancelText }}</el-button>
                <el-button
                    v-if="!hiddenSubmit"
                    type="primary"
                    @click="onSubmit"
                >
                    {{ okText }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';

    const open = ref(false);

    const props = defineProps({
        visible: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '提示',
        },
        handleClose: {
            type: Function,
            default: () => {},
        },
        onSubmit: {
            type: Function,
            default: () => ({}),
        },
        hiddenSubmit: {
            type: Boolean,
            default: false,
        },
        onCancel: {
            type: Function,
            default: () => {},
        },
        width: {
            type: String || Number,
            default: '50%',
        },
        showFooter: {
            type: Boolean,
            default: true,
        },
        okText: {
            type: String,
            default: '提交',
        },
        cancelText: {
            type: String,
            default: '取消',
        },
    });
    watch(
        () => props.visible,
        (value) => {
            open.value = value;
        }
    );
</script>

<style lang="scss" scoped>
    .my-modal-style {
        max-height: 50vh;
        overflow: auto;
    }
</style>
