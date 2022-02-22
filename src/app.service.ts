import { Injectable } from '@nestjs/common';
const axios = require('axios').default;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';

  }
  axiosPOST(body:string): void{
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'DOT',
      body: body,
      userId: 2,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  axiosGET(userId:string):void{
    axios.get("https://jsonplaceholder.typicode.com/posts/"+userId)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  axiosPUT(userId:string):void{
    axios.put('https://jsonplaceholder.typicode.com/posts/'+userId, {
      id:3,
      title: 'put',
      body: 'put',
      userId: 2,
    })
    .then(function (response) {
      console.log(response.data);
    })
  }

  axiosPATCH(userId:string):void{
    axios.patch('https://jsonplaceholder.typicode.com/posts/'+userId, {
      title:'PATCHED'
    })
    .then(function (response) {
      console.log(response.data);
    })
  }

  axiosDELETE(userId:string):void{
    axios.delete('https://jsonplaceholder.typicode.com/posts/'+userId)
    .then(function (response) {
      console.log(response.data);
    })
  }
}
