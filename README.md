# front

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

```
      <el-col :span="12">
        <!-- markdown编辑器 -->
        <mavon-editor
          style="height: 100%"
          :ishljs="true"
          v-model="detail.content"
          :defaultOpen="'preview'"
          :editable="false"
          :subfield="false"
          :toolbarsFlag="false">
        </mavon-editor>
<!--        <textarea class="md-editor" :value="content" @input="update"></textarea>-->
      </el-col>
      <el-col :span="12">
<!--        <div class="markdown-body" v-html="compiledHtml">-->

          <!-- html显示 -->
        </div>
      </el-col>```
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
