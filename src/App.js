import {Route, Redirect, Switch} from 'react-router-dom'

import Courses from './Components/Courses'
import CourseCard from './Components/CourseCard'
import NotFound from './Components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Courses} />
      <Route exact path="/courses/:id" component={CourseCard} />
      <Route path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </>
)

export default App
