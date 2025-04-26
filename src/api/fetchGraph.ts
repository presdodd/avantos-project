import axios from "axios";

export const fetchBlueprintGraph = async () => {
  const response = await axios.get(
    "https://api.avantos-dev.io/api/action-blueprint-graph",
    {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
      }
    }
  );
  return response.data;
};  