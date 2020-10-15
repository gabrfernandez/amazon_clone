import axios from "axios";

const instance=axios.create({
    baseURL:'http://localhost:5001/clone-9c671/us-central1/api' //THE API URL {cloud function}
});

export default instance;