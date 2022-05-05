import { useState } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addTodo } from '../../../../redux/actions'

import classes from './InputForm.module.scss'

function InputForm({ add }) {
  const [input, setInput] = useState('')

  const changeInputHandler = (e) => {
    setInput(e.target.value)
    console.log(input)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    add(input)

    setInput('')
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <input type='text' className={classes.form__input} onChange={changeInputHandler} value={input} />
      <button type='submit' className={classes.form__btn}>
        추가
      </button>
    </form>
  )
}

InputForm.propTypes = {
  add: PropTypes.func,
}

export default connect(
  (_) => ({}),
  (dispatch) => ({
    add: (text) => {
      dispatch(addTodo(text))
    },
  })
)(InputForm)
