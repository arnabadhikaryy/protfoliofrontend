
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import NoPage from "./component/NoPage";
import UploadService from "./component/Add_service";
import ProjectUploadForm from "./component/Project_upload";
import EducationUploadForm from "./component/education_upload";
import Create_token from "./component/create_token";
import AddSkill from "./component/add_skill";

function Master(){


    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/upload/servide" element={<UploadService />} />
          <Route path="/upload/project" element={<ProjectUploadForm />} />
          <Route path="/upload/education" element={<EducationUploadForm />} />
          <Route path="/create/token" element={<Create_token/>}/>
          <Route path="/add/skill" element={<AddSkill />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    )
}

export default Master;