import { useState } from "react";

import clsx from "clsx";

export default function TextractView({ data }) {
  const [selectedType, setSelectedType] = useState("ExtractedText");
  // Armazenar item selecionado
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    // Atualziar item selecionado
    setSelectedItem(item);
  };

  return (
    <div className="py-4 flex flex-col">
      <p className="text-gray-600 py-2">Resposta</p>
      {/* Toggle Buttons */}
      <div className="sticky top-0 z-10 mb-2 flex gap-2 bg-white dark:bg-white pb-3 rounded-sm">
        <button
          onClick={() => setSelectedType("ExtractedText")}
          className={clsx(
            "px-4 py-2 rounded",
            selectedType === "ExtractedText"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          )}
        >
          Texto
        </button>
        <button
          onClick={() => setSelectedType("Tables")}
          className={clsx(
            "px-4 py-2 rounded",
            selectedType === "Tables" ? "bg-blue-500 text-white" : "bg-gray-200"
          )}
        >
          Tabelas
        </button>
        <button
          onClick={() => setSelectedType("Forms")}
          className={clsx(
            "px-4 py-2 rounded",
            selectedType === "Forms" ? "bg-blue-500 text-white" : "bg-gray-200"
          )}
        >
          Formulário
        </button>
      </div>
      {/* END Toggle Buttons */}

      {/* Render Data Based on Selected Type */}
      <div className="overflow-x-auto">
        {selectedType === "ExtractedText" && (
          <div className="border rounded p-4 bg-gray-100">
            {data.textract?.extractedText && data.textract?.extractedText.trim() ? (
              <pre className="whitespace-pre-wrap">
                {data.textract?.extractedText}
              </pre>
            ) : (
              <p className="text-gray-500">Não há textos.</p>
            )}
          </div>
        )}

        {selectedType === "Tables" && (
          <div>
            {data.textract.tables && data.textract.tables.length > 0 ? (
              data.textract.tables.map((table, tableIndex) => (
                <div
                  key={tableIndex}
                  className="mb-4 border rounded p-4 bg-gray-100"
                >
                  <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        {table.Rows?.map((header, index) => (
                          <th
                            key={index}
                            className="border border-gray-300 px-4 py-2 text-left"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border border-gray-300 px-4 py-2"
                            >
                              {cell}
                            </td>
                          ))}
                          <td className="border border-gray-300 px-4 py-2">
                            <button
                              onClick={() => handleSelect(row)}
                              className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                            >
                              Selecione
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Não há tabelas.</p>
            )}
          </div>
        )}

        {selectedType === "Forms" && (
          <div>
            {data.textract.forms && data.textract.forms.length > 0 ? (
              data.textract.forms.map((form, formIndex) => (
                <div
                  key={formIndex}
                  className="flex justify-between items-center border p-4 bg-gray-100 mb-2 rounded"
                >
                  <div>
                    <p className="font-semibold">{form.name}</p>
                    <p>{form.value}</p>
                  </div>
                  <button
                    onClick={() => handleSelect(form)}
                    className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Selecione
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Não há formulários.</p>
            )}
          </div>
        )}
      </div>
      {/* END Render Data Based on Selected Type */}

      {/* Display Selected Item */}
      {selectedItem && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">JSON:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(selectedItem, null, 2)}
          </pre>
        </div>
      )}
      {/* END Display Selected Item */}
    </div>
  );
}
