import UserNameSettingCard from '@/components/SettingPageComps/components/UserName';
import EmailSettingCard from '@/components/SettingPageComps/components/Email';

import styles from './index.module.scss';
import AvatarettingCard from '@/components/SettingPageComps/components/Avatar';

const Account = () => {
  return (
    <main className={styles.settingPage}>
      <div className={styles.settingContainer}>
        <div className={styles.settingView}>
          <div id="normalInfo">
            <div className={styles.settingViewItem}>
              <AvatarettingCard />
            </div>
            <div className={styles.settingViewItem}>
              <UserNameSettingCard />
            </div>
            <div className={styles.settingViewItem}>
              <EmailSettingCard />
            </div>
            {/* <div className={styles.settingViewItem}>
              <DescriptionSettingCard />
            </div> */}
          </div>
          {/* {user && user.githubId && (
            <div id='thirdPartyLogin'>
              <ThirdPartyLoginInfoCard />
            </div>
          )} */}
        </div>
      </div>
    </main>
  );
};

export default Account;
