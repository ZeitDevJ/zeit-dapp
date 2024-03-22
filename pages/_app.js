import Layout from "@/layout/Layout";
import { DataGet } from "@/context/DataContext";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <>
      <DataGet>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataGet>
      <Toaster
        className="move-margin"
        style={{ marginTop: "40px" }}
        position="top-right"
      />
    </>
  );
}
