"use server";

import textract from "@service/textract";

export const getTextFromFile = async (formData) => {
  console.log("Server [getTextFromFile] Start");

  // Fetch the initial batch of items on the server-side
  const response = await textract.ExtractTextFromFile(formData);
  console.log("Server [getTextFromFile] response", response);

  return response;
};
