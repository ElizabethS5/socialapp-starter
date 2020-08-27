import axios from "axios";

class ApiService {
  constructor() {
    this.client = axios.create();
    this.baseUrl = "https://socialapp-api.herokuapp.com";
    this.usersUrl = `${this.baseUrl}/users`;
    this.messagesUrl = `${this.baseUrl}/messages`;
    this.likesUrl = `${this.baseUrl}/likes`;
  }

  createUser(registrationData) {
    console.log("creating user...", registrationData);
    const url = this.usersUrl;
    return this.client
      .post(url, JSON.stringify(registrationData))
      .catch((error) => {
        console.log(error);
      });
  }

  getUsers() {
    console.log("getting users...");
    const url = this.usersUrl + "?limit=10000";
    return this.client(url).catch((err) => {
      console.log(err);
    });
    // return fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // })
    //   .then((res) => res.json)
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  getUserByUsername(username) {
    console.log("getting user...", username);
    const url = `${this.usersUrl}/${username}`;
    return this.client.get(url).catch((error) => {
      console.log(error);
    });
  }

  getUserPicture(username) {
    console.log("getting picture...", username);
    const url = `${this.usersUrl}/${username}/picture`;
    return this.client.get(url).catch((error) => {
      console.log(error);
    });
  }

  getMessages() {
    console.log("getting messages...");
    const url = this.messagesUrl + "?limit=10000";
    return this.client.get(url).catch((error) => {
      console.log(error);
    });
  }

  getMessageById(messageId) {
    console.log("getting message...");
    const url = `${this.messagesUrl}/${messageId}`;
    return this.client.get(url).catch((error) => {
      console.log(error);
    });
  }
}

export default ApiService;
