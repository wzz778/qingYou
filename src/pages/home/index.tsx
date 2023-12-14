import { memo, useEffect } from 'react';
import cName from 'classnames';
import {
  IconFolderOpen,
  IconArrowRight,
  IconTickCircle,
  IconMail,
  IconTextRectangle,
  IconClock
} from '@douyinfe/semi-icons';
//type
import Image from 'next/image';
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Typography } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
interface IProps {
  datas?: any[];
}

const Home: FC<IProps> = (props) => {
  const { push } = useRouter();

  useEffect(() => {
    const elements = document.querySelectorAll('.fadeClass');
    const options = {
      rootMargin: '0px',
      threshold: 0.2 // 指定交叉比例为 50% 时触发回调函数
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.withAnimation);
      }
    }, options);
    elements.forEach((dom) => {
      observer.observe(dom);
    });
  }, []);
  const { Text } = Typography;
  return (
    <div className={styles.home}>
      <div className={cName([styles.rootFront, styles.withAnimation])}>
        <div className={styles.rectangle333} />
        <Image
          src={'/homeImages/homeImg.svg'}
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
        <p className={cName([styles.text1, styles.fade3])}>30+用户、2+团队已经接入青邮</p>
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
          <Text
            link={{
              href: 'https://zezhengyyds.gitee.io/qingYouDocs/docs/ai-helper.html',
              target: '_blank'
            }}
          >
            <Button className={styles.fade2} onClick={() => push('/login')}>
              开始使用
            </Button>
          </Text>
        </p>
        <p className={cName([styles.text1, styles.fade1])}>AI 助手协助生成邮箱文本或者HTML页面</p>
        <div className={styles.group20}>
          <p className={cName([styles.text, styles.fade1])}>🤖 AI 协同</p>
        </div>
        <p className={cName([styles.text2, styles.fade1])}>📬 定时发送</p>
        <p className={cName([styles.text3, styles.fade1])}>绑定个人邮箱，一键发布设置定时任务</p>
        <p className={cName([styles.text4, styles.fade1])}>
          <Text
            link={{
              href: 'https://zezhengyyds.gitee.io/qingYouDocs/docs/send-email.html',
              target: '_blank'
            }}
          >
            <Button className={styles.fade2}>开始使用</Button>
          </Text>
        </p>
        <Image
          src={'/homeImages/rootModule2.svg'}
          alt="rootModule2"
          width={400}
          height={300}
          className={cName([styles.documentsAmico11, styles.fade3])}
        />
        <Image
          src={'/homeImages/rootModule1.svg'}
          alt="rootModule1"
          width={300}
          height={400}
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
                <IconMail className={styles.semiIconsFolderOpen} />
              </div>
              <p className={cName([styles.text, styles.fade1])}>绑定邮箱</p>
            </div>
            <IconArrowRight className={styles.semiIconsArrowRight} />
            <div className={styles.autoWrapper1}>
              <div className={cName([styles.autoWrapper, styles.fade2])}>
                <div className={styles.ellipse6} />
                <IconTextRectangle className={styles.semiIconsFolderOpen} />
              </div>
              <p className={cName([styles.text, styles.fade1])}>编辑正文</p>
            </div>
            <IconArrowRight className={styles.semiIconsArrowRight1} />
            <div className={styles.autoWrapper2}>
              <div className={cName([styles.autoWrapper, styles.fade2])}>
                <div className={styles.ellipse7} />
                <IconClock className={styles.semiIconsFolderOpen} />
              </div>
              <p className={cName([styles.text, styles.fade1])}>选定时间</p>
            </div>
            <IconArrowRight className={styles.semiIconsArrowRight2} />
            <div className={styles.autoWrapper3}>
              <div className={cName([styles.autoWrapper, styles.fade2])}>
                <div className={styles.ellipse8} />
                <IconTickCircle className={styles.semiIconsTickCircle} />
              </div>
              <p className={cName([styles.text, styles.fade1])}>发布任务</p>
            </div>
          </div>
        </div>
        <div className={styles.ellipse19} />
      </div>

      <div className={cName([styles.rootUser, 'fadeClass'])}>
        <div className={styles.rectangle332} />
        <Image
          src={'/homeImages/rootModule1.svg'}
          alt="rootModule1"
          width={800}
          height={500}
          className={cName([styles.rectangle, styles.fade2])}
        />
        <div className={styles.frame724}>
          <div className={styles.ellipse17} />
          <div className={styles.frame722}>
            <p className={cName([styles.text, styles.fade1])}>个人版</p>
            <p className={cName([styles.text1, styles.fade1])}>
              青邮 个人版，支持实现即时发布或定时发布，如设置“每日计划提醒”等，支持灵活个性化配置。
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
          src={'/homeImages/rootModule1.svg'}
          alt="rootModule1"
          width={800}
          height={500}
          className={cName([styles.rectangle, styles.fade2])}
        />
        <div className={styles.frame723}>
          <div className={styles.ellipse18} />
          <div className={styles.frame721}>
            <p className={cName([styles.text, styles.fade1])}>团队版</p>
            <p className={cName([styles.text1, styles.fade1])}>
              青邮 团队版，支持个人版所有功能，支持团队成员邮箱一键全选发布，快捷高效。
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
