import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useFirebaseContext } from '../context/FirebaseContext';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function AppContent({ filterStatus }: { filterStatus: string }) {
  const { todoList } = useFirebaseContext();

  const sortedTodoList = [...todoList];

  const filterTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial='hidden'
      animate='visible'
    >
      <AnimatePresence>
        {filterTodoList && filterTodoList.length > 0 ? (
          filterTodoList.map((todo) => <TodoItem key={todo.ID} todo={todo} />)
        ) : (
          <motion.p className={styles.emptyText} variants={child}>
            No Todo Found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
