import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// vite升级到3或以上版本，打印的地址将不再是localhostl,而是127.0.0.1
// 参考链接：https://juejin.cn/post/7200632181768831013
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:'0.0.0.0',//解决vite use--host to expose
    port:5173,
    open:true
  },
  resolve: {
    // 配置用~或者@代替src
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`, //获取src文件下的路径
    },
  },
  css: {
    preprocessorOptions: {
      // 添加全局less文件的路径，便于在整个项目中使用相同的样式
      scss: {
        additionalData: `@use "~/styles/light.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
          // directives: true,
          // version: "2.1.5",
        }),
      ],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  //去除旧的svg规则，然后添加新的svg规则
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[name]",
    }),
  ],
});
