import { useState } from 'react'
import styles from './SelectBar.module.scss'
import PropTypes from 'prop-types'

const CATEGORY = ['work', 'exercise', 'study', 'promise', 'etc']

function SelectBar(props) {
  const { handleSaveCategory, todoCategory } = props
  const [visibleSelectBar, setVisibleSelectBar] = useState(false)
  const [selectItem, setSelectItem] = useState(todoCategory)

  const handleVisibleSelectBar = () => {
    setVisibleSelectBar((prev) => !prev)
  }

  return (
    <div className={styles.selectBarContainer}>
      <button type='button' onClick={handleVisibleSelectBar} className={styles.selectBar}>
        {selectItem}
      </button>
      {visibleSelectBar && (
        <div className={styles.visibleSelectArea}>
          <ul>
            {CATEGORY.map((category) => {
              const handleSelectItem = () => {
                setSelectItem(category)
                setVisibleSelectBar(false)
                handleSaveCategory(category)
              }
              return (
                <li className={styles.categoryItem} key={`categoryItem-${category}`}>
                  <button type='button' className={styles.categoryItemButton} onClick={handleSelectItem}>
                    {category}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

SelectBar.propTypes = {
  todoCategory: PropTypes.string,
  handleSaveCategory: PropTypes.func,
}

export default SelectBar
