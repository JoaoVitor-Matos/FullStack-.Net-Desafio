import { BrowserRouter, Routes, Route} from 'react-router-dom';
import InvitedPage from './pages/invited';
import AcceptedPage from './pages/accepted';
import NewLeadPage from './pages/new';
import DeclinedPage from './pages/declined';


function App() {
  return (
    <BrowserRouter>
      <Routes>
    <Route path="/invited" element={<InvitedPage />} />
    <Route path="/accepted" element={<AcceptedPage />} />
    <Route path="/declined" element={<DeclinedPage />} />
    <Route path="/new" element={<NewLeadPage />} />
  </Routes>
    </BrowserRouter>
  );
}

export default App;
