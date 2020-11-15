<template>
  <div class="userinfo-container">
    <div class="author-avatar">
      <!-- 显示用户名字，头像，并且点击到详情页 -->
      <nuxt-link :to="url">
        <img class="user-avatar" :src="user.avatar" alt="">
      </nuxt-link>
    </div>
    <div class="article-desc">
      <a :href="url" class="author-name" target="_blank">{{ user.nickname }}</a>
      <div class="article-time">
        <span class="time">{{ crateTime }}</span>
        <span class="read">阅读 {{ views }}</span>
      </div>
    </div>
    <div class="follow-container">
<!--      <el-button type="success" :plain="plain" :loading="loading" v-if="uid!=user._id" @click="tpoggleFollow">-->
<!--        <span v-if="isFollow">已关注</span>-->
<!--        <span v-else>关注</span>-->
<!--      </el-button>-->
            <button :class="{ 'follow-button': true, 'followed': isFollow }" @click="tpoggleFollow">
              <span v-if="isFollow">已关注</span>
              <span v-else>关注</span>
            </button>
    </div>
  </div>
</template>

<script>
import time from '../utils/time.js'

export default {
  name: "Author-Desc",
  props: ['user', 'isFollow', 'views', 'createdAt', 'uid'],
  data() {
    return {
      loading: false,
      plain: this.isFollow ? 'plain' : ''
    }
  },
  computed: {
    url() {
      return '/user/' + (this.user._id || this.user.id)
    },
    crateTime() {
      return time.dateFormat(this.createdAt, 'YYMMDD')
    }
  },
  methods: {
    async tpoggleFollow() {
      await this.$emit('toggleFollow')
    }
  }
}
</script>

<style scoped lang="scss">
.author-avatar {
  margin-right: 12px;
  height: 40px;
  width: 40px;

  .user-avatar {
    height: 40px;
    width: 40px;
    margin-right: 1rem;
    border-radius: 50%;
  }
}

.author-name {
  width: 100%;
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
}

.article-desc {
  flex: 1;
  height: 40px;
}

.article-time {
  font-size: 0.8rem;
  color: #909090;
}

.follow-button {
  margin: 0 0 0 auto;
  padding: 0;
  width: 55px;
  height: 26px;
  font-size: 13px;
  border: 1px solid #6cbd45;
  color: #6cbd45;
  background-color: #fff;
}

.followed {
  color: #fff;
  border-color: #6cbd45;
  background-color: #6cbd45;
}

.userinfo-container {
  display: flex;
  padding: 0 25px;
  height: 40px;
  justify-content: space-between;
  align-items: center;
}
</style>
