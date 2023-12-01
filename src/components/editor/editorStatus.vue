<script setup lang="ts"></script>
<template>
    <div id="abortText">
        状态：
        <span id="lblStatus">...</span>
    </div>
</template>

<style scoped>
    #abortText {
        height: 20px;
        text-align: left;
        background-color: #e6e6e6;
        border-bottom: 1px solid black;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }
</style>
