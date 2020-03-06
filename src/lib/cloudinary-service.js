import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

class Cloudinary {
  constructor() {
    this.auth = axios.create({
      baseURL: baseUrl,
      withCredentials: true
    });
  }

  imageUpload(imageFile) {
    return this.auth.post("/cloudinary", imageFile).then(imageUrl => imageUrl.data);
  }
}

const cloudinaryService = new Cloudinary();

export default cloudinaryService;
