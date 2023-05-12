# Squirrel Vite Plugin File Manager

<!-- Version -->
<p align="left">
  <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/@squirreljs/squirrel-vite-plugin-filemanager.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/@squirreljs/squirrel-vite-plugin-filemanager.svg" alt="node compatibility"></a>
</p>

<!-- Logo -->
<p align="center">
  <a href="" target="blank"><img src="./assets/logo.jpeg" width="350" alt="Squirrel IOC Container Logo" /></a>
</p>

<!-- Language -->
<p align="center">
  <a href="README.md">简体中文</a> | 
  <a href="README.zh-TW.md">繁體中文</a> | 
  <a href="README.en-US.md">English</a> 
</p>

🎉 Squirrel Vite Plugin File Manager 是一款用於打包多個文件夾為單獨zip 文件的Vite 插件，簡化部署和組織項目。用這個實用工具提升你的Vite 項目體驗! 

## 輕鬆掌握Vite 產物打包

- 👉 這是一款專門針對Vite 的Plugin，可以讓我們快速打包多個文件夾，生成zip 文件。再也不用擔心部署時丟失文件了，一鍵壓縮，方便快捷！👏 
- 💡 想像一下，你在開發過程中需要使用到多個文件夾，這時候你只需要在Vite 配置中加入該插件，就能將它們全部打包為zip 文件，方便部署和傳輸。簡直是程序猿的福音啊！😍 
- 🎁 當然啦，這個庫並不止於此，它還支持自定義名稱、路徑等參數，滿足你各種奇奇怪怪的需求！畢竟，每位程序猿都有自己的小習慣和愛好嘛。😝 
- 🔽 如果你也想嘗試一下這個神奇的插件，記得來github 上下載or 使用npm 包哦~ 🤗 

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

## 參數說明

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

| 參數| 說明| 類型| 默認值| 
| ------- | ------------ | ----------------------- | ------ |
| delete  | 刪除指定文件 | Array&lt;string&gt;     | []     |
| filter  | 過濾指定文件 | Array<RegExp \| string> | []     |
| archive | 打包指定文件 | ArchiveFile[]           | []     |

### ArchiveFile

| 參數| 說明| 類型| 默認值| 
| ----------- | ------------ | ------ | ------ |
| source      | 源文件路徑   | string | -      |
| destination | 目標文件路徑 | string | -      |

## 效果展示

```log
[vite-plugin-filemanager] 👻 delete file(director): ./dist/*.zip successfully.
[vite-plugin-filemanager] 👻 archive file: ./dist -> ./dist/front-end.zip successfully.
[vite-plugin-filemanager] 👻 archive file: ../pgos-server/src -> ./dist/back-end.zip successfully.
```

## License

SquirrelJS © 2023 - [MIT License](LICENSE)
