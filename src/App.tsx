import { Suspense, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./provider";
import { Layout } from "./layout";

import { Loader } from "./components/loader";
import { RouterComponent } from "./routes";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Suspense fallback={<Loader onComplete={() => setIsLoading(false)} />}>
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <Router>
          <Provider>
            <Layout>
              <RouterComponent />
            </Layout>
          </Provider>
        </Router>
      )}
    </Suspense>
  );
}

export default App;
