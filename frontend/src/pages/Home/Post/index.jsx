import clsx from 'clsx'
import axios from 'axios'
import styles from './Post.module.css'
import { useContext } from 'react'
import { Context as PostsContext } from '../../../store/PostsContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Post(props) {
  const MySwal = withReactContent(Swal)
  const [data, setData] = useContext(PostsContext)

  const handleReact = async (id) => {
    await axios
      .post(import.meta.env.VITE_API_URL + '/post/react/' + id)
      .then((res) => {
        const dataRes = res.data?.data
        setData((prev) => {
          return prev.map((p) => {
            if (p.id === dataRes.id)
              return {
                ...p,
                react: dataRes.react,
                isReacted: !p.isReacted,
              }
            return p
          })
        })
      })
      .catch((err) => {
        return MySwal.fire(<p>Đăng nhập trước đã!</p>)
      })
  }

  return (
    <div className={styles.wrapper}>
      <div style={{ backgroundImage: `url('${props?.banner}')` }} className={styles.banner}>
        {/* <img className={styles.bannerImg} src={props?.banner} alt='Banner' /> */}
      </div>
      <div className={styles.info}>
        <div className={styles.author}>Team: {props?.author}</div>
        <div title={props?.url} className={styles.url}>
          Link Demo:{' '}
          <a href={props.url} target='_blank' className={styles.linkDemo}>
            {props?.url}
          </a>
        </div>
        <div onClick={() => handleReact(props?.id)} className={styles.react}>
          <div
            title='Give a BUG?'
            className={clsx(styles.reactIcon, {
              [styles.isReacted]: props?.isReacted,
            })}
          >
            <i className='fa-solid fa-bug'></i>
          </div>
          <div className={styles.reactCount}>{props?.react}</div>
        </div>
      </div>
    </div>
  )
}

export default Post
