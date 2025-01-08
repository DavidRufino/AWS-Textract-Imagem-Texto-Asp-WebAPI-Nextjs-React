const ExtractTextFromFile = async (formData) => {
  try {
    const ApiURL = process.env.API_URL;
    const ApiTextractEndpoint = process.env.API_TEXTRACT_ENDPOINT;

    const response = await fetch(`${ApiURL}${ApiTextractEndpoint}`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log("[ExtractTextFromFile] Extracted Text:", result);
      return result;
    } else {
      console.error(
        "[ExtractTextFromFile] Failed to process the file or URL",
        await response.json()
      );
      return [];
    }
  } catch (error) {
    console.error("[ExtractTextFromFile] Error:", error);
    return [];
  }
};

export default { ExtractTextFromFile };
