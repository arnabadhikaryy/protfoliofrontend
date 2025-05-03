
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import NoPage from "./component/NoPage";
import UploadService from "./component/add_service";
import ProjectUploadForm from "./component/Project_upload";
import EducationUploadForm from "./component/education_upload";

function Master(){


    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/upload/servide" element={<UploadService />} />
          <Route path="/upload/project" element={<ProjectUploadForm />} />
          <Route path="/upload/education" element={<EducationUploadForm />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    )
}

export default Master;