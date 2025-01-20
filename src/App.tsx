import { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Landing } from './pages';
import { AppThemeProvider } from './provider';
import { Layout } from './layout';
import { EarnMoney } from './pages/earn';

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <Router>
        <AppThemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/earn" element={<EarnMoney />} />
            </Routes>
          </Layout>
        </AppThemeProvider>
      </Router>
    </Suspense>
  );
}

export default App;
