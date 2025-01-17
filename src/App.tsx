import { Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Landing } from './pages';
import { AppThemeProvider } from './provider';
import { Layout } from './layout';

function App() {
  return (
    <Suspense fallback={<>Loading</>}>
      <Router>
        <AppThemeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
            </Routes>
          </Layout>
        </AppThemeProvider>
      </Router>
    </Suspense>
  );
}

export default App;
