import Image from 'next/image';

import styles from './index.module.scss';
// import HoverLink from '../../../HoverLink';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerMarketing}>
        <div className={styles.group}>
          <div className={styles.statusContinaer}>
            <Image src={'/qingYouLogo.svg'} alt="logo" width={100} height={50} />
            {/* <div className={styles.groupItem}>
              <DeployStatus />
            </div> */}
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.groupHeader}>产品</div>
          <div className={styles.groupItem}>
            <a href="https://github.com/bowling00/assistant">assistant</a>
          </div>
          <div className={styles.groupItem}>
            <a href="https://github.com/bowling00/docs-copilot">docs-copilot</a>
          </div>
          <div className={styles.groupItem}>
            <a href="https://github.com/developerlinks/devlink-cli">devlink-cli</a>
          </div>
          <div className={styles.groupItem}>
            <a href="https://github.com/developerlinks/devlink-web">devlink-web</a>
          </div>
          <div className={styles.groupItem}>
            <a href="https://github.com/developerlinks/devlink-server">devlink-server</a>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.groupHeader}>关于我们</div>
          <div className={styles.groupItem}>
            <a href="https://beian.miit.gov.cn/">豫ICP备2020029001号-7</a>
          </div>
        </div>
      </div>
    </div>
  );
}
