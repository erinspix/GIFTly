import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ItemDetail from './pages/ItemDetail';
import Login from './pages/Login';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'

import { AuthProvider } from './context/AuthContext';

import './App.css'

const httpLink = createHttpLink({ 
  uri: '/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

function App() {
  const [user, setUser] = useState()

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Navbar />
        <main className='wrapper'>
          <Outlet />
        </main>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
