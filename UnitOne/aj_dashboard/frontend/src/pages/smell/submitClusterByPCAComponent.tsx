import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const SubmitClusterByPCAComponent: React.FC<any> = () => {
  const [smileValue, setSmileValue] = useState(""); // State to store the SMILE value
  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message
  const [successMessage, setSuccessMessage] = useState(""); // State to store the success message
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //Chek if the input is empty
    if (smileValue.trim() === "") {
      setErrorMessage("This field is required");
      return;
    } else {
      setErrorMessage("");
    }
    // Create a FormData object to hold the form fields
    const formData = new FormData();
    formData.append("text", smileValue);
    // Send the data to the server
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/smell/submit/" ||
          "http://127.0.0.1:8000/api/smell/submit/",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        //Checks if the formula is valid
        if (data.message.startsWith("Error in")) {
          setSuccessMessage("");
          setErrorMessage("Not valid input"); // Display the error message
        } else {
          setErrorMessage("");
          setSuccessMessage(data.message); // Display the success message
          navigate("/submit", { state: data });
          setSmileValue("");
        }
      } else {
        // Handle the case where the response is not okay (e.g., HTTP status is not in the 200 range)
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      // Handle any network or fetch-related errors
      console.error("Error submitting data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSmileValue(e.target.value); // Update the SMILE value in the state
    setErrorMessage(""); // Clear the error message when the user starts typing
    setSuccessMessage(""); // Clear the success message when the user starts typing
  };

  return (
    <div>
      {/* Container to style input and button */}
      <Box display="flex" alignItems="center">
        <div style={{ height: "40px" }}>
          <TextField
            placeholder="Enter SMILE"
            type="text"
            name="text"
            value={smileValue}
            onChange={handleInputChange}
            InputProps={{
              style: { fontSize: "15px", height: "40px" }, // Adjust font size and height
            }}
            error={!!errorMessage}
            helperText={errorMessage || successMessage}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            fontSize: "14px",
            backgroundColor: "#ff5733",
            marginLeft: "10px",
          }}
          onClick={handleSubmit}
        >
          Add smile
        </Button>
      </Box>
    </div>
  );
};

export default SubmitClusterByPCAComponent;
