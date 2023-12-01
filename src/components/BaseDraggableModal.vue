<script setup lang="ts">
    import { mousedown } from 'src/utils/draggable';
    import { onMounted, onUnmounted, ref, watchEffect } from 'vue';

    const props = defineProps({
        title: {
            type: String,
        },
        width: {
            type: String || Number,
            default: '50%',
        },
        visible: {
            type: Boolean,
            default: false,
        },
        handleClose: {
            type: Function,
        },
        onSubmit: {
            type: Function,
        },
        onCancel: {
            type: Function,
        },
    });

    const modalRef = ref<HTMLElement>();
    const modalHeaderRef = ref<HTMLElement>();

    // 是否渲染过
    const isRender = ref(false);

    watchEffect(() => {
        if (props.visible) {
            isRender.value = true;
        } else {
            props.handleClose && props.handleClose();
        }
    });

    // 鼠标按下
    const down = () => {
        modalRef.value?.addEventListener('mousedown', mousedown);
        (modalHeaderRef.value as HTMLElement).onmouseup = () => {
            modalRef.value?.removeEventListener('mousedown', mousedown);
            (modalHeaderRef.value as HTMLElement).onmouseup = null;
        };
    };

    onMounted(() => {
        modalHeaderRef.value?.addEventListener('mousedown', down);
    });

    onUnmounted(() => {
        modalHeaderRef.value?.removeEventListener('mousedown', down);
    });
</script>

<template>
    <Teleport to="body">
        <div
            v-show="visible"
            class="my-modal-draggable"
            ref="modalRef"
            :style="{ width: width, left: `calc(50% - ${Number(width) / 2})` }"
        >
            <div
                class="modal-header"
                ref="modalHeaderRef"
            >
                <span>{{ title }}</span>
                <span
                    class="edit"
                    @click="onCancel ? onCancel() : {}"
                >
                    <i-ep-Close />
                </span>
            </div>
            <div v-if="isRender">
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <el-button @click="onCancel">取消</el-button>
                        <el-button
                            type="primary"
                            @click="onSubmit"
                        >
                            提交
                        </el-button>
                    </slot>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
    $padding: 12px;
    .my-modal-draggable {
        position: fixed;
        width: 50%;
        top: 15px;
        left: 25%;
        z-index: 999;
        border-radius: 2px;
        background-color: #fff;
        box-shadow:
            0px 12px 32px 4px rgba(0, 0, 0, 0.04),
            0px 8px 20px rgba(0, 0, 0, 0.08);
        /* transform: translate(-50%, -50%); */
        .modal-header {
            display: flex;
            justify-content: space-between;
            padding: $padding;
            cursor: move;
        }
        .modal-body {
            max-height: 50vh;
            overflow: auto;
            padding: $padding;
        }

        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 5px;
            padding: $padding;
        }
    }
</style>
