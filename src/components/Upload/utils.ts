// import http from '@/utils/http';
import { blobToHash } from '@/utils/generateHash';
// import { preUrl } from '.';
import { upload } from '@/api/modules/user';

export async function getFormData(md5: any) {}

export async function isExistHandle(url: string): Promise<{ isExist: boolean; url: string }> {
  return new Promise((resolve, reject) => {
    // http
    //   .head(`${url}?random=${Math.random()}`, {
    //     validateStatus() {
    //       return true; // 把所有响应码视为正常防止抛异常
    //     },
    //     timeout: 2000,
    //   })
    //   .then((res) => {
    //     resolve({
    //       isExist: res.status === 200,
    //       url,
    //     });
    //   })
    //   .catch(() => {
    //     resolve({
    //       isExist: false,
    //       url,
    //     });
    //   });
  });
}

export async function uploadFile(blob: Blob, fileName: string) {
  return new Promise(async (resolve, reject) => {
    // 创建一个新的FormData对象
    const formData = new FormData();

    // 将blob对象添加到FormData对象中
    formData.append('file', blob, fileName);
    const data = await upload(formData);
    if (data.code == 200) {
      resolve(data.msg);
    } else {
      reject(data.msg);
    }
  });
}
// export async function uploadFile(img: any) {
//   return new Promise(async (resolve, reject) => {
//     // 创建一个新的FormData对象
//     const formData = new FormData();
//     // 将blob对象添加到FormData对象中
//     formData.append('file', img);
//     const data = await upload(formData);
//     console.log('upload');
//     console.log(data);

//     if (data.code == 200) {
//       resolve(data.msg);
//     } else {
//       reject(data.msg);
//     }
//   });
// }
