import axios from "axios";

const UserService = {
    
    register(data) {
        return axios.post("http://192.168.1.82:5000/api/user/createuser", data);
    },

    login(data) {
        return axios.post("http://192.168.1.82:5000/api/user/authuser", data);
    },

    getNews() {
        return axios.get("http://192.168.1.82:5000/api/news/getnews");
    },
    getCategoryNews(data) {
        return axios.post("http://192.168.1.82:5000/api/news/getcategorynews", data);
    },

    addFavourite(data) {
        return axios.post("http://192.168.1.82:5000/api/user/addfavouritenews", data);
    },

    removeFavourite(data) {
        return axios.post("http://192.168.1.82:5000/api/user/removefavouritenews", data);
    },

    getUser(data) {
        return axios.post("http://192.168.1.82:5000/api/user/getuser", data);
    },
}

export default UserService;