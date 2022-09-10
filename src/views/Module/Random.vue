<template>
    <div>
    <Breadcrumb :style="{ margin: '24px 0' }">
      <BreadcrumbItem>
        <Icon type="md-sync" :class="{ update }" @click="updatePage()" />
      </BreadcrumbItem>
      <BreadcrumbItem>随机数列表</BreadcrumbItem>
    </Breadcrumb>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                update:"update",

            }
        },
        methods:{
                // 蓝色图标的刷新
                updatePage() {
                this.$router.go(0);
                },
        }
    }
</script>

<style lang="less" scoped>
.update {
  color: #337ab7;
  font-weight: bold;
  font-size: 22px;
  transform: rotate(-52deg);
  line-height: 12px;
}
</style>