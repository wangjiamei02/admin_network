<template>
    <div>
       <p :class="text">暂时没有相关记录</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text:"text"
            }
        }
    }
</script>

<style lang="less" scoped>
.text{
    text-align: center;
    color: #f00;
    font-size: 14px;
}
</style>