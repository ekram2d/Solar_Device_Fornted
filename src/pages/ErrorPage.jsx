import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // go back to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
          alt="Error"
          className="w-24 mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-red-600 mb-2">
       
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-600 mb-6">
      
          The page you were looking for could not be loaded. Please try again
          later.
        </p>
        <button
          onClick={handleBack}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          ⬅️ Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
