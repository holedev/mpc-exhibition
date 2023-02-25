import styles from './DefaultLayout.module.css'
import Header from '../../components/Header'
import clsx from 'clsx'

function DefaultLayout({ children }) {
  return (
    <div className={clsx(styles.wrapper)}>
      <Header />
      <div className={clsx(styles.body, 'grid')}>{children}</div>
    </div>
  )
}

export default DefaultLayout
