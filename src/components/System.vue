<template>
  <div>
    <Layout>
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu active-name="3-1" theme="light" width="auto" :open-names="['1']">
          <Submenu name="3-1">
            <template slot="title">系统设置管理</template>
            <MenuItem name="3-1" :to="{ name: 'dictionarytype' }">字典分类列表</MenuItem>       
            <MenuItem name="3-2" :to="{ name: 'dictionarylist' }">字典列表</MenuItem>         
            <MenuItem name="3-3" :to="{ name: 'blacklist' }">黑名单列表</MenuItem>
            <MenuItem name="3-4" :to="{ name: 'area' }">地区列表</MenuItem>
          </Submenu>
          <Submenu name="3-2">
            <template slot="title">日志管理</template>
            <MenuItem name="3-4" :to="{ name: 'handle' }">操作日志</MenuItem>
            <MenuItem name="3-5" :to="{ name: 'recylebin' }">回收站</MenuItem>
            <MenuItem name="3-6" :to="{ name: 'manage' }">IP管理</MenuItem>
            <MenuItem name="3-7" :to="{ name: 'note' }">短信日志</MenuItem>
            <MenuItem name="3-8" :to="{ name: 'mail' }">邮件日志</MenuItem>
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