<template>
  <div>
    <Layout>
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu active-name="4-1" theme="light" width="auto" :open-names="['1']">
          <Submenu name="4-1">
            <template slot="title">权限控制管理</template>
            <MenuItem name="4-1" :to="{ name: 'node' }">节点分类列表</MenuItem>
            <MenuItem name="4-2" :to="{ name: 'role' }">角色列表</MenuItem>
            <MenuItem name="4-3" :to="{ name: 'admin' }">管理员列表</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{ padding: '0 24px 24px' }">
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>