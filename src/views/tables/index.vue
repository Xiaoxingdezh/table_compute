<!--
 * @Author: FuXingyuan
 * @Date: 2023-09-19 10:00:16
 * @FilePath: \table_compute\src\views\tables\index.vue
 * @LastEditors: FuXingyuan
 * @LastEditTime: 2023-09-19 21:58:49
 * @Server: 
 * @Description: 
-->

<template>
    <div>
        <div style="display: flex; align-items: center; justify-content: flex-end; padding: 20px;">
            <vxe-button @click="clearDataEvent">清空数据</vxe-button>
            <vxe-button @click="exportDataEvent" style="margin-right: 10px;">导出数据</vxe-button>
            <!-- <vxe-button @click="importDataEvent">导入数据</vxe-button> -->
            <el-upload style="display: inline-block;" ref="upload" action="" :auto-upload="false" :file-list="state.files" :on-change="handleChange" :multiple="false" :show-file-list="false" >              
                <vxe-button >导入数据</vxe-button>
            </el-upload>
            <vxe-button @click="recount" style="margin-left: 10px;">重新计算</vxe-button>
        </div>

        <!-- :toolbar-config="{
            import: true,
            export: true,
        }" 
        :export-config="{
            remote: false,
            exportMethod: doExport,
            types: ['xlsx', 'xls'],
            modes: ['current', 'selected', 'all']
        }" 
        :import-config="{
            remote: false,
            // importMethod: importMethod,
            // types: ['xlsx', 'xls'],
            importTypes: ['xlsx', 'xls'],
            modes: ['insert']
        }"  -->
        <vxe-table border stripe ref="tableRef" :row-config="{ isHover: true }" 
            :data="state.tableData">
            <vxe-column field="index" title="序号" align="center" width="60"></vxe-column>
            <vxe-column field="name" title="姓名" align="center"></vxe-column>
            <vxe-column field="val1" title="上课" align="center" sortable></vxe-column>
            <vxe-column field="val2" title="特殊节次" align="center" sortable></vxe-column>
            <vxe-column field="val3" title="早自习" align="center" sortable></vxe-column>
            <vxe-column field="val4" title="第三节晚自习" align="center" sortable></vxe-column>
            <vxe-column field="val5" title="周末21级小班加课" align="center" sortable></vxe-column>
            <vxe-column field="val6" title="监考" align="center" sortable></vxe-column>
            <vxe-column field="total" title="总分" align="center" sortable></vxe-column>
        </vxe-table>
    </div>
</template>
  
<script setup>
import { reactive, ref } from 'vue'
import XLSX from "xlsx";
import { readFile, getDate } from '@/utils/tools'

const state = reactive({
    file: [],
    files: [],
    rowList: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    tableData: [
        { index: 1, name: '小明', val1: 1, val2: 1, val3: 1, val4: 1, val5: 1, val6: 1, total: 0 },
        // { id: 10002, name: 'Test2', val1: 0, val2: 0, val3: 0, val4: 0, val5: 0, val6: 0, total: 0 },
    ],
});

const tableRef = ref()
const clearDataEvent = () => {
    state.tableData = [];
}
const recount = ()=>{
    let list = state.tableData;
    let _list = [];
    list.forEach((item)=>{
        let total = (getNum(item.val1, 4) + getNum(item.val2, 2) + getNum(item.val3, 1) + getNum(item.val4, 10) + getNum(item.val5, 10) + getNum(item.val6, 1)) / 100
        _list.push({
            ...item,
            total: total,
        })
    });
    state.tableData = _list;
};

const getNum = (num, multiplier)=>{
    let number = 0;
    if(Number(num)){
        number = (Number(num) * multiplier) * 100
    }
    return number
};

// 导出
const exportDataEvent = () => {
    const $table = tableRef.value
    if ($table) {
        // $table.openExport({
        //     // 默认勾选源
        //     original: true,
        //     types: ['xsl', 'xslx']
        // })
        $table.exportData({ filename: getDate() + "-量化表格", sheetName: "Sheet1", type: "xlsx" });
    }
};
// 字段对应表
let character = {
    index: {
        text: "序号",
        type: 'number'
    },
    name: {
        text: "姓名",
        type: 'string'
    },
    val1: {
        text: "上课",
        type: 'string'
    },
    val2: {
        text: "特殊节次",
        type: 'string'
    },
    val3: {
        text: "早自习",
        type: 'string'
    },
    val4: {
        text: "第三节晚自习",
        type: 'string'
    },
    val5: {
        text: "周末21级小班加课",
        type: 'string'
    },
    val6: {
        text: "监考",
        type: 'string'
    },
    total: {
        text: "总分",
        type: 'string'
    },
};
const getList = (data)=>{
    let arr = [];
    console.log("data", data);
    data.forEach(item => {
        let obj = {};
        for (let key in character) {
            if (!character.hasOwnProperty(key)) break;
            let v = character[key],
                text = v.text,
                type = v.type;
            v = item[text] || "";
            type === "string" ? (v = String(v)) : null;
            type === "number" ? (v = Number(v)) : null;
            obj[key] = v;
        }
        arr.push(obj);
    });
    return arr
}
function splitByNumber(str) {
    let r = str.match(/^[a-z|A-Z]+/gi);
    let d = str.match(/\d+$/gi);
    return [r[0], d[0]];
}
const getName = (val)=>{
    let key = "";
    let c_list = Object.keys(character);
    c_list.forEach((item)=>{
        let _item = character[item];
        if(_item.text == val){
            key = item
        };
    })
    return key
};
const getDataList = (info)=>{
    let _info = info["!ref"].split(":");
    let start = _info[0];
    let end = _info[1];
    let [start_e, start_n] = splitByNumber(start);
    let [end_e, end_n] = splitByNumber(end);
    console.log(start_e,start_n);
    console.log(end_e,end_n);
    let list = Object.keys(info);
    let arr = [];
    let f_index = state.rowList.findIndex((item)=> item == end_e);
    // 结束 字母下标
    console.log(f_index);
    
    // 列
    // for(let i = 1; i <= Number(end_n); i++){
    //     // 行
    //     state.rowList.forEach((item, index)=>{
    //         if(index <= f_index){
    //             let row = {};
    //             let key = "";
    //             let _index = item+i;
    //             if(info[_index] && info[_index].v && getName(info[_index].v)){
    //                 key = getName(info[_index].v);
    //             }else if(key && info[_index] && (info[_index].v || info[_index].v == 0)){
    //                 console.log(key);
    //                 console.log(info[_index].v);
    //                 row[key] = info[_index].v;
    //             }
    //         }
    //     });
    // }
    let keys = [];
    state.rowList.forEach((item, index)=>{
        if(index <= f_index){
            let key = "";
            for(let i = 1; i <= Number(end_n); i++){
                let _index = item+i;
                if(info[_index] && info[_index].v && getName(info[_index].v)){
                    key = getName(info[_index].v);
                    keys.push(key);
                }
                // if(key && info[_index] && (info[_index].v || info[_index].v == 0)){}
            }
        }
    });
    console.log(keys);
    // 列
    for(let i = 1; i <= Number(end_n); i++){
        // 行
        let row = {};
        state.rowList.forEach((item, index)=>{
            if(index <= f_index){
                let key = keys[index];
                let _index = item+i;
                if(info[_index] && (info[_index].v || info[_index].v == 0) && !getName(info[_index].v)){
                    console.log(key, info[_index].v);
                    row[key] = info[_index].v || 0;
                }
            }
        });
        if(row.index) {
            arr.push({ ...row });
        }
    }
    console.log(arr);
    return arr
}
// 导入
const handleChange = async (file,fileList) => {   
    console.log(file, fileList);     
    //读取FILE中的数据（变为JSON格式）
    let data = await readFile(file.raw);
    console.log(XLSX);
    let workbook = XLSX.read(data, { type: "binary" }),
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(worksheet);
    // 打印结果加下图
    console.log(workbook);
    console.log(workbook.Sheets);
    let info = workbook.Sheets[workbook.SheetNames[0]];
    let list = Object.keys(info);
    // let _data = [];
    // list.forEach((item)=>{
    //     if(!item.includes("!")){
    //         _data.push({
    //             ...info[item]
    //         })
    //     }
    // });
    // state.tableData = getList(_data);
    state.tableData = getDataList(info);
    recount();
    console.log(state.tableData);
    // state.fileList = [fileList[fileList.length - 1]]; // 只能上传一个Excel，重复上传会覆盖之前的        
    // state.file = file.raw;        
    // let reader = new FileReader()        
    // let _this = state        
    // reader.readAsArrayBuffer(state.file)        
    // reader.onload = function () {            
    // 	let buffer = reader.result            
    // 	let bytes = new Uint8Array(buffer)            
    // 	let length = bytes.byteLength            
    // 	let binary = ''            
    // 	for (let i = 0; i < length; i++) {                
    // 		binary += String.fromCharCode(bytes[i])            
    // 	}
    // 	let XLSX = require('xlsx')            
    // 	let wb = XLSX.read(binary, {                
    // 		type: 'binary'            
    // 	})            
    // 	let outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])            
    // 	console.log(outdata)
    // }
};
</script>