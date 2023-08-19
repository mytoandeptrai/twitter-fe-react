import { useTranslation } from 'react-i18next'
import './App.css'

function App() {
  const { t } = useTranslation()
  return (
    <div className='App'>
      <header className='App-header'>
        <span className='badge rounded-pill text-bg-danger me-1'>{t('common.button.search')}</span>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
