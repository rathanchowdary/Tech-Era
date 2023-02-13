import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import './App.css'
import CourseView from './components/CourseView'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseView} />
    <Route component={NotFound} />
  </Switch>
)

export default App
