import { Injectable } from '@nestjs/common';
const axios = require('axios').default;

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  axiosPOST(): void{
    axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });;
  }
  axiosGET():void{
    axios.get('/user', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }
  axiosPUT():void{
    axios.put('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
  }
  axiosPATCH():void{
    axios.patch('/user', {
      firstName: 'PATCHED',
      lastName: 'PATCHED'
    })
  }
  axiosDELETE():void{
    axios.delete('/user', {
      firstName: 'Fred',
    })
  }
}
