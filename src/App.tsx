import { Suspense, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./provider";
import { Layout } from "./layout";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { Loader } from "./components/loader";
import { RouterComponent } from "./routes";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
    >
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
    </GoogleOAuthProvider>
  );
}

export default App;
