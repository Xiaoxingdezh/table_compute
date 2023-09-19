// import dayjs from "dayjs";

export function getDate() {
    let myDate = new Date;
    let year = myDate.getFullYear(); //获取当前年
    let mon = myDate.getMonth() + 1; //获取当前月
    let date = myDate.getDate(); //获取当前日
    let hours = myDate.getHours(); //获取当前小时
    let minutes = myDate.getMinutes(); //获取当前分钟
    let seconds = myDate.getSeconds(); //获取当前秒
    let now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return now;
};

// 把文件按照二进制进行读取
export function readFile(file) {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = ev => {
             resolve(ev.target.result);
        };
    });
};

 