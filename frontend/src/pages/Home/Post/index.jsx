import clsx from 'clsx'
import axios from 'axios'
import styles from './Post.module.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { Context as PostsContext } from '../../../store/PostsContext'
import { Context as UserContext } from '../../../store/UserContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Post(props) {
  const MySwal = withReactContent(Swal)
  const ref = useRef(null)
  const [data, setData] = useContext(PostsContext)
  const [user, setUser] = useContext(UserContext)

  const [admin, setAdmin] = useState(() => {
    const regex = /it.mpclub@ou\.edu\.vn/
    return regex.test(user?.email)
  })

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
        return MySwal.fire(<p>Vui lòng đăng nhập bằng mail SV OU!</p>)
      })
  }

  const exportCSV = (res) => {
    let data = ''

    res.data.forEach((item) => {
      data += item + '\n'
    })

    const universalBOM = '\uFEFF'
    const element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/csv; charset=utf-8,' + encodeURIComponent(universalBOM + data)
    )
    element.download = `${res.author}.csv`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleExport = async (id) => {
    await axios
      .post(import.meta.env.VITE_API_URL + '/post/export/' + id)
      .then((res) => {
        exportCSV(res.data?.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const lazyLoad = (element) => {
    if (element.getAttribute('lazy-src')) {
      const url = element.getAttribute('lazy-src')
      element.setAttribute('style', `background-image: url('${url}')`)
      element.removeAttribute('lazy-src')
    }
  }

  useEffect(() => {
    let observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        lazyLoad(entries[0].target)
      }
    })
    observer.observe(ref.current)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div ref={ref} lazy-src={props?.banner} className={styles.banner}></div>
      <div className={styles.info}>
        <div className={styles.author}>
          Team: <b>{props?.author}</b>
        </div>
        <div title={props?.url} className={styles.url}>
          <div>Link Demo:</div>
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
      {admin && (
        <div onClick={() => handleExport(props?.id)} className={styles.export}>
          <i className='fa-solid fa-download'></i>
        </div>
      )}
    </div>
  )
}

export default Post
