<template>
  <div class="new-container">
    <div class="write-btn">
      <input v-model="title" placeholder="请输入文章标题..." class="article-title"></input>
      <div class="nickname-space">
        <el-button @click="submit" type="primary">发布</el-button>
        <nuxt-link class="nickname" :to="'/user/'+$store.state.user._id">
          <el-avatar :src="$store.state.user.avatar"></el-avatar>
        </nuxt-link>
      </div>
    </div>
    <!-- markdown编辑器 -->
    <div class="article-detail" id="article-detail">
      <template v-if="$store.state.user._id">
        <mavon-editor
          height="100%"
          ref="markdownEditor"
          @change="handleMarkdownChange"
          @save="handleEditorSave"
          @imgAdd="imgAdd"
          @imgDel="imgDel"
          :ishljs="true"
          v-model="content"
        />
      </template>

    </div>

  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import {formData} from '../../utils/base64ToFormData'


export default {
  layout: "editor",
  data() {
    return {
      title: '',
      content: ``,
      detail: {
        content: ``

      }
    }
  },
  methods: {
    handleMarkdownChange: debounce(function (e) {
      console.log(e)
    }, 250),
    async submit() {
      let ret = await this.$http.post('/article/create', {content: this.content, title: this.title})
      if (ret.code === 0) {
        this.$notify({
          title: '创建成功',
          type: 'success',
          message: `文章《${this.title}》发布成功`
        })
        setTimeout(() => {
          this.$router.push({path: '/article/' + ret.data.id})
        }, 1000)
      }
    },

    handleEditorSave() {
      console.log('save')
    },
    async imgAdd(value, $file) {
      // $file
      let form = formData($file.miniurl, $file.name, $file.type)

      let ret = await this.$http.post('/upload', form, {headers: {'Content-Type': 'multipart/form-data'}})
      if (ret && ret.code == 0) {
        //(timg.jpg)](.+)
        var patt = new RegExp(`${$file.name}](.+)`,);
        this.content = this.content.replace(patt, `${$file.name}](${ret.data})`)
      }
    },
    imgDel(value, $file) {
      console.log('imgDel')
    }

  }

}
</script>

<style>
.new-container {
  height: 92vh;
}

.markdown-body {
  height: 100%;
}

.write-btn {
  display: flex;
  justify-content: space-between;
  padding-right: 15px;
  padding-left: 15px;
  z-index: 500;
  height: 60px;
  align-items: center;
  background-color: #ffffff;
}

.article-title {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  border: none;
  outline: none;

}

.nickname-space {
  display: flex;
}

.nickname {
  padding-left: 15px;
}
</style>
<style lang="scss" scoped>
//v-note-wrapper markdown-body shadow
.container {
  box-sizing: border-box;
  position: relative;
  width: 70%;
  min-height: 700px;
  margin: 24px auto;

  & .content {
    box-sizing: border-box;
    padding: 32px;
    position: relative;
    width: 100%;
    background: #fff;
    border-radius: 8px;

    & .article-title {
      font-size: 54px;
      color: #404040;
    }

    & .article-info {
      width: 100%;

      & p {
        display: inline-block;
        margin-right: 24px;
        margin-top: 24px;
        font-size: 16px;
        color: #9ea7b4;
      }

      & p.article-category {
        height: 32px;
        line-height: 32px;
        padding: 0 32px;
        font-size: 16px;
        color: #409EFF;
        border-radius: 32px;
        background: rgba(51, 119, 255, .1);
      }
    }

    & .article-detail {
      font-size: 20px;
      color: #657180;
      line-height: 48px;
      margin-top: 32px;
    }
  }
}

.min-height {
  min-height: 700px;
}

@media screen and (min-width: 200px) and (max-width: 768px) {
  .container {
    width: 100%;
  }
  .container .content .article-info p.article-created-at {
    display: none;
  }
}

</style>
<style lang="scss">
#article-detail {
  height: 100%;

  & .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
  }

  & .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background: #fff !important;
  }

  & .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper {
    padding: 0 !important;
  }

  & .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    padding: 0 !important;
  }
}
</style>

