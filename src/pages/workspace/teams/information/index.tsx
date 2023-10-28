import styles from './index.module.scss';
import useUserStore from '@/store/user';
import TeamNameCard from '@/components/SettingPageComps/components/team/TeamName';
import useSWR from 'swr';
import useTeamStore from '@/store/team';
import TeamDescription from '@/components/SettingPageComps/components/team/TeamDescription';

const Information = () => {
  const { user } = useUserStore();
  const getContainer = () => {
    return document.querySelector('window') as HTMLElement | Window;
  };

  return (
    <main className={styles.settingPage}>
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
