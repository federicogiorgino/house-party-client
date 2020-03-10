import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

class Cloudinary {
  constructor() {
    this.auth = axios.create({
      baseURL: apiURL,
      withCredentials: true
    });
  }

  imageUpload(imageFile) {
    return this.auth.post("/cloudinary", imageFile).then(imageUrl => imageUrl.data);
  }
}

const cloudinaryService = new Cloudinary();
export default cloudinaryService;
