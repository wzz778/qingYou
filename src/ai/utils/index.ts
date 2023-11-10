import * as base64 from 'base-64';
import CryptoJs from 'crypto-js';
import { requestObj } from '../config';
export const getWebsocketUrl = () => {
  return new Promise<string>((resovle, reject) => {
    let url = 'ws://spark-api.xf-yun.com/v1.1/chat';
    let host = 'spark-api.xf-yun.com';
    let apiKeyName = 'api_key';
    // let date = new Date().toGMTString();
    let date = new Date().toUTCString();
    let algorithm = 'hmac-sha256';
    let headers = 'host date request-line';
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
    let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, requestObj.APISecret);
    let signature = CryptoJs.enc.Base64.stringify(signatureSha);

    let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

    let authorization = base64.encode(authorizationOrigin);

    // 将空格编码
    url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

    resovle(url);
  });
};
