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
  category,
  isLike,
  handleChangeText,
  handleLike,
  handleModal,
  handleChangeDateProp,
  handleChangeCategoryProp,
}) {
  const ref = useRef()
  const [isCalendar, setIsCalendar] = useState(false)
  useOnClickOutside(ref, () => setIsCalendar(false))

  useEffect(() => {
    ref.current.focus()
  }, [])

  const handleContentClick = () => setIsCalendar((prev) => !prev)
  const handleChangeDate = (val) => {
    handleChangeDateProp(val)
    setIsCalendar(false)
  }

  return (
    <Portal>
      <div className={styles.wrapper}>
        <SelectBar handleSaveCategory={handleChangeCategoryProp} todoCategory={category} />
        <button type='button' className={styles.closeBtn} onClick={handleModal}>
          X
        </button>
        <button type='button' className={styles.pin} onClick={handleLike}>
          {isLike ? <PinFixedIcon /> : <PinIcon />}
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
  category: PropTypes.string,
  isLike: PropTypes.bool,
  handleLike: PropTypes.func,
  handleChangeText: PropTypes.func,
  handleModal: PropTypes.func,
  handleChangeDateProp: PropTypes.func,
  handleChangeCategoryProp: PropTypes.func,
}
