import styled from './TodoList.module.scss';
import { UpIcon, FilterIcon, MoonIcon, FlagIcon, CloseIcon, PlusIcon, CheckIcon, BellIcon, BarIcon, SearchIcon } from '../../assets/svgs';

function TodoList() {
  return <div className={styled.wrap}>
{/*     <div className={styled.nav}>
      <div className={styled.leftNav}>
        <a><BarIcon className={styled.icon} /></a>
      </div>
      <div className={styled.rightNav}>
        <a><SearchIcon className={styled.icon} /></a>
        <a><BellIcon className={styled.icon} /></a>
      </div>
    </div>
    <h1 className={styled.title}>What&apos;s up, Joy!</h1>
    <div className={styled.toDoWrap}>
      <h2 className={styled.subTitle}>TODAY&apos;S TASKS</h2>
      <ul className={styled.listWrap}>
        <li>
          <input type="checkbox" className={styled.checkbox} />
          <CheckIcon className={styled.checked} />
          <p>Daily meeting with team</p>
        </li>
        <li>
          <input type="checkbox" className={styled.checkbox} />
          <CheckIcon className={styled.checked} />
          <p>Daily meeting with team</p>
        </li>
        <li>
          <input type="checkbox" className={styled.checkbox} />
          <CheckIcon className={styled.checked} />
          <p>Daily meeting with team</p>
        </li>
      </ul>
    </div>
    <div className={styled.buttonWrap}>
      <button type="button" className={styled.addCategoryBtn}> </button>
      <PlusIcon className={styled.plusIcon} />
    </div>
 */}    <AddTodo />
  </div>
}

function AddTodo() {
  return (
    <div>
      <div className={styled.addCloseBtnWrap}>
        <button type="button"> </button>
        <CloseIcon className={styled.closeBtn} />
      </div>
      <input type="text" placeholder='Enter new task' className={styled.toDoInput} />
      <div className={styled.addInputWrap}>
        <input type="date" placeholder='Today' />
        <input type="radio" />
      </div>
      <ul className={styled.addOptionWrap}>
        <li><a><FilterIcon className={styled.addIcon} /></a></li>
        <li><a><FlagIcon className={styled.addIcon} /></a></li>
        <li><a><MoonIcon className={styled.addIcon} /></a></li>
      </ul>
      <div className={styled.addBtnWrap}>
        <button type="button">New task</button>
        <UpIcon className={styled.upIcon} />
      </div>
    </div>
  )
}

export default TodoList
