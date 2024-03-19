import Layout from "@/layout/Layout";
import { DataGet } from "@/context/DataContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <DataGet>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataGet>
  );
}
