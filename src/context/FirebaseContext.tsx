import { getDatabase, ref, push, set, onValue, DatabaseReference, remove, update, get } from 'firebase/database';
import { createContext, useContext, useEffect, useState, useReducer } from 'react';
import { ITodoItem, IUser } from '../types/app-types';
import { useSelector } from 'react-redux'
import { RootState } from '../stores/store';
import { toast } from 'react-hot-toast';
const FirebaseContextProvider = createContext({});

export const useFirebaseContext = () => useContext(FirebaseContextProvider) as IDatabaseActionContext;
enum TodoAction {
    ADD = 'ADD',
    DELETE = 'DELETE',
    UPDATE = 'UPDATE',
    REMOVE_ALL = 'REMOVE_ALL'
}
interface ITodoListAction {
    type: TodoAction;
    payload: ITodoItem
}

const todoListInitialState: ITodoItem[] = []

function todoListReducer(state: ITodoItem[], action: ITodoListAction) {
    const { type, payload } = action;
    switch (type) {
        case TodoAction.ADD: return [...state, payload];
        case TodoAction.DELETE: return state.filter(todo => todo.ID !== payload.ID);
        case TodoAction.UPDATE: return state.map(todo => {
            if (todo.ID === payload.ID) return payload
            else return todo;
        })
        case TodoAction.REMOVE_ALL: {
            console.log('remove all')
            return []
        }
        default: return state;
    }
}

function FirebaseContext({ children }: { children: React.ReactNode }) {
    const [todoList, dispatchTodoList] = useReducer(todoListReducer, todoListInitialState);

    const DOCUMENT_USERS = 'users';
    const db = getDatabase();
    const user = useSelector((state: RootState) => state.user.user);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const userTodoRef = ref(db, `${DOCUMENT_USERS}/${user?.uid}/todoList`);

    function todoListRef() {
        return ref(db, `${DOCUMENT_USERS}/${user?.uid}/todoList`)
    }

    function todoRef(todoID: string) {
        return ref(db, `${DOCUMENT_USERS}/${user?.uid}/todoList/${todoID}`)
    }

    function getTodoList() {
        return onValue(todoListRef(), (snapshot) => {
            snapshot.forEach(childSnapshot => {
                dispatchTodoList({ type: TodoAction.ADD, payload: childSnapshot.val() })
            })

        }, { onlyOnce: true })
    }

    function addTodo(todo: ITodoItem) {
        try {
            const newTodoID = push(userTodoRef).key;
            if (newTodoID) {
                todo.ID = newTodoID;
                set(todoRef(newTodoID), { ...todo }).then(() => {
                    dispatchTodoList({ type: TodoAction.ADD, payload: todo })
                });
            }
            toast.success('Todo added successfully!');
        }
        catch (error) {
            toast.error('Cannot add new todo!')
        }
    }

    function deleteTodo(todo: ITodoItem) {
        todo.ID && remove(todoRef(todo.ID)).then(() => {
            dispatchTodoList({ type: TodoAction.DELETE, payload: todo });
            toast.success('Todo deleted successfully!');
        })
    }

    function updateTodo(todo: ITodoItem) {
        todo.ID && set(todoRef(todo.ID), { ...todo }).then(() => {
            dispatchTodoList({ type: TodoAction.UPDATE, payload: todo });
            toast.success('Todo updated successfully!');
        });
    }

    function writeGoogleUser(user: IUser) {
        onValue(ref(db, `${DOCUMENT_USERS}/${user?.uid}`), snapshot => {
            if ((snapshot.val() as IUser)?.uid) {
                update(ref(db, 'users/' + user.uid), { ...user })
            } else {
                set(ref(db, 'users/' + user.uid), { ...user })
            }
        }, {
            onlyOnce: true
        })
    }

    useEffect(() => {
        const initialTodo: ITodoItem = {
            createdBy: '',
            createdTime: 0,
            status: 'incomplete',
            title: ''
        }
        dispatchTodoList({ type: TodoAction.REMOVE_ALL, payload: initialTodo })
        isLoggedIn && getTodoList()
    }, [isLoggedIn])

    return (
        <FirebaseContextProvider.Provider value={{ addTodo, updateTodo, deleteTodo, todoList, writeGoogleUser }}>
            {children}
        </FirebaseContextProvider.Provider>
    )
}

export default FirebaseContext

interface IDatabaseActionContext {
    addTodo: (todo: ITodoItem) => void
    updateTodo: (todo: ITodoItem) => void
    deleteTodo: (todo: ITodoItem) => void
    todoList: ITodoItem[]
    writeGoogleUser: (user: IUser) => void
}