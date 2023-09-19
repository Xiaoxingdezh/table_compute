/*
 * @Author: FuXingyuan
 * @Date: 2023-09-15 13:58:27
 * @FilePath: \table_compute\src\main.js
 * @LastEditors: FuXingyuan
 * @LastEditTime: 2023-09-19 17:17:18
 * @Server: 
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VXETable from 'vxe-table'
import VXETablePluginExportXLSX from "vxe-table-plugin-export-xlsx";
VXETable.use(VXETablePluginExportXLSX);
import 'vxe-table/lib/style.css'
import "xe-utils";
// import XLSX from 'xlsx'

function useTable (App) {
	app.use(VXETable)
}
const app = createApp(App);
app.use(router)
.use(ElementPlus)
// .use(XLSX)
.use(useTable)
.mount('#app');
