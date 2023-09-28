import { FC } from 'react';
import Image from 'next/image';
import styles from './index.module.scss';
import publicLogo from '@/assets/images/public_logo.png';
import cName from 'classnames';
interface ILink {
  label: string;
  link?: string;
}

interface ILinkList {
  title: string;
  list: ILink[];
}

interface IQRCode {
  image: any;
  text: string;
}

export interface IFooterProps {
  linkList: ILinkList[];
  qrCode: IQRCode;
  copyRight: string;
  siteNumber: string; // 站点备案号
  publicNumber: string; // 公安备案号
}

export const Footer: FC<IFooterProps> = ({
  linkList,
  qrCode,
  copyRight,
  siteNumber,
  publicNumber
}) => {
  return (
    <div className={styles.footer}>
      <div className={styles.topArea}>
        <h1 className={styles.footerTitle}>
          <Image
            src={'/qingYouBorder.svg'}
            priority
            alt={publicNumber}
            width={120}
            height={50}
          ></Image>
        </h1>
        <div className={styles.linkListArea}>
          {linkList?.map((item, index) => {
            return (
              <div className={styles.linkArea} key={`linkArea${index}`}>
                <span className={styles.title}>{item.title}</span>
                <div className={styles.links}>
                  {item.list?.map((_item, _index) => {
                    return (
                      <div
                        className={cName({
                          [styles.link]: _item.link,
                          [styles.disabled]: !_item.link
                        })}
                        onClick={(): void => {
                          _item.link &&
                            window.open(_item.link, 'blank', 'noopener=yes,noreferrer=yes');
                        }}
                        key={`link${_index}`}
                      >
                        {_item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.bottomArea}>
        <div className={styles.codeArea}>
          <div>
            <Image src={qrCode.image} alt={qrCode.text} width={56} height={56}></Image>
          </div>
          <div className={styles.text}>{qrCode.text}</div>
        </div>
        <div className={styles.numArea}>
          <span>{copyRight}</span>
          <span>{siteNumber}</span>
          <div className={styles.publicLogo}>
            <div className={styles.logo}>
              <Image src={publicLogo} alt={publicNumber} width={20} height={20}></Image>
              <span>{publicNumber}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
