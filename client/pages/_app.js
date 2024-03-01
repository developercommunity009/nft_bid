import "../styles/globals.css";


// INTERNAL IMORT
import { NaveBar, Footer } from "../components/componentIndex";
import { NFTMarkitplaceProvider } from "../Context/NFTMarketplaceContext";
import { store } from "../app/store";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"



const MyApp = ({ Component, pageProps }) => (
  <div>
    <Provider store={store}  >
    <SessionProvider session={pageProps}>
    <NFTMarkitplaceProvider>
      <NaveBar />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    </NFTMarkitplaceProvider>
    </SessionProvider>
    </Provider>
  </div>
);

export default MyApp;
