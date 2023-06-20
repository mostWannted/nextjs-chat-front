import "../styles/auth.css";
import "../styles/index.css";
import "../styles/signin.css";
import "../styles/home.css";
import "../styles/chats.css";


export default function App({ Component, pageProps }) {
  return (
    // <ContextProvider>
    <Component {...pageProps} />
    // </ContextProvider>
  );
}
