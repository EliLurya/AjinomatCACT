import React, { useEffect } from "react";
import { useHttp } from "../../plugins/axios"; // Importing a custom hook for making HTTP requests
import { getEndpoint } from "../../common/http"; // Importing a function to get an endpoint URL

// Define the props for the DataLoader component
interface DataLoaderProps {
  endpointName: string;
  onDataLoaded: (data: any) => void; // Callback function to handle loaded data
}

const DataLoader: React.FC<DataLoaderProps> = ({
  endpointName,
  onDataLoaded,
}) => {
  const { request } = useHttp();

  // Use the useEffect hook to perform actions when the component mounts
  useEffect(() => {
    const endpoint = getEndpoint(endpointName); // Get the full API endpoint URL based on the endpoint name

    // Make an HTTP request to the specified endpoint
    request(endpoint)
      .then((response) => {
        const data = response.data;
        onDataLoaded(data); // Call the onDataLoaded callback function with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [endpointName]); // The effect runs whenever endpointName changes

  return null; // This component doesn't render any visible content; it's used for data loading.
};

export default DataLoader;
