import React from 'react';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import { useTodoModalContext } from '../context/TodoModalContext';

export default function AppHeader({ filterStatus, setFilterStatus }: IAppHeaderProps) {
  const { setIsModalOpened, setType } = useTodoModalContext();

  function updateFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilterStatus(e.target.value)
  }

  function handleClickAdd() {
    setType('add');
    setIsModalOpened(true);
  }

  return (
    <div className={styles.appHeader}>
      <Button variant='primary' onClick={handleClickAdd}>
        Add Task
      </Button>
      <SelectButton id='status' value={filterStatus} onChange={updateFilter}>
        <option value='all'>All</option>
        <option value='incomplete'>Incomplete</option>
        <option value='complete'>Complete</option>
      </SelectButton>
    </div>
  );
}

interface IAppHeaderProps {
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>
}