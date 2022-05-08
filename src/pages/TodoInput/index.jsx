import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { changeDateForm } from 'utils'
import styles from './index.module.scss'
import { PinIcon, PinFixedIcon } from 'assets/svgs'

import Portal from 'components/Portal'
import Modal from 'components/Modal'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import useOnClickOutside from 'hooks/useOnClickOutside'
import SelectBar from 'pages/TodoCategory/SelectBar'

export default function TodoInput({
  text,
  date,
  todoCategory,
  todoIsLike,
  handleLike,
  handleChangeText,
  handleModal,
  handleCalChange,
  handleSaveCategory,
}) {
  const ref = useRef()
  const [isCalendar, setIsCalendar] = useState(false)
  useOnClickOutside(ref, () => setIsCalendar(false))

  useEffect(() => {
    ref.current.focus()
  }, [])

  const handleContentClick = () => setIsCalendar((prev) => !prev)
  const handleChangeDate = (val) => {
    handleCalChange(val)
    setIsCalendar(false)
  }
  return (
    <Portal>
      <div className={styles.wrapper}>
        <SelectBar handleSaveCategory={handleSaveCategory} todoCategory={todoCategory} />
        <button type='button' className={styles.closeBtn} onClick={handleModal}>
          X
        </button>
        <button type='button' className={styles.pin} onClick={handleLike}>
          {todoIsLike ? <PinFixedIcon /> : <PinIcon />}
        </button>
        <div className={styles.formWrapper}>
          <button type='button' className={styles.date} onClick={handleContentClick}>
            {changeDateForm(date)}
          </button>
          <input type='text' ref={ref} placeholder='New task' value={text} onChange={handleChangeText} />
        </div>
      </div>
      {isCalendar && (
        <Modal>
          <div className={styles.calWrapper} ref={ref}>
            <Calendar className={styles.calendar} locale='en' value={date} onChange={handleChangeDate} />
          </div>
        </Modal>
      )}
    </Portal>
  )
}

TodoInput.propTypes = {
  text: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  todoIsLike: PropTypes.bool,
  todoCategory: PropTypes.string,
  handleLike: PropTypes.func,
  handleSaveCategory: PropTypes.func,
  handleChangeText: PropTypes.func,
  handleModal: PropTypes.func,
  handleCalChange: PropTypes.func,
}
