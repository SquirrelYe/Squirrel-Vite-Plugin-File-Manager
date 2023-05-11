# Squirrel Vite Plugin File Manager

<p align="left">
  <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/@squirreljs/squirrel-vite-plugin-filemanager.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/@squirreljs/squirrel-vite-plugin-filemanager.svg" alt="node compatibility"></a>
</p>

🎉 Squirrel Vite Plugin File Manager 是一款用于打包多个文件夹为单独 zip 文件的 Vite 插件，简化部署和组织项目。用这个实用工具提升你的 Vite 项目体验!

## 轻松掌握 Vite 产物打包

- 👉 这是一款专门针对 Vite 的 Plugin，可以让我们快速打包多个文件夹，生成 zip 文件。再也不用担心部署时丢失文件了，一键压缩，方便快捷！👏
- 💡 想象一下，你在开发过程中需要使用到多个文件夹，这时候你只需要在 Vite 配置中加入该插件，就能将它们全部打包为 zip 文件，方便部署和传输。简直是程序猿的福音啊！😍
- 🎁 当然啦，这个库并不止于此，它还支持自定义名称、路径等参数，满足你各种奇奇怪怪的需求！毕竟，每位程序猿都有自己的小习惯和爱好嘛。😝
- 🔽 如果你也想尝试一下这个神奇的插件，记得来 github 上下载 or 使用 npm 包哦~ 🤗

## 使用方法

```typescript
// Path: path/to/vite.config.ts
import { defineConfig } from 'vite';
import fileManager from '@squirreljs/squirrel-vite-plugin-filemanager';
import type { FileManagerConfigurationOptions } from '@squirreljs/squirrel-vite-plugin-filemanager';

const fileManagerConfiguration: FileManagerConfigurationOptions = {
  delete: ['./dist/*.zip'],
  filter: ['.DS_Store', '.', '..'],
  archive: [
    { source: './dist', destination: './dist/front-end.zip' },
    { source: '../server/src', destination: './dist/back-end.zip' },
    { source: '../server/package.json', destination: './dist/package.json' }
  ]
};

export default defineConfig({
  plugins: [fileManager(fileManagerConfiguration)]
});
```

## 参数说明

```ts
interface ArchiveFile {
  source: string;
  destination: string;
}

interface FileManagerConfigurationOptions {
  delete?: Array<string>;
  filter?: Array<RegExp | string>;
  archive?: ArchiveFile[];
}
```

| 参数    | 说明         | 类型                    | 默认值 |
| ------- | ------------ | ----------------------- | ------ |
| delete  | 删除指定文件 | Array&lt;string&gt;     | []     |
| filter  | 过滤指定文件 | Array<RegExp \| string> | []     |
| archive | 打包指定文件 | ArchiveFile[]           | []     |

### ArchiveFile

| 参数        | 说明         | 类型   | 默认值 |
| ----------- | ------------ | ------ | ------ |
| source      | 源文件路径   | string | -      |
| destination | 目标文件路径 | string | -      |

## 效果展示

```log
[vite-plugin-filemanager] 👻 delete file(director): ./dist/*.zip successfully.
[vite-plugin-filemanager] 👻 archive file: ./dist -> ./dist/front-end.zip successfully.
[vite-plugin-filemanager] 👻 archive file: ../pgos-server/src -> ./dist/back-end.zip successfully.
```

## License

SquirrelJS © 2023 - [MIT License](LICENSE)
