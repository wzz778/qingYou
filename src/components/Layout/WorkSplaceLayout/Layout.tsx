import { Footer } from './Footer';
import NavBar from './NavBar';

export default function WorkSplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <Footer
        title={''}
        linkList={[]}
        qrCode={undefined}
        copyRight={''}
        siteNumber={''}
        publicNumber={''}
      />
    </>
  );
}
