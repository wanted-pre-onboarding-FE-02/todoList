import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { changeDateForm } from 'utils'
import { cx } from 'styles'
import styles from './index.module.scss'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import useOnClickOutside from 'hooks/useOnClickOutside'

export default function TodoDate({ date, handlePrevClick, handleNextClick, handleCalChange }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef()
  // useOnClickOutside(ref, () => setIsVisible(false))

  const handleContentClick = () => setIsVisible((prev) => !prev)
  const handleChange = (val) => {
    handleCalChange(val)
    setIsVisible(false)
  }

  return (
    <section className={styles.wrapper}>
      <button
        type='button'
        aria-label='prev date'
        className={cx(styles.arrow, styles.left)}
        onClick={handlePrevClick}
      />
      <button type='button' className={styles.content} onClick={handleContentClick}>
        {changeDateForm(date)}
      </button>
      <button
        type='button'
        aria-label='next date'
        className={cx(styles.arrow, styles.right)}
        onClick={handleNextClick}
      />
      {isVisible && (
        <div className={styles.calWrapper} ref={ref}>
          <Calendar className={styles.calendar} locale='en' value={date} onChange={handleChange} />
        </div>
      )}
    </section>
  )
}

TodoDate.propTypes = {
  date: PropTypes.instanceOf(Date),
  handlePrevClick: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleCalChange: PropTypes.func,
}
