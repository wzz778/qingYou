import React, { useState } from 'react';
import * as base64 from 'base-64';
import CryptoJs from 'crypto-js';

const YourComponent = () => {
  const [questionInput, setQuestionInput] = useState('');
  const [result, setResult] = useState('');

  const requestObj = {
    APPID: '5f458a15',
    APISecret: 'NGE5ZDIwYzIxYTIxMTlkMjAzYWQyYTU4',
    APIKey: '57c0aa2cd6db250c014bdf0dab70dc14',
    Uid: 'wzz',
    sparkResult: ''
  };

  const sendMsg = async () => {
    // ... (rest of the sendMsg function remains unchanged)
  };

  const getWebsocketUrl = () => {
    return new Promise<string>((resolve, reject) => {
      let url = 'ws://spark-api.xf-yun.com/v1.1/chat';
      let host = 'spark-api.xf-yun.com';
      let apiKeyName = 'api_key';
      let date = new Date().toString();
      let algorithm = 'hmac-sha256';
      let headers = 'host date request-line';
      let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
      let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, requestObj.APISecret);
      let signature = CryptoJs.enc.Base64.stringify(signatureSha);
      let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
      let authorization = base64.encode(authorizationOrigin);
      url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;
      resolve(url);
    });
  };

  const addMsgToTextarea = (text: string) => {
    setResult(text);
  };

  return (
    <div>
      <input
        id="question"
        type="text"
        value={questionInput}
        onChange={(e) => setQuestionInput(e.target.value)}
      />
      <button id="btn" onClick={sendMsg}>
        Send
      </button>
      <div id="result">{result}</div>
    </div>
  );
};

export default YourComponent;
