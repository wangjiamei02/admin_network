<template>
  <div>
    <!-- 说明 -->
    <div :class="{ explain }">
      <h5>说明:</h5>
      <p>删除时，会连同子菜单一块儿删除，请谨慎操作</p>
    </div>
    <p :class="text">请选择字典分类</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      explain: "explain",
      text: "text",
    };
  },
};
</script>

<style lang="less" scoped>
.explain {
  height: 90px;
  padding: 20px 0px;
  border-bottom: 1px solid #dddddd;
  p {
    color: #a94442;
    padding-top: 10px;
  }
}
.text {
  text-align: center;
  color: #f00;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>