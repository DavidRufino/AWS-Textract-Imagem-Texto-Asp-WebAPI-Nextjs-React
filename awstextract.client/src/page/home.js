"use client";

import { useState, useTransition } from "react";

import TextractView from "@component/textractView";

import {  getTextFromFile } from "@action/textract";
import DocumentDialog from "@component/documentDialog";

import clsx from "clsx";

export default function HomePage() {
  const [isPending, startTransition] = useTransition();

  const [document, setDocument] = useState("/test.pdf");
  const [textract, setTextrac] = useState(null);

  async function handleExtractText(formData) {
    console.log("[HomePage] formData", formData);

    startTransition(async () => {
      const textractResult = await getTextFromFile(formData);
      setTextrac(textractResult);
    });
  }

  return (
    <main className="w-full flex flex-col gap-4">
      <nav
        className={clsx(
          "relative w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 px-4 sm:px-6 lg:px-8 py-2"
        )}
      >
        <div className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow">
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div
              data-hs-scrollspy="#scrollspy"
              className="py-2 md:py-0 [--scrollspy-offset:220] md:[--scrollspy-offset:70] flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1"
            >
              <DocumentDialog
                name={"Arquivo"}
                handleExtract={handleExtractText}
                fileChanged={setDocument}
                isPending={isPending}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className={clsx("flex")}>
        <div className="flex-1 px-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Project - Transcrevendo uma Imagem em Texto com AWS Textract
          </h1>
          <p className="mt-1 text-gray-600">
            Desafio para extrair texto de imagens utilizando soluções de
            reconhecimento avançado.
          </p>
        </div>
      </section>

      <section className={clsx("px-6 my-4 h-screen overflow-hidden")}>
        <div className="p-6 bg-white dark:bg-white rounded-lg grid sm:grid-cols-2  w-full h-full gap-6">
          <iframe
            src={document}
            className="w-full h-full aspect-video rounded-lg row-span-2"
          ></iframe>

          <div className="overflow-y-auto h-full max-h-[calc(100vh-16rem)] row-span-2">
            {textract && <TextractView data={textract} />}
          </div>
        </div>
      </section>
      {/* END Content */}

    </main>
  );
}
