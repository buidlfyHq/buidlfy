import config from "config";

export const uploadImageService = async (data: string | ArrayBuffer) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "data": data
    });  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const response = await fetch(
      config.backendApi.BACKEND_API + "upload",
      requestOptions
    );
    const responseText = await response.text();
    return { error: false, errorMessage: "", responseText };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in transaction --> ", error);
    return {
      error: true,
      errorMessage: (error as Error).message,
      responseText: "",
    };
  }
};

