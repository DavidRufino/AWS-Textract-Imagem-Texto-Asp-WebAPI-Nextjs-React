import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function DocumentDialog({
  name,
  handleExtract,
  fileChanged,
  isPending,
}) {
  const [uploadOption, setUploadOption] = useState("local");
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Initially set dialog closed
  const [isOpen, setIsOpen] = useState(false);

  // Options for feature types
  //  TEXT: Extrai texto simples de documentos.
  //  FORMS: Detecta formulários (key-value pairs).
  //  TABELAS: Detecta tabelas e extrai dados estruturados delas.
  const featureOptions = ["TABLES","FORMS"];

  // Open and Close functions for dialog
  function open() {
    setIsOpen(true);
    // Clear the states
    setFile(null);
    setFileUrl("");
    setSelectedFeatures([]);
  }

  function close() {
    setIsOpen(false);
  }

  const handleOptionChange = (option) => {
    setUploadOption(option);
    // Reset the other option's value
    setFile(null);
    setFileUrl("");
    fileChanged("/test.pdf");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    // Create an object URL for the image
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    fileChanged(objectUrl);
  };

  const handleFileUrlChange = (value) => {
    setFileUrl(value);
    fileChanged(value);
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFeatures((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((item) => item !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if at least one feature type is selected
    if (selectedFeatures.length === 0) {
      alert("Selecione pelo menos um tipo de saida.");
      return;
    }

    const formData = new FormData();

    if (uploadOption === "local" && file) {
      console.log("Arquivo selecionado:", file);
      formData.append("file", file);
    } else if (uploadOption === "url" && fileUrl) {
      console.log("URL:", fileUrl);
      formData.append("fileUrl", fileUrl);
    } else {
      alert("Selecione um arquivo local ou digite url");
      return;
    }

    selectedFeatures.forEach((feature) => {
      formData.append("featureTypes", feature);
    });
    
    handleExtract(formData);

    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={open}
        className="px-4 py-2 inline-flex items-center  text-sm font-normal rounded-md border border-gray-200 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none bg-blue-600"
        disabled={isPending}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={18}
          width={18}
          fill="currentColor"
           className="mr-4"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
        </svg>{" "}
        Analisar {name}
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-neutral-800 p-6 border border-gray-300/20 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Adicionar {name}
              </DialogTitle>

              {/* Form to add product details */}
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {/* Option Selection */}
                <div className="mb-4">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="uploadOption"
                      value="local"
                      checked={uploadOption === "local"}
                      onChange={() => handleOptionChange("local")}
                      className="form-radio text-blue-500 h-5 w-5"
                    />
                    <span className="ml-2 dark:text-white text-black">
                      Enviar arquivo local
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="uploadOption"
                      value="url"
                      checked={uploadOption === "url"}
                      onChange={() => handleOptionChange("url")}
                      className="form-radio text-blue-500 h-5 w-5"
                    />
                    <span className="ml-2 dark:text-white text-black">
                      Entrar com URL
                    </span>
                  </label>
                </div>
                {/* END Option Selection */}

                {/* File Input */}
                {uploadOption === "local" && (
                  <div className="mb-4">
                    <label
                      htmlFor="fileInput"
                      className="block dark:text-white text-black font-normal mb-2"
                    >
                      Selecionar arquivo local
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 h-[40px]
                         file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-100 file:text-blue-700
                         hover:file:bg-blue-200"
                    />
                  </div>
                )}
                {/* END File Input */}

                {/* URL Input */}
                {uploadOption === "url" && (
                  <div className="mb-4">
                    <label
                      htmlFor="urlInput"
                      className="block dark:text-white text-black font-normal mb-2"
                    >
                      Endereço arquivo externo
                    </label>
                    <input
                      type="url"
                      id="urlInput"
                      value={fileUrl}
                      onChange={(e) => handleFileUrlChange(e.target.value)}
                      placeholder="https://example.com/file.jpg"
                      className="h-[40px] block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
                {/* END URL Input */}

                {/* Feature Type Selection */}
                <div className="mb-4">
                  <h2 className="font-normal dark:text-white text-black mb-2">
                    Selecione Tipos de Saida
                  </h2>
                  {featureOptions.map((feature) => (
                    <label
                      key={feature}
                      className="inline-flex items-center mr-6"
                    >
                      <input
                        type="checkbox"
                        value={feature}
                        checked={selectedFeatures.includes(feature)}
                        onChange={handleFeatureChange}
                        className="form-checkbox text-blue-500 h-5 w-5"
                      />
                      <span className="ml-2 dark:text-white text-black">
                        {feature}
                      </span>
                    </label>
                  ))}
                </div>
                {/* END Feature Type Selection */}

                <div className="flex justify-end space-x-4">
                  <Button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-md bg-neutral-700 py-1.5 px-3 text-sm font-semibold text-white focus:outline-none data-[hover]:bg-neutral-600 data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    Enviar
                  </Button>
                  <Button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md bg-neutral-700 py-1.5 px-3 text-sm font-semibold text-white focus:outline-none data-[hover]:bg-neutral-600 data-[focus]:outline-1 data-[focus]:outline-white"
                    onClick={close}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
              {/* ENDForm to add product details */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
