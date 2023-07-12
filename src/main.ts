import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from './language/i18n'

// 图标和组件需要分开引入
import { ElButton } from "element-plus";
// import { MoonNight } from "@element-plus/icons-vue";
import "~/styles/dark.scss";

//导入Svg图片插件，可以在页面上显示Svg图片
import SvgIcon from "~/components/SvgIcon.vue";
import "virtual:svg-icons-register";

const app = createApp(App);
// 全局注册组件/图标
app.component("ElButton", ElButton);
// app.component("MoonNight", MoonNight);
app.component("svg-icon", SvgIcon);

app.use(i18n)
app.use(router).mount("#app");