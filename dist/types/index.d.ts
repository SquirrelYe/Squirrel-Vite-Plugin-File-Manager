import { Plugin } from 'vite';
interface ArchiveFile {
    source: string;
    destination: string;
}
export declare interface FileManagerConfigurationOptions {
    delete?: string[];
    filter?: Array<RegExp | string>;
    archive?: ArchiveFile[];
}
/**
 * @description vite打包的时候将front-end back-end压缩，得到生产环境压缩包
 * @time 2022.05.18
 * @author willye
 */
declare const _default: (opts?: FileManagerConfigurationOptions) => Plugin[];
export default _default;
//# sourceMappingURL=index.d.ts.map