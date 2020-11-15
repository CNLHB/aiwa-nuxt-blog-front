<template>
  <section class="index-content">
    <div class="list-container">
      <header class="list-header">
        <nav class="list-nav">
          <ul class="nav-list left">
            <li class="nav-item router-link-exact-active route-active active"><span> 热门</span></li>
            <li class="nav-item  route-active active"><span> 最新</span></li>
            <li class="nav-item  route-active active" :class="{'item-right':2}"><span> 热门</span></li>
          </ul>
        </nav>
      </header>
      <ul class="article-container">

        <ArticleItem
          v-for="article in articles"
          :article="article"
          :key="article._id">
        </ArticleItem>

      </ul>

    </div>
    <div class="sidebar" id="sidebar">
      <div class="author-about">
        <img
          src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e8e185887f54426aabb36ae15ae1ef7~tplv-k3u1fbpfcp-zoom-1.image"
          class="banner-image">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>🎖️作者榜</span>
          </div>
          <!--          <div class="author-desc">-->
          <!--            <div class="author-avatar-container">-->
          <!--              <img class="author-avatar-left" :src="1" alt="">-->
          <!--            </div>-->
          <!--            <div class="author-info">-->
          <!--              <a class="link-name info-box" :href="'/user/'+ 1">{{ 1111 }}</a>-->
          <!--              <div class="author-desc-info info-box">全干工程师 @ 成都华安</div>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="stat-item item">
            <!--            <i class="el-icon-delete"></i>-->
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26"
                 viewBox="0 0 25 26" class="zan">
              <g fill="none" fill-rule="evenodd" transform="translate(0 .57)">
                <ellipse cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5"
                         ry="12.57"></ellipse>
                <path fill="#7BB9FF"
                      d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"></path>
              </g>
            </svg>
            <span>获得点赞</span>
          </div>
          <div class="stat-item item">
            <svg width="25" height="25" viewBox="0 0 25 25"
                 class="icon stat-view-icon">
              <g fill="none" fill-rule="evenodd">
                <circle cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle>
                <path fill="#7BB9FF"
                      d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"></path>
              </g>
            </svg>
            <span>文章被阅读 </span>
          </div>
        </el-card>

      </div>
    </div>
  </section>

</template>

<script>
import ArticleItem from '~/components/ArticleItem.vue'

export default {
  components: {ArticleItem},
  layout: 'default',
  data() {
    return {
      articles: []
    }
  },
  async mounted() {
    let ret = await this.$http.get('/article')
    if (ret.code == 0) {
      this.articles = ret.data
    }

  }
}
</script>

<style lang="scss" scoped>
.index-content {
  display: flex;
  background-color: #f4f5f5;
  height: 100%;

  .list-container {
    display: block;
    position: relative;
    width: 700px;
    max-width: 100%;
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
  }
}

.list-nav {
  display: flex;
  justify-content: flex-start;
}

.nav-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
}

.nav-item {
  position: relative;
  cursor: pointer;
  padding: 0 12px;
  border-right: 1px solid hsla(0, 0%, 59.2%, .2);

}


.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

}


.article-item-wrapper {
  height: 115px;

}

.item-right {
  border-right: 0;
}

.router-link-exact-active {
  color: #007fff;
}

.active:hover {
  color: #007fff;
}

.list-header {
  padding: 15px 12px;
  font-size: 12px;
  border-bottom: 1px solid hsla(0, 0%, 59.2%, .1);
}


/*sidebar-block author-block shadow*/
.banner-image {
  width: 100%;
  padding: 2px;
  box-sizing: border-box;

}

.author-about {
  position: absolute;
  top: 0;
  right: 0;
  width: 240px;
  background-color: #fbfbfb;
}

@media screen and (max-width: 1000px) {
  #sidebar {
    display: none;
  }
  .blog-container {
    width: 100%;
  }
}

@media screen and (max-width: 1000px) {
  #sidebar {
    display: none;
  }
  .index-content {
    .list-container {
      width: 100%;
    }
  }

}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
