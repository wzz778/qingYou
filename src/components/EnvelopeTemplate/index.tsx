import { memo, useEffect, useRef, useState } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { ArrayField, Button, Form, Modal } from '@douyinfe/semi-ui';
import { IconCopy, IconMaximize, IconMinusCircle, IconPlusCircle } from '@douyinfe/semi-icons';
interface EnvelopeIProps {
  setEnvelope: (data: any) => void;
}

const EnvelopeTemplate: FC<EnvelopeIProps> = ({ setEnvelope }) => {
  const [htmlCode, setHtmlCode] = useState(``); // 用于存储用户输入的HTML代码
  const [openVisible, setOpenVisible] = useState(false);
  const formRef = useRef<any>();
  const [form, setForm] = useState({
    title: '给王五的生日祝福',
    call: '王五',
    p: ['新的一岁，祝福你天天开心！！！'],
    name: '张三',
    date: '2023.3.5'
  });
  const initForm = {
    title: '给王五的生日祝福',
    call: '王五',
    p: ['新的一岁，祝福你天天开心！！！'],
    name: '张三',
    date: '2023.3.5'
  };
  const addsetEnvelope = (htmlStr: string) => {
    setEnvelope({ emailTitle: form.title, emailContent: htmlStr });
  };
  useEffect(() => {
    let pHtmlList = ``;
    for (let i of form.p) {
      pHtmlList += `<p>${i}</p>`;
    }
    setHtmlCode(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          #temBody {
            margin: 0;
            padding: 20px 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            height:100%;
          }
          #temBody .container {
            max-width: 500px;
            padding: 20px;
            margin: 0px auto;
            background-color: rgba(255, 132, 245, 0.3);
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            font-size: 14px;
          }
          #temBody h2 {
            color: #555555;
          }
          #temBody p {
            text-indent: 2em;
            line-height: 1.6;
            color: #333;
          }
        </style>
      </head>
      <div id="temBody">
        <div class="container">
          <h2>${form.title}</h2>
          <span>亲爱的${form.call}</span>
          ${pHtmlList}
          <div style="text-align: right">—— ${form.name}</div>
          <div style="text-align: right">${form.date}</div>
        </div>
      </div>
    </html>`);
  }, [form]);
  return (
    <div className={styles.envelopeTemplate}>
      <div style={{ width: '50%', minHeight: '500px', background: '#ffffff' }}>
        <div className={styles.titleSpan}>输入书信内容</div>
        <div style={{ padding: 20, margin: '0 auto' }}>
          {/* <span>{JSON.stringify(form)}</span> */}
          <Form
            labelWidth="90px"
            labelPosition="left"
            labelAlign="right"
            getFormApi={(formApi) => (formRef.current = formApi)}
            onChange={() => setForm(formRef.current.getFormState().values)}
            initValues={initForm}
            // onSubmit={(values) => addTemplateHandle(values)}
          >
            {({ formState, values, formApi }) => (
              <>
                <Form.Input
                  field="title"
                  label={{ text: '邮件主题', required: true }}
                  style={{ width: 320 }}
                  placeholder={'请输入邮件主题如 “给xxx的生日祝福” '}
                  rules={[{ required: true, message: '请输入内容' }]}
                  maxLength={20}
                />
                <Form.Input
                  field="call"
                  label={{ text: '称呼', required: true }}
                  style={{ width: 320 }}
                  placeholder={'请输入对方的称呼 '}
                  rules={[{ required: true, message: '请输入内容' }]}
                  maxLength={20}
                />
                <ArrayField field="p">
                  {({ add, arrayFields }) => (
                    <>
                      {arrayFields.map(({ field, key, remove }, i) => (
                        <div key={key} style={{ width: 600, display: 'flex' }}>
                          <Form.TextArea
                            field={`${field}`}
                            label={`第 ${i + 1} 段`}
                            placeholder={'请输入段落内容'}
                            style={{ width: 320 }}
                            // initValue={pList}
                            rules={[{ required: true, message: '请输入内容' }]}
                          />
                          {arrayFields.length !== 1 && (
                            <Button
                              type="danger"
                              theme="borderless"
                              icon={<IconMinusCircle />}
                              onClick={remove}
                              style={{ margin: 12 }}
                            />
                          )}
                        </div>
                      ))}
                      {arrayFields.length !== 3 && (
                        <Button
                          onClick={add}
                          icon={<IconPlusCircle />}
                          theme="light"
                          style={{ marginLeft: 90 }}
                        >
                          添加段落
                        </Button>
                      )}
                    </>
                  )}
                </ArrayField>
                <Form.Input
                  field="name"
                  label={{ text: '署名', required: true }}
                  style={{ width: 320 }}
                  placeholder={'请输入您的署名 '}
                  rules={[{ required: true, message: '请输入内容' }]}
                  maxLength={20}
                />
                <Form.Input
                  field="date"
                  label={{ text: '日期', required: true }}
                  placeholder={'请输入邮件日期 '}
                  style={{ width: 320 }}
                  rules={[{ required: true, message: '请输入内容' }]}
                  maxLength={20}
                />
              </>
            )}
          </Form>
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <div className={styles.titleSpan}>
          书信页面预览
          <Button
            onClick={() => setOpenVisible(true)}
            style={{ float: 'right' }}
            theme="solid"
            icon={<IconMaximize />}
          >
            放大展示
          </Button>
          <Button
            style={{ float: 'right', marginRight: 5 }}
            type="secondary"
            theme="solid"
            onClick={() => addsetEnvelope(htmlCode)}
            icon={<IconCopy />}
          >
            导出书信代码
          </Button>
        </div>
        <div
          onClick={() => setOpenVisible(true)}
          dangerouslySetInnerHTML={{ __html: htmlCode }}
          style={{
            border: '1px solid #ccc',
            minHeight: '500px',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            overflowX: 'scroll'
          }}
        />
      </div>
      <Modal
        title={'页面放大展示'}
        footer={null}
        visible={openVisible}
        onCancel={() => setOpenVisible(false)}
        closeOnEsc
        width={'90vw'}
        zIndex={99}
      >
        <div
          dangerouslySetInnerHTML={{ __html: htmlCode }}
          style={{
            border: '1px solid #ccc',
            minHeight: 500,
            minWidth: 700,
            backgroundColor: '#ffffff',
            marginBottom: 20
          }}
        />
      </Modal>
    </div>
  );
};

export default memo(EnvelopeTemplate);
EnvelopeTemplate.displayName = 'EnvelopeTemplate';
