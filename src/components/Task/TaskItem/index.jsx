import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { CheckIcon } from '../../../assets/svgs/index'
import { cx } from '../../../styles/index'

function TaskItem({ task }) {
  const { label, isDone, id } = task

  const inputRef = useRef()
  const [_isDone, setIsDone] = useState(isDone)

  const handleClick = useCallback((e) => {
    e.preventDefault()
    setIsDone((prev) => !prev)
  }, [])

  useEffect(() => {
    inputRef.current.checked = !!_isDone
  }, [_isDone])

  return (
    <div>
      <label aria-hidden='true' onClick={handleClick} htmlFor={`checkbox-${id}`} className={styles.container}>
        <div className={styles.checkboxWrapper}>
          <input ref={inputRef} className={styles.input} id={`checkbox-${id}`} name='checkbox-group' type='checkbox' />
          <span className={styles.mark}>
            <CheckIcon fill='currentColor' stroke='currentColor' />
          </span>
        </div>
        <div className={styles.labelWrapper}>
          <p className={cx(styles.label, _isDone && styles.crossText)}>{label}</p>
        </div>
      </label>
    </div>
  )
}

export default TaskItem
