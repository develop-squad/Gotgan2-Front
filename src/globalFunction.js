import axios from "axios";

const axiosPost = (url, param, cSuc, cErr) => {
  axios
    .post(url, param)
    .then((response) => {
      if (cSuc) cSuc(response);
    })
    .catch((error) => {
      if (cErr) cErr(error);
    });
};

export default axiosPost;
