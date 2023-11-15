import styles from './index.module.scss';
import TeamNameCard from '@/components/SettingPageComps/components/team/TeamName';
import TeamDescription from '@/components/SettingPageComps/components/team/TeamDescription';

const Information = () => {
  return (
    <main className={styles.settingPage} style={{ padding: 15 }}>
      <div className={styles.settingContainer}>
        <div className={styles.settingView}>
          <div id="normalInfo">
            <div className={styles.settingViewItem}>
              <TeamNameCard />
            </div>
            <div className={styles.settingViewItem}>
              <TeamDescription />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Information;
