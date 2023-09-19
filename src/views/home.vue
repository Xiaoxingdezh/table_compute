<!--
 * @Author: FuXingyuan
 * @Date: 2023-09-19 10:00:16
 * @FilePath: \table_compute\src\views\Home.vue
 * @LastEditors: FuXingyuan
 * @LastEditTime: 2023-09-19 11:56:58
 * @Server: 
 * @Description: 
-->
<template>
    <div>
        
        <div class="link_list">
            <div v-for="(item , index) in state.linkList" :key="index" class="link_item">
                <router-link :to="item.url">
                    <el-card shadow="hover"> {{ item.name }} </el-card>        
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'

defineProps({
  msg: String
})

const state = reactive({
    linkList: [
        { name: "Home", url: "/home" },
        { name: "量化表格", url: "/tables/index" },
    ],
});

const count = ref(0)
</script>


<style lang="less" scoped>
.link_list{
    height: calc(100vh - 300px);
    display: flex;
    align-items: center;
    justify-content: center;
    .link_item{
        width: 200px;
        margin: 20px;
        display: inline-block;
    }

}
</style>
