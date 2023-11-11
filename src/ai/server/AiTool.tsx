import { FC, forwardRef, useImperativeHandle, useState } from 'react';
import { requestObj } from '../config';
import { getWebsocketUrl } from '../utils';
interface AiToolProps {
  isText?: boolean;
  respondHoodle: (result: string) => void;
  loadHoodle?: (isLoading: boolean) => void;
  errorHoodle?: (isLoading: boolean) => void;
}

interface CropperRef {
  submitHoodle: (v: any) => void;
}

const AiTool = forwardRef<CropperRef, AiToolProps>(function AiTool(
  { isText, respondHoodle, loadHoodle, errorHoodle },
  ref
) {
  let result: string = '';
  // const addMsgToTextarea = (text: string) => {
  //   respondHoodle(text);
  // };

  useImperativeHandle(ref, () => ({
    submitHoodle: sendMsg
  }));
  const sendMsg = async (questionText: string) => {
    result = ' ';
    // 获取请求地址
    let myUrl = await getWebsocketUrl();
    // 获取输入框中的内容
    // 每次发送问题 都是一个新的websocket请求
    let socket = new WebSocket(myUrl);
    // 监听websocket的各阶段事件 并做相应处理
    socket.addEventListener('open', (event) => {
      if (loadHoodle) loadHoodle(true);
      // 发送消息
      let params = {
        header: {
          app_id: requestObj.APPID,
          uid: 'wzz'
        },
        parameter: {
          chat: {
            domain: 'general',
            temperature: 0.5,
            max_tokens: 1024
          }
        },
        payload: {
          message: {
            // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
            // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
            text: [
              { role: 'user', content: '你是谁' }, //# 用户的历史问题
              { role: 'assistant', content: '我是AI助手' }, //# AI的历史回答结果
              // ....... 省略的历史对话
              { role: 'user', content: questionText } //# 最新的一条问题，如无需上下文，可只传最新一条问题
            ]
          }
        }
      };
      socket.send(JSON.stringify(params));
    });
    socket.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      if (!data.payload) {
        socket.close();
        return;
      }
      result += data.payload.choices.text[0].content;
      respondHoodle(result);
      if (data.header.code !== 0) {
        console.log('出错了', data.header.code, ':', data.header.message);
        // 出错了"手动关闭连接"
        socket.close();
      }
      if (data.header.code === 0) {
        // 对话已经完成
        if (data.payload.choices.text && data.header.status === 2) {
          setTimeout(() => {
            // "对话完成，手动关闭连接"
            socket.close();
          }, 1000);
        }
      }
    });
    socket.addEventListener('close', (event) => {
      if (loadHoodle) loadHoodle(false);
      // 对话完成后socket会关闭，将聊天记录换行处理
    });
    socket.addEventListener('error', (event) => {
      if (errorHoodle) errorHoodle(true);
      console.log('连接发送错误！！', event);
    });
  };
  // return result;
  return '';
});
export default AiTool;
