function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mime});
}


function convertBase64UrlToBlob(urlData,type){
  //去掉url的头，并转换为byte
  var bytes=window.atob(urlData.split(',')[1]);
  //处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob( [ab] , {type : type});
}


export function formData(imageBase64, filename, type = 'image/jpeg') {
  var blob = convertBase64UrlToBlob(imageBase64, type); // 上一步中的函数
  var canvas = document.createElement('canvas');
  var dataURL = canvas.toDataURL(type, 1);
  var fd = new FormData();
  fd.append('file',blob, filename);
  return fd
}
