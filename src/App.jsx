import TopRecords from "./pages/TopRecords";
import PersonalRecords from "./pages/PersonalRecords";
import Recent from "./pages/Recent";
import AddFish from "./pages/AddFish";
import AllFish from "./pages/AllFish";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
// import { ThemeProvider } from "react-bootstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    // <ThemeProvider breakpoints={['lg', 'xxs']} minBreakpoint="xxs">
      <Router>
        <div className="main-app">
          <Navigation />
          <Routes>
            <Route path="/" element={<Recent />} />
            <Route path="/allfish" element={<AllFish />} />
            <Route path="/toprecords" element={<TopRecords />} />
            <Route path="/personalrecords" element={<PersonalRecords />} />
            <Route path="/addfish" element={<AddFish />} />
          </Routes>
        </div>
      </Router>

    // </ThemeProvider>

      
  );
}

export default App;
