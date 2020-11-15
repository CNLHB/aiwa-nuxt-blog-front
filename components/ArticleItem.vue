<template>
  <div class="article-item article-item-wrapper">
    <!-- 显示文章列表 -->
    <ul class="meta-list">
      <li class="item username clickable">
        <nuxt-link to="/" class="item-link">
          爱华
        </nuxt-link>

      </li>
      <li class="item time">
        <nuxt-link class="item-link-art" :to='"/article/"+article._id'>
          12小时前
        </nuxt-link>
      </li>
      <li class="item tag">
        <nuxt-link to="/" class="item-link">
          JavaScript
        </nuxt-link>
      </li>
      <li class="item">
        <nuxt-link to="/" class="item-link">
          tag1
        </nuxt-link>
      </li>
    </ul>
    <div class="info-row">
        <nuxt-link class="title" :to='"/article/"+article._id'>
          {{ article.title }}
        </nuxt-link>
    </div>
    <div class="action-row">
      <div class="action-left">
        <span class="link-btn">阅读: {{ article.views }}</span>
        <span class="link-btn">赞: {{ article.like }}</span>
        <span class="link-btn">评论: 196</span>
      </div>
    </div>
  </div>
</template>

<script>
import UserDisplay from './UserDisplay.vue'

export default {
  props: ['article'],
  components: {UserDisplay}
}
</script>

<style lang="scss" scoped>
.meta-list {
  display: flex;
  align-items: baseline;
  white-space: nowrap;

  .item {
    color: #b2bac2;
    font-size: 14px;

    .item-link-art {
      color: #b2bac2;
      font-size: 14px;
    }

    .item-link {
      color: #b2bac2;
      font-size: 14px;
    }

    .item-link:hover {
      color: #007fff;
    }
  }

  .item:after {
    content: "·";
    margin: 0 5px;
    color: #b2bac2;

  }

  li:last-child:after {
    content: "" !important;
  }
}

.info-row {
  margin: 6px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
  }
}
.action-row{
  display: flex;
  justify-content: space-between;
  .action-left{
    display: flex;
    align-items: center;
    .link-btn{
      display: inline-flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      height: 24px;
      border: 1px solid #edeeef;
      border-radius: 1px;
      padding-left: 14px;
      padding-right: 14px;
      color: #b3bac1;
      font-size: 14px;
      white-space: nowrap;
    }
  }
}

.article-item {
  padding: 20px 15px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.1);

  .action {
    display: inline-block;
    width: 50px;

  }
}
</style>
