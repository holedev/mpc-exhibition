import { useState } from 'react'
import axios from 'axios'
import { useEffect, useContext } from 'react'
import Post from './Post'
import styles from './Home.module.css'
import { Context } from '../../store/PostsContext'
import { Context as UserContext } from '../../store/UserContext'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Home() {
  const [data, setData] = useContext(Context)
  const [user] = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const userID = window.localStorage.getItem('userID') || 'anonymous'
      await axios
        .get(import.meta.env.VITE_API_URL + '/post/' + userID)
        .then((res) => {
          setData(res.data?.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    })()
  }, [user])

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.title}>Các sản phẩm WEB DESIGN 2023</div>
      </div>
      {loading && (
        <SkeletonTheme borderRadius={4} baseColor='#eee' highlightColor='#fff'>
          <p>
            <Skeleton count={10} />
          </p>
        </SkeletonTheme>
      )}
      {!loading && (
        <div className={styles.body}>
          {data?.map((d) => {
            return <Post key={d.id} {...d} loading={loading} />
          })}
        </div>
      )}
    </div>
  )
}

export default Home
