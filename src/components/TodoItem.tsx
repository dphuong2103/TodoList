import { format, set } from 'date-fns';
import { motion } from 'framer-motion';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useFirebaseContext } from '../context/FirebaseContext';
import { useTodoModalContext } from '../context/TodoModalContext';
import styles from '../styles/modules/todoItem.module.scss';
import { ITodoItem } from '../types/app-types';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }: { todo: ITodoItem }) {
  const { updateTodo, deleteTodo } = useFirebaseContext();
  const { setIsModalOpened, setTodo, setType } = useTodoModalContext();

  const handleCheck = () => {
    todo.status = todo.status === 'complete' ? 'incomplete' : 'complete';
    updateTodo(todo);
  };

  function handleDelete() {
    deleteTodo(todo);
  }
  function handleUpdateButtonClick() {
    setType('update');
    setTodo(todo);
    setIsModalOpened(true);
  }

  return (
    <motion.div className={styles.item} variants={child}>
      <div className={styles.todoDetails}>
        <CheckButton checked={todo.status === 'complete'} handleCheck={handleCheck} />
        <div className={styles.texts}>
          <p
            className={getClasses([
              styles.todoText,
              todo.status === 'complete' && styles['todoText--completed'],
            ])}
          >
            {todo.title}
          </p>
          <p className={styles.time}>{format(new Date(), 'p, dd/MM/yyyy')}</p>
        </div>
      </div>
      <div className={styles.todoActions}>
        <div
          className={styles.icon}
          onClick={handleDelete}
          role='button'
          onKeyDown={handleDelete}
          tabIndex={0}
        >
          <MdDelete />
        </div>
        <div
          className={styles.icon}
          onClick={handleUpdateButtonClick}
          role='button'
          onKeyDown={handleUpdateButtonClick}
          tabIndex={0}
        >
          <MdEdit />
        </div>
      </div>
    </motion.div>
  );
}

export default TodoItem;