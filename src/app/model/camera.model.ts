import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ConfigModel } from './config.model';
@Injectable()

export class CameraModel {
  cameraOptions: any;
  options: any;
  constructor(public http: HttpClient,
              private camera: Camera ,
              private transfer: FileTransfer,
              private file: File,
              ) {
              this.cameraOptions = [];
  }
  private url: string = ConfigModel.BASE_URL;

// 相机
camera_play() {
  const options: CameraOptions = {
    quality: 100,
    // destinationType: this.camera.DestinationType.FILE_URI,
    // encodingType: this.camera.EncodingType.JPEG,
    // mediaType: this.camera.MediaType.PICTURE
    // sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,//从图库获取照片
    sourceType: this.camera.PictureSourceType.CAMERA, // 从拍照获取照片028
    saveToPhotoAlbum: true, // 是否保存到相册
    correctOrientation: true, // 是否纠正方向
    targetWidth: 300,	// 以像素为单位,图片比例保持不变
    targetHeight: 300	// 以像素为单位,图片比例保持不变
  }
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
     console.log(imageData);
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
    // this.doUpload(imageData,name);
   }, (err) => {
    // Handle error
   });
}

// 上传头像(从相册中选择)
camera_touxiang_play_from_picture() {
  const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, // 从图库获取照片
      targetWidth: 300,	// 以像素为单位,图片比例保持不变
      targetHeight: 300	// 以像素为单位,图片比例保持不变
  };
  this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // console.log(imageData);
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      return this.doUploadTouXiang(imageData, 'touxiang_photo');
   });
}
// 上传头像（拍照上传）
camera_touxiang_play_from_camera() {
  // 需要保存数据库的数据
  
  const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA, // 从拍照获取照片028
      saveToPhotoAlbum: true, // 是否保存到相册
      targetWidth: 300,	// 以像素为单位,图片比例保持不变
      targetHeight: 300	// 以像素为单位,图片比例保持不变
  };
  //return this.camera.getPicture(options);
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    // console.log(imageData);
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
    return this.doUploadTouXiang(imageData, 'touxiang_photo');
 }, (err) => {
    // Handle error
    console.log('85.error');
 });
}

// 上传头像图片
doUploadTouXiang(filePath, name  ) {
  const fileTransfer: FileTransferObject = this.transfer.create();
  let options: FileUploadOptions = {
      fileKey: name, // name
      fileName: 'name.jpg', // 上传图片的名字
      mimeType: 'image/jpeg', // 上传图片类型
      params: {},
      headers: {}
  };
  var api = this.url + '/wode/Login/UpTtouxiangImg';
  // var api = this.url + '/tasks/Tasks/testUpimg';
  fileTransfer.upload(filePath, api , options)
  .then((data) => {
      console.log(JSON.stringify(data));
      return data.response;
      // return data.response;//php端设置返回文件路径
  }),(err)=>{
      console.log( JSON.stringify(err) );
  };
}
// 上传图片
doUpload(filePath, name, params, api = '') {
  console.log(params);
  const fileTransfer: FileTransferObject = this.transfer.create();
  let options: FileUploadOptions = {
      fileKey: name, // name
      fileName: 'name.jpg', // 上传图片的名字
      mimeType: 'image/jpeg', // 上传图片类型
      params: params,
      headers: {
      }
  }
  if (api != '') {
    var api = this.url + api;
  } else {
    var api = this.url + '/tasks/Tasks/testUpimg';
  }
  fileTransfer.upload(filePath, api, options)
  .then((data) => {
      console.log(JSON.stringify(data));
      // return data.response;//php端设置返回文件路径
  }),(err)=>{
      console.log(JSON.stringify(err));
  }
}

// 批量上传
doUploads(filePaths, name, params){
  console.log('params');
  if ( filePaths ) {
    console.log('filePaths');
    for ( var i in filePaths) {
      console.log(i);
      this.doUpload(filePaths[i].img_src,name,params);
   }
   console.log('filePaths');
  }
  return filePaths;
}
/**
 * 设置相机参数
 * @param quality 相册质量 0-100
 * @param destinationType 返回数据类型  返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫) 
 * @param encodingType JPEG 	number 	0  ，PNG 	number 	1
 * @param mediaType  上传类型照相或者影像 PICTURE 	number 	0 ， VIDEO 	number 	1 ，ALLMEDIA 	number 	2
 * @param saveToPhotoAlbum true false 是否保存到相册
 * @param sourceType  打开相机 CAMERA 	number 	1 打开相册 PHOTOLIBRARY 	number 	0
 * @param targetWidth 以像素为单位,图片比例保持不变 number
 * @param targetHeight  以像素为单位,图片比例保持不变 number
 */
setCameraOptions(quality,destinationType,encodingType,mediaType,saveToPhotoAlbum,sourceType,targetWidth,targetHeight){
  let options: CameraOptions = {
    quality: quality,//相片质量 0 -100 
    destinationType: destinationType, //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)     
    encodingType: encodingType,
    mediaType: mediaType,
    saveToPhotoAlbum: saveToPhotoAlbum,   // 是否保存到相册
    sourceType: sourceType,
    targetWidth: targetWidth,	//以像素为单位,图片比例保持不变 
    targetHeight: targetHeight	// 以像素为单位,图片比例保持不变
  }
  return options;
}
/**
 * 相机方法
 * @param quality 相册质量 0-100
 * @param destinationType 返回数据类型  返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫) 
 * @param encodingType JPEG 	number 	0  ，PNG 	number 	1
 * @param mediaType  上传类型照相或者影像 PICTURE 	number 	0 ， VIDEO 	number 	1 ，ALLMEDIA 	number 	2
 * @param saveToPhotoAlbum true false 是否保存到相册
 * @param sourceType  打开相机 CAMERA 	number 	1 打开相册 PHOTOLIBRARY 	number 	0
 * @param targetWidth 以像素为单位,图片比例保持不变 number
 * @param targetHeight  以像素为单位,图片比例保持不变 number
 */
getPicModel(quality,destinationType,encodingType,mediaType,saveToPhotoAlbum,sourceType,targetWidth,targetHeight){
  let options = this.setCameraOptions(quality,destinationType,encodingType,mediaType,saveToPhotoAlbum,sourceType,targetWidth,targetHeight);
  return this.camera.getPicture(options);
}

doupFiles(){
  
}

}