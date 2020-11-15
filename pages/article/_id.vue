<template>
  <div class="detail-container">
    <div class="blog-container">
      <div class="user-container">
        <author
          :user="article.author"
          :isFollow="isFollow"
          :views="article.views"
          :createdAt="article.createdAt"
          @toggleFollow="toggleFollow"
          :uid="user._id"
        >
        </author>
      </div>
      <template v-if="content.length > 0">
        <mavon-editor
          style="height: 100%;box-shadow: none; "
          :ishljs="true"
          v-model="content"
          :defaultOpen="'preview'"
          :editable="false"
          :subfield="false"
          :toolbarsFlag="false">
        </mavon-editor>
      </template>
    </div>
    <div class="sidebar" id="sidebar">
      <div class="author-about">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>关于作者</span>
          </div>
          <div class="author-desc">
              <div class="author-avatar-container">
                <img class="author-avatar-left" :src="article.author.avatar" alt="">
              </div>
              <div class="author-info">
                <a class="link-name info-box" :href="'/user/'+ article.author._id">{{article.author.nickname}}</a>
                <div class="author-desc-info info-box">全干工程师 @ 成都华安</div>
              </div>
          </div>
          <div class="stat-item item">
<!--            <i class="el-icon-delete"></i>-->
            <svg data-v-52d07ee0="" data-v-71f2d09e="" xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" class="zan"><g data-v-52d07ee0="" data-v-71f2d09e="" fill="none" fill-rule="evenodd" transform="translate(0 .57)"><ellipse data-v-52d07ee0="" data-v-71f2d09e="" cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5" ry="12.57"></ellipse> <path data-v-52d07ee0="" data-v-71f2d09e="" fill="#7BB9FF" d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"></path></g></svg>
            <span>获得点赞</span>
          </div>

          <div class="stat-item item">
            <svg data-v-52d07ee0="" data-v-71f2d09e="" width="25" height="25" viewBox="0 0 25 25" class="icon stat-view-icon"><g data-v-52d07ee0="" data-v-71f2d09e="" fill="none" fill-rule="evenodd"><circle data-v-52d07ee0="" data-v-71f2d09e="" cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle> <path data-v-52d07ee0="" data-v-71f2d09e="" fill="#7BB9FF" d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"></path></g></svg>
            <span>文章被阅读 </span>
          </div>
        </el-card>

      </div>
    </div>
  </div>
</template>

<script>
import Author from '~/components/Author-Desc.vue'
import {mapState} from 'vuex'

export default {
  layout: 'detail',
  components: { Author},
  data() {
    return {
      isFollow: false,
      content: '',
      article: {
        title: "",
        views: 0,
        createdAt: '',
        author: {}
      }
    }
  },
  computed: {
    ...mapState('user', {
      user: state => state
    })
  },
  mounted() {
    let {id} = this.$route.params
    this.id = id
    this.getArticle()
  },
  methods: {
    async follow() {
      let ret = await this.$http.put('/user/follow/' + this.article.author._id)
      this.checkFollowStatus()
    },

    async unfollow() {
      let ret = await this.$http.delete('/user/follow/' + this.article.author._id)
      this.checkFollowStatus()
    },
    toggleFollow() {
      console.log(this.isFollow)
      if (this.isFollow) {
        this.unfollow()
      } else {
        this.follow()
      }
    },
    async getArticle() {
      let ret = await this.$http.get('/article/' + this.id)
      this.article = ret.data
      //ret.data.title
      document.title = ret.data.title
      this.content = ret.data.content
      // 查询我和文章作者的关注关系
      this.checkFollowStatus()
    },
    async checkFollowStatus() {
      let isFollow = await this.$http.get('/user/isfollow/' + this.article.author._id)
      if (isFollow.code == 0) {
        this.isFollow = isFollow.data.isFollow
      }
    }
  }
}
</script>

<style scoped lang="scss">
.detail-container {
  position: relative;
  min-height:80vh;
  height: 100%;
}

.user-container {
  background-color: #ffffff;
  padding: 24px 0;
}

.blog-container {
  position: relative;
  width: 700px;
  max-width: 100%;
  background-color: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  height: 90%;
}
.info-box{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.author-desc{
  display: flex;
  padding:  0 0 15px 0;
}
.author-info{
  flex: 1;
}

.author-desc-info{
  margin-top: 8px;
  font-size: 16px;
  color: #72777b;
  max-width: 135px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.link-name{
  font-size: 16px;
  font-weight: 600;
  color: #000;
  text-decoration: none;
}
.author-avatar-container{
  height: 50px;
  width: 50px;
  margin-right: 12px;
  .author-avatar-left{
    height: 100%;
    width: 100%;
    border-radius: 50%;

  }
}
.item{
  display: flex;
  align-items: center;
  padding: 0 0px 8px;
  span{
    padding-left: 15px;
    color: #000;
    font-size: 15px;
  }
}
/*sidebar-block author-block shadow*/
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
</style>
