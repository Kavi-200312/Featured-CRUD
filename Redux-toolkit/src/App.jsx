
import './App.css'
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import SearchAndExport from './components/SearchAndExport';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import UserForm from './components/UserForm';

export const App = () => {

  return (
    <div className='app-main-container'>
      <Header />
      <section>
        <UserForm />
        <div className="user-table-container">
          <SearchAndExport />
          <UserTable />
          <Pagination />
        </div>
      </section>
      <Toaster />
    </div>
  )
}

