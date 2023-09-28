import { memo, useContext, useEffect, useRef } from 'react';
import cName from 'classnames';
import { IconFolderOpen, IconArrowRight, IconTickCircle } from '@douyinfe/semi-icons';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { ThemeContext } from '@/store/theme';
interface IProps {
  datas?: any[];
}

const Home: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { push } = useRouter();
  const { theme } = useContext(ThemeContext);
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    mainRef.current?.classList.remove(styles.withAnimation);
    window.requestAnimationFrame(() => {
      mainRef.current?.classList.add(styles.withAnimation);
    });
  }, [theme]);
  return (
    <div className={styles.home}>
      {/* <div className={cName([styles.home, styles.withAnimation])} ref={mainRef}> */}
      <div className={cName([styles.rootFront, styles.withAnimation])} ref={mainRef}>
        {/* <div className={styles.rootFront}> */}
        <div className={styles.rectangle333} />
        <img
          src="https://p26-semi-asset.byteimg.com/tos-cn-i-acvclvrq33/f5aaa0c848ba4d46860919f992fb3ecb.png"
          className={cName([styles.onlineWorldAmico1, styles.fade1])}
        />
        <p className={cName([styles.text, styles.fade1])}>产品国际化一站式解决方案</p>
        <p className={cName([styles.asd, styles.fade2])}>
          XXX
          是一个智能国际化翻译平台，为团队提供高效专业的【平台+服务】解决方案，简化本地化管理流程，提高多语言内容管理效率，助力产品国际化转型。
        </p>
        <p className={cName([styles.text1, styles.fade3])}>60+ 业务线已经接入 XXX</p>
        <Button
          type="secondary"
          theme="solid"
          style={{ background: '#07C160' }}
          className={cName([styles.button, styles.fade2])}
          onClick={() => push('/login')}
        >
          开始使用
        </Button>
      </div>

      <div className={styles.rootModule}>
        <div className={styles.rectangle47} />
        <p className={styles.text}>
          <Button style={{ color: '#07C160' }} onClick={() => push('/login')}>
            开始使用
          </Button>
        </p>
        <p className={styles.text1}>支持多格式文档翻译，专业译员及时响应 </p>
        <div className={styles.group20}>
          <p className={styles.text}>文档翻译</p>
        </div>
        <p className={cName([styles.text2, styles.fade1])}>文案管理</p>
        <p className={cName([styles.text3, styles.fade1])}>协同管理产品文案，一键发布快速生效</p>
        <p className={cName([styles.text4, styles.fade1])}>
          <Button style={{ color: '#07C160' }} onClick={() => push('/login')}>
            开始使用
          </Button>
        </p>
        <img
          src="https://p26-semi-asset.byteimg.com/tos-cn-i-acvclvrq33/c6d63b65c14541b29d16c4eab4953135.png"
          className={styles.documentsAmico11}
        />
        <img
          src="https://p26-semi-asset.byteimg.com/tos-cn-i-acvclvrq33/46f73d9fc79e48628f9aefbfe354f7dd.png"
          className={styles.workChatPana11}
        />
      </div>

      <div className={styles.rootWork}>
        <div className={styles.rectangle46} />
        <p className={styles.text}>我们是如何工作的</p>
        <div className={styles.group196}>
          <div className={styles.group195}>
            <div className={styles.autoWrapper}>
              <div className={styles.autoWrapper}>
                <div className={styles.ellipse5} />
                <IconFolderOpen className={styles.semiIconsFolderOpen} />
              </div>
              <p className={styles.text}>创建项目</p>
            </div>
            <IconArrowRight className={styles.semiIconsArrowRight} />
            <div className={styles.autoWrapper1}>
              <div className={styles.autoWrapper}>
                <div className={styles.ellipse6} />
                <img
                  src="https://p26-semi-asset.byteimg.com/tos-cn-i-acvclvrq33/d8f1fb6590a84b5a8d8b597afdce9d70.png"
                  className={styles.cloud}
                />
              </div>
              <p className={styles.text}>整合内容</p>
            </div>
            <IconArrowRight className={styles.semiIconsArrowRight1} />
            <div className={styles.autoWrapper2}>
              <div className={styles.autoWrapper}>
                <div className={styles.ellipse7} />
                <img
                  src="https://p26-semi-asset.byteimg.com/tos-cn-i-acvclvrq33/78356bcd79a7497a84dccc104b41fe04.png"
                  className={styles.globe}
                />
              </div>
              <p className={styles.text}>翻译管理</p>
            </div>
            <IconArrowRight className={styles.semiIconsArrowRight2} />
            <div className={styles.autoWrapper3}>
              <div className={styles.autoWrapper}>
                <div className={styles.ellipse8} />
                <IconTickCircle className={styles.semiIconsTickCircle} />
              </div>
              <p className={styles.text}>一键下发</p>
            </div>
          </div>
        </div>
        <div className={styles.ellipse19} />
      </div>

      <div className={styles.rootUser}>
        <div className={styles.rectangle332} />
        <img
          src="https://p26-semi-asset.byteimg.com/tos-cn-i-acvclvrq33/3c49e9f6ee83453dbd42022fd87c8c72.png"
          className={styles.rectangle}
        />
        <div className={styles.frame724}>
          <div className={styles.ellipse17} />
          <div className={styles.frame722}>
            <p className={styles.text}>译员端</p>
            <p className={styles.text1}>
              XXX 译员端拥有丰富的翻译资源，目前已支持 80+ 的翻译语言，为用户的翻译任务保驾护航。
            </p>
            <p className={styles.text2}>
              <Button style={{ color: '#07C160' }} onClick={() => push('/login')}>
                开始使用
              </Button>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.rootTeam}>
        <div className={styles.rectangle331} />
        <p className={styles.text}>核心功能</p>
        <img
          src="https://p26-semi-asset.byteimg.com/tos-cn-i-acvclvrq33/3b3c7b7417c04f5388d4aefcdc852f33.png"
          className={styles.rectangle}
        />
        <div className={styles.frame723}>
          <div className={styles.ellipse18} />
          <div className={styles.frame721}>
            <p className={styles.text}>可视化编辑器</p>
            <p className={styles.text1}>
              XXX
              可视化编辑器是一款强大的在线翻译工具，基于真实应用程序和文案场景，实现翻译所见即所得。
            </p>
          </div>
        </div>
        <p className={styles.text1}>
          <Button style={{ color: '#07C160' }} onClick={() => push('/login')}>
            开始使用
          </Button>
        </p>
      </div>
    </div>
  );
};

export default memo(Home);
Home.displayName = 'Home';
