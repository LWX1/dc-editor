<script setup lang="ts">
    import { CSubDocument } from 'src/utils/subDocument';
    import { ref } from 'vue';

    // import { RecordData } from 'src/config/editorRecord';
    const recordData = ref();

    // 获取病程记录
    const getCourseList = (subDocument: CSubDocument) => {
        recordData.value = subDocument.getCourseRecords();
    };

    defineExpose({
        getCourseList,
    });
</script>
<template>
    <div class="record-list-box">
        <div
            v-for="item in recordData || []"
            :key="item.ID"
            class="record-list edit"
        >
            <span>{{ item.Title }}</span>
            <span>{{ item.Attributes?.RegionCreatTime }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .record-list-box {
        .record-list {
            display: flex;
            margin-bottom: 10px;
            gap: 5px;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>
