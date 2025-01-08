
import Sidebar from "@/layouts/sidebar";
import Footer from "@/layouts/footer";

import "@style/globals.css";

export const metadata = {
  title: "Project - Transcrevendo uma Imagem em Texto com AWS Textract",
  description:
    "Desafio para extrair texto de imagens utilizando soluções de reconhecimento avançado.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="flex h-screen bg-gray-200 dark">
        <Sidebar />
        {children}

        <Footer />
      </body>
    </html>
  );
}
