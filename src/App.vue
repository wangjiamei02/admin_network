<template>
  <div class="layout">
    <Layout>
      <admin-box v-if="!$route.meta.showNav"></admin-box>
      <Layout>
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import AdminBox from "./components/AdminBox.vue";
export default {
  components: {
    AdminBox,
  },
};
</script>

<style lang="less" scoped>
.layout {
  // border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
</style>