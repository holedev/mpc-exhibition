import clsx from 'clsx'
import { mpcLogo, googleLogo } from '../../assets'
import styles from './Header.module.css'
import { useContext } from 'react'
import { Context } from '../../store/UserContext/Context'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

function Header() {
  const [user] = useContext(Context)
  const auth = getAuth()

  const handleLoginGoogle = async () => {
    const provider = new GoogleAuthProvider()

    const res = await signInWithPopup(auth, provider)
  }

  const handleLogout = () => {
    user?.auth.signOut()
  }

  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.headerWrap, 'grid')}>
        <div className={styles.left}>
          <img className={styles.MPCLogo} src={mpcLogo} alt='MPC LOGO' />
        </div>

        <div className={styles.right}>
          {user?.uid ? (
            <>
              <div className={styles.user}>
                <div className={styles.userAvatar}>
                  <img className={styles.userImg} src={user?.photoURL} alt='User PhotoURL' />
                </div>
                <div className={styles.displayName}>{user?.displayName}</div>
              </div>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Đăng xuất
              </button>
            </>
          ) : (
            <button onClick={handleLoginGoogle} className={styles.googleLoginBtn}>
              <div className={styles.googleLoginIcon}>
                <img className={styles.googleLoginIconImg} src={googleLogo} alt='Google Icon' />
              </div>
              <div className={styles.googleLoginText}>Đăng nhập với Google</div>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
