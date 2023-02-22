
import { useState } from 'react';
import AppContent from '../../components/AppContent';
import AppHeader from '../../components/AppHeaders';
import PageTitle from '../../components/PageTitle';
function Homepage() {
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <>
      <PageTitle>TODO LIST</PageTitle>
      <AppHeader filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      <AppContent filterStatus={filterStatus} />
    </>
  )
}

export default Homepage