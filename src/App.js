import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { useStateValue } from './context/StateProvider';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [{ user }] = useStateValue();
  console.log(user);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
          <div className="app__body">
            <Router>
              <Switch>
                <Route path="/rooms/:roomId">
                  <Sidebar />
                  <Chat />
                </Route>
                <Route path="/">
                  <Sidebar />
                </Route>
              </Switch>
            </Router>
          </div>

        )}
    </div>
  );
}

export default App;
