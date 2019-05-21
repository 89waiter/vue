import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
let vm = new Vue()
axios.defaults.timeout = 5000;
// if(process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL ='http://127.0.0.1:8000';    
// }else{
//     // if(process.env.env_config=='prod') {
//     //     axios.defaults.baseURL ='http://127.0.0.1:8000';
//     // }
//     axios.defaults.baseURL ='http://fengxingtieqi.club';
//     https://www.cnblogs.com/suanmei/p/10033725.html
// }

axios.defaults.baseURL =process.env.VUE_APP_BASE_API;

export function fetch(url,params = {}) {
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        }).then(response=> {
            if(response.data.code == 9999) {
                localStorage.clear()
                vm.$router.push('/login')
            }
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export function post(url, data) {
    return new Promise((resolve,reject) => {
        axios.post(url,JSON.stringify(data),{
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if(response.data.code == 9999) {
                localStorage.clear()
                vm.$router.push('/login')
            }
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}

export function postForm(url, data) {
    return new Promise((resolve,reject) => {
        axios.post(url,qs.stringify(data))
        .then(response => {
            if(response.data.code == 9999) {
                localStorage.clear()
                vm.$router.push('/login')
            }
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}

export function postImg(url, data) {
    return new Promise((resolve,reject) => {
        axios.post(url,data,{
            headers:{'Content-Type':'multipart/form-data'}
        })
        .then(response => {
            if(response.data.code == 9999) {
                localStorage.clear()
                vm.$router.push('/login')
            }
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}