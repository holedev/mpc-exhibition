import { useState } from 'react'
import axios from 'axios'
import { useEffect, useContext } from 'react'
import Post from './Post'
import styles from './Home.module.css'
import { Context } from '../../store/PostsContext'
import { Context as UserContext } from '../../store/UserContext'

function Home() {
  const [data, setData] = useContext(Context)
  const [user] = useContext(UserContext)

  useEffect(() => {
    ;(async () => {
      const userID = window.localStorage.getItem('userID') ?? 'anonymous'
      await axios
        .get(import.meta.env.VITE_API_URL + '/post/' + userID)
        .then((res) => {
          setData(res.data?.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })()
  }, [user])

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.title}>Các sản phẩm WEB DESIGN 2023</div>
      </div>
      <div className={styles.body}>
        {data?.map((d) => {
          return <Post key={d.id} {...d} />
        })}
      </div>
    </div>
  )
}

export default Home
