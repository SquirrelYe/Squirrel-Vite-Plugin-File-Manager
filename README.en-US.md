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

🎉 Squirrel Vite Plugin File Manager is a Vite plugin for packaging multiple folders into a single zip file, simplifying deployment and organizing projects. Use this practical tool to enhance your Vite project experience! 

## Easily master Vite distination packaging

- 👉 This is a Plugin specifically for Vite, which allows us to quickly package multiple folders and generate zip files. Don't worry about losing files during deployment anymore, one-click compression, convenient and fast! 👏 
- 💡 Imagine that you need to use multiple folders during the development process. At this time, you only need to add this plugin to the Vite configuration, and all of them can be packaged into a zip file for easy deployment and transmission. It is the gospel of programmers! 😍 
- 🎁 Of course, this library doesn't stop there, it also supports custom name, path and other parameters to meet your various weird needs! After all, every programmer has his own little habits and hobbies. 😝 
- 🔽 If you also want to try this amazing plugin, remember to download it from github or use the npm package~ 🤗

## How to use

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

## Parameter description

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

| parameter | description | type | default value | 
| ------- | ------------ | ----------------------- | ------ |
| delete  | delete the specified file | Array&lt;string&gt;     | []     |
| filter  | filter the specified file | Array<RegExp \| string> | []     |
| archive | Pack specified file | ArchiveFile[]           | []     |

### ArchiveFile

| 参数        | 说明         | 类型   | 默认值 |
| ----------- | ------------ | ------ | ------ |
| source      | source file path   | string | -      |
| destination | target file path | string | -      |

## Effect

```log
[vite-plugin-filemanager] 👻 delete file(director): ./dist/*.zip successfully.
[vite-plugin-filemanager] 👻 archive file: ./dist -> ./dist/front-end.zip successfully.
[vite-plugin-filemanager] 👻 archive file: ../pgos-server/src -> ./dist/back-end.zip successfully.
```

## License

SquirrelJS © 2023 - [MIT License](LICENSE)
