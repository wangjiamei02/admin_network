<template>
  <div>
    <Layout>
      <Sider hide-trigger :style="{ background: '#fff' }">
        <Menu active-name="2-1" theme="light" width="auto" :open-names="['1']">
        <Submenu name="2-1">
      <template slot="title">功能模块管理</template>
      <MenuItem name="2-1" :to="{ name: 'news' }">新闻列表</MenuItem>
      <MenuItem name="2-2" :to="{ name: 'says' }">说说列表</MenuItem>
      <MenuItem name="2-3" :to="{ name: 'messages' }">留言列表</MenuItem>
      <MenuItem name="2-4" :to="{ name: 'adverts' }">广告列表</MenuItem>
      <MenuItem name="2-5" :to="{ name: 'friendlylink' }">友情链接列表</MenuItem>
      <MenuItem name="2-6" :to="{ name: 'picture' }">图片列表</MenuItem>
      <MenuItem name="2-7" :to="{ name: 'video' }">视频列表</MenuItem>
      <MenuItem name="2-8" :to="{ name:'random' }">随机数列表</MenuItem>
    </Submenu>
    <Submenu name="2-2">
      <template slot="title">用户管理</template>
      <MenuItem name="2-9" :to="{ name: 'user' }">用户列表</MenuItem>
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
export default {
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style scoped>

</style>