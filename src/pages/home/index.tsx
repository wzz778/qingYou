import { memo, useContext, useEffect, useRef } from 'react';
import cName from 'classnames';
import { IconFolderOpen, IconArrowRight, IconTickCircle } from '@douyinfe/semi-icons';
//type
import Image from 'next/image';
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
interface IProps {
  datas?: any[];
}

const Home: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { push } = useRouter();

  useEffect(() => {
    const elements = document.querySelectorAll('.fadeClass');
    const options = {
      rootMargin: '0px',
      threshold: 0.2 // 指定交叉比例为 50% 时触发回调函数
    };
    const observer = new IntersectionObserver(([entry]) => {
      // ...
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.withAnimation);
      }
    }, options);
    elements.forEach((dom) => {
      observer.observe(dom);
    });
  }, []);
  return (
    <div className={styles.home}>
      <div className={cName([styles.rootFront, styles.withAnimation])}>
        <div className={styles.rectangle333} />
        <Image
          src={'/homeImages/homeImg.png'}
          alt="homeImg"
          width={500}
          height={500}
          className={cName([styles.onlineWorldAmico1, styles.fade1])}
        />
        <p className={cName([styles.text, styles.fade1])}>分布式邮箱发送托管平台</p>
        <p className={cName([styles.asd, styles.fade2])}>
          青邮
          是一个托管邮箱定时发送的平台，为个人、团队提供高效专业的【平台+服务】解决方案，简化手动操作发送邮箱流程，提高邮箱管理效率，助力个人、企业对邮箱的托管。
        </p>
        <p className={cName([styles.text1, styles.fade3])}>60+用户、2+团队已经接入青邮</p>
        <Button
          className={cName([styles.button, styles.fade2])}
          theme="solid"
          onClick={() => push('/login')}
        >
          开始使用
        </Button>
      </div>

      <div className={cName([styles.rootModule, styles.withAnimation])}>
        <div className={styles.rectangle47} />
        <p className={cName([styles.text, styles.fade1])}>
          <Button className={styles.fade2} onClick={() => push('/login')}>
            开始使用
          </Button>
        </p>
        <p className={cName([styles.text1, styles.fade1])}>支持多格式文档翻译，专业译员及时响应 </p>
        <div className={styles.group20}>
          <p className={cName([styles.text, styles.fade1])}>文档翻译</p>
        </div>
        <p className={cName([styles.text2, styles.fade1])}>文案管理</p>
        <p className={cName([styles.text3, styles.fade1])}>协同管理产品文案，一键发布快速生效</p>
        <p className={cName([styles.text4, styles.fade1])}>
          <Button className={styles.fade2} onClick={() => push('/login')}>
            开始使用
          </Button>
        </p>
        <Image
          src={'/homeImages/rootModule2.png'}
          alt="rootModule2"
          width={800}
          height={500}
          className={cName([styles.documentsAmico11, styles.fade3])}
        />
        <Image
          src={'/homeImages/rootModule1.png'}
          alt="rootModule1"
          width={800}
          height={500}
          className={cName([styles.workChatPana11, styles.fade3])}
        />
      </div>

      <div className={cName([styles.rootWork, 'fadeClass'])}>
        <div className={styles.rectangle46} />
        <p className={cName([styles.text, styles.fade1])}>我们是如何工作的</p>
        <div className={styles.group196}>
          <div className={styles.group195}>
            <div className={cName([styles.autoWrapper, styles.fade2])}>
              <div className={cName([styles.autoWrapper, styles.fade2])}>
                <div className={styles.ellipse5} />
                <IconFolderOpen className={styles.semiIconsFolderOpen} />
              </div>
              <p className={cName([styles.text, styles.fade1])}>创建项目</p>
            </div>
            <IconArrowRight className={styles.semiIconsArrowRight} />
            <div className={styles.autoWrapper1}>
              <div className={cName([styles.autoWrapper, styles.fade2])}>
                <div className={styles.ellipse6} />
                <IconFolderOpen className={styles.semiIconsFolderOpen} />
              </div>
              <p className={cName([styles.text, styles.fade1])}>整合内容</p>
            </div>
            <IconArrowRight className={styles.semiIconsArrowRight1} />
            <div className={styles.autoWrapper2}>
              <div className={cName([styles.autoWrapper, styles.fade2])}>
                <div className={styles.ellipse7} />
                <IconFolderOpen className={styles.semiIconsFolderOpen} />
              </div>
              <p className={cName([styles.text, styles.fade1])}>翻译管理</p>
            </div>
            <IconArrowRight className={styles.semiIconsArrowRight2} />
            <div className={styles.autoWrapper3}>
              <div className={cName([styles.autoWrapper, styles.fade2])}>
                <div className={styles.ellipse8} />
                <IconTickCircle className={styles.semiIconsTickCircle} />
              </div>
              <p className={cName([styles.text, styles.fade1])}>一键下发</p>
            </div>
          </div>
        </div>
        <div className={styles.ellipse19} />
      </div>

      <div className={cName([styles.rootUser, 'fadeClass'])}>
        <div className={styles.rectangle332} />
        <Image
          src={'/homeImages/rootModule1.png'}
          alt="rootModule1"
          width={800}
          height={500}
          className={cName([styles.rectangle, styles.fade2])}
        />
        <div className={styles.frame724}>
          <div className={styles.ellipse17} />
          <div className={styles.frame722}>
            <p className={cName([styles.text, styles.fade1])}>译员端</p>
            <p className={cName([styles.text1, styles.fade1])}>
              XXX 译员端拥有丰富的翻译资源，目前已支持 80+ 的翻译语言，为用户的翻译任务保驾护航。
            </p>
            <p className={cName([styles.text2, styles.fade2])}>
              <Button onClick={() => push('/login')}>开始使用</Button>
            </p>
          </div>
        </div>
      </div>

      <div className={cName([styles.rootTeam, 'fadeClass'])}>
        <div className={styles.rectangle331} />
        <Image
          src={'/homeImages/rootModule1.png'}
          alt="rootModule1"
          width={800}
          height={500}
          className={cName([styles.rectangle, styles.fade2])}
        />
        <div className={styles.frame723}>
          <div className={styles.ellipse18} />
          <div className={styles.frame721}>
            <p className={cName([styles.text, styles.fade1])}>可视化编辑器</p>
            <p className={cName([styles.text1, styles.fade1])}>
              XXX
              可视化编辑器是一款强大的在线翻译工具，基于真实应用程序和文案场景，实现翻译所见即所得。
            </p>
          </div>
        </div>
        <p className={cName([styles.text1, styles.fade1])}>
          <Button onClick={() => push('/login')}>开始使用</Button>
        </p>
      </div>
    </div>
  );
};

export default memo(Home);
Home.displayName = 'Home';
