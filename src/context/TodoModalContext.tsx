import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineClose } from 'react-icons/md';
import styles from '../styles/modules/modal.module.scss'
import Button from '../components/Button'
import { createContext, useContext, useEffect, useState } from 'react';
import { ITodoItem } from '../types/app-types';
import { useAppSelector } from '../stores/hooks';
import { useFirebaseContext } from './FirebaseContext';
import { toast } from 'react-hot-toast';
const dropin = {
    hidden: {
        opacity: 0,
        transform: 'scale(0.9)',
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: 'scale(0.9)',
        opacity: 0,
    },
};

const ModalContextProvider = createContext<ITodoModalContextValue>({
    setIsModalOpened: () => false,
    setTodo: () => null,
    setType: () => null
});


export const useTodoModalContext = () => useContext(ModalContextProvider) as ITodoModalContextValue;

function TodoModalContext({ children }: { children: React.ReactNode }) {
    const { addTodo, updateTodo } = useFirebaseContext();
    const user = useAppSelector(state => state.user.user)

    const [type, setType] = useState<'add' | 'update'>('add')
    const [isModalOpened, setIsModalOpened] = useState(false);

    const initialTodo: ITodoItem = {
        title: '',
        createdBy: user!.uid,
        status: 'incomplete',
        createdTime: 0
    }

    const [todo, setTodo] = useState<ITodoItem>(initialTodo);

    useEffect(() => {
        !isModalOpened && setTodo(prev => initialTodo);
    }, [isModalOpened])

    const modalTitle = (type === 'update' && todo.ID) ? 'Update Task' : 'Add Task';

    function handleSubmitTodo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!todo.title) {
            toast.error('Please input title!');
            return;
        }

        if (type === 'update') {
            updateTodo(todo);
        }
        else if (type === 'add') {
            addTodo(todo);
        }
        setIsModalOpened(false);
        setTodo(initialTodo);
    }
    
    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTodo(prev => { return { ...prev, title: e.target.value } })
    };

    function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setTodo(prev => { return { ...prev, status: (e.target.value as ITodoItem['status']) } })
    }

    const value = {
        setType,
        setIsModalOpened,
        setTodo
    }

    return (
        <ModalContextProvider.Provider value={value}>
            <AnimatePresence>
                {
                    isModalOpened &&
                    <motion.div
                        className={styles.wrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={styles.container}
                            variants={dropin}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                        >
                            <motion.div
                                className={styles.closeButton}
                                onClick={() => setIsModalOpened(false)}
                                onKeyDown={() => setIsModalOpened(false)}
                                tabIndex={0}
                                role='button'

                                exit={{ top: 40, opacity: 0 }}
                            >
                                <MdOutlineClose />
                            </motion.div>
                            <form className={styles.form} onSubmit={handleSubmitTodo}>
                                <h1 className={styles.formTitle}>
                                    {modalTitle}
                                </h1>
                                <label htmlFor='title'>
                                    Title
                                    <input
                                        value={todo.title}
                                        type='text'
                                        id='title'
                                        onChange={handleTitleChange}
                                    />
                                </label>
                                <label htmlFor='status'>
                                    Status
                                    <select
                                        name='status'
                                        id='status'
                                        value={todo.status}
                                        onChange={handleStatusChange}
                                    >

                                        <option value='incomplete'>Incomplete</option>
                                        <option value='complete'>Complete</option>

                                    </select>
                                </label>
                                <div className={styles.buttonContainer}>

                                    <Button
                                        type='button'
                                        variant='secondary'
                                        onClick={() => setIsModalOpened(false)}
                                        onKeyDown={() => setIsModalOpened(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type='submit' variant='primary'>
                                        {type === 'update' ? 'Update' : 'Add'} Task
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
            {children}
        </ModalContextProvider.Provider>

    )
}

export default TodoModalContext

interface ITodoModalContextValue {
    setType: React.Dispatch<React.SetStateAction<'add' | 'update'>>,
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>,
    setTodo: React.Dispatch<React.SetStateAction<ITodoItem>>
}