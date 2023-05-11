var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from 'path';
import jszip from 'jszip';
import fs from 'fs';
import rimraf from 'rimraf';
import chalk from 'chalk';
// 当前项目的运行目录、配置信息
let fileManagerConfiguration = {};
let runtimePath = '';
/**
 * @description vite打包的时候将front-end back-end压缩，得到生产环境压缩包
 * @time 2022.05.18
 * @author willye
 */
export default (opts = {}) => {
    fileManagerConfiguration = opts;
    /**
     * @description 配置打包生成结束之后，将文件压缩
     */
    const postPlugin = {
        name: 'vite:compress',
        apply: 'build',
        enforce: 'post',
        configResolved({ root, build: { ssr } }) {
            runtimePath = path.resolve(root);
            if (ssr)
                return;
        },
        writeBundle: () => __awaiter(void 0, void 0, void 0, function* () {
            yield entry(fileManagerConfiguration);
        })
    };
    return [postPlugin];
};
/**
 * @description 入口函数
 * @author willye
 * @time 2022.05.20
 */
const entry = (fileManagerConfiguration) => __awaiter(void 0, void 0, void 0, function* () {
    const { delete: deleteFiles = [], archive: archiveFiles = [], filter: filterFiles = [] } = fileManagerConfiguration;
    // 1. 删除文件
    for (const curPath of deleteFiles) {
        const filePath = path.resolve(runtimePath, curPath);
        const err = yield deleteFile(filePath);
        if (err)
            console.log(chalk.bold.yellow(`[vite-plugin-filemanager]`), chalk.bold.red(`💀 delete file(director): ${filePath} failed.`));
        else
            console.log(chalk.bold.yellow(`[vite-plugin-filemanager]`), chalk.bold.red(`👻 delete file(director): ${filePath} successfully.`));
    }
    // 2. 压缩文件
    for (const curArchiveFile of archiveFiles) {
        const { source, destination } = curArchiveFile;
        const err = yield archiveFile(source, destination, filterFiles);
        if (err)
            console.log(chalk.bold.yellow(`[vite-plugin-filemanager]`), chalk.bold.red(`💀 archive file: ${source} -> ${destination} failed.`));
        else
            console.log(chalk.bold.yellow(`[vite-plugin-filemanager]`), chalk.bold.red(`👻 archive file: ${source} -> ${destination} successfully.`));
    }
});
/**
 * @description 同步删除文件
 * @author willye
 * @time 2022.05.18
 */
const deleteFile = (filePath) => {
    // 判断文件、文件夹是否存在
    return new Promise(resolve => rimraf(filePath, resolve));
};
/**
 * @description 压缩文件
 * @author willye
 * @time 2022.05.18
 */
const archiveFile = (source, destination, filterFiles) => {
    const sourcePath = path.resolve(runtimePath, source);
    const destinationPath = path.resolve(runtimePath, destination);
    // 判断文件、文件夹是否存在
    if (!fs.existsSync(sourcePath))
        throw new Error(`${sourcePath} is not exist.`);
    const zip = new jszip();
    // 解析文件
    pushZip(zip, sourcePath);
    // 闭包递归解析文件
    function pushZip(floder, pPath) {
        const files = fs.readdirSync(pPath, { withFileTypes: true });
        files.forEach(dirent => {
            const filePath = `${pPath}/${dirent.name}`;
            if (dirent.isDirectory()) {
                const zipFolderPath = filePath.replace(`${sourcePath}/`, '');
                const zipFloder = zip.folder(zipFolderPath);
                pushZip(zipFloder, filePath);
            }
            else {
                // 判断是否需要过滤
                const idFilter = filterFiles.some(curFilterFile => {
                    if (curFilterFile instanceof RegExp)
                        return curFilterFile.test(dirent.name);
                    else
                        return curFilterFile === dirent.name;
                });
                if (idFilter)
                    return;
                else {
                    floder === null || floder === void 0 ? void 0 : floder.file(dirent.name, fs.readFileSync(filePath));
                }
            }
        });
    }
    return new Promise(resolve => {
        zip
            .generateAsync({
            type: 'nodebuffer',
            compression: 'DEFLATE',
            compressionOptions: { level: 9 }
        })
            .then(content => {
            fs.writeFile(destinationPath, content, resolve);
        });
    });
};
//# sourceMappingURL=index.js.map