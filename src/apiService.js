import axios from "axios";

class ApiService {
  constructor() {
    this.client = axios.create();
    this.baseUrl = "https://socialapp-api.herokuapp.com";
    this.usersUrl = `${this.baseUrl}/users`;
    this.messagesUrl = `${this.baseUrl}/messages`;
    this.likesUrl = `${this.baseUrl}/likes`;
    this.authUrl = `${this.baseUrl}/auth`;
  }

  login = (loginData) => {
    console.log("logging in...", loginData);
    const url = `${this.authUrl}/login`;
    return this.client.post(url, loginData).catch((error) => {
      console.log(error);
    });
  };

  logout = (token) => {
    const url = `${this.authUrl}/logout`;
    return this.client
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createUser = (registrationData) => {
    console.log("creating user...", registrationData);
    const url = this.usersUrl;
    return this.client.post(url, registrationData).catch((error) => {
      console.log(error);
    });
  };

  updateUser = (username, updateData, token) => {
    console.log("updating user...", username);
    const url = `${this.usersUrl}/${username}`;
    return this.client
      .patch(url, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteUser = (username, token) => {
    console.log("deleting user...", username);
    const url = `${this.usersUrl}/${username}`;
    return this.client
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUsers = () => {
    console.log("getting users...");
    const url = this.usersUrl + "?limit=10000";
    return this.client(url).catch((err) => {
      console.log(err);
    });
  };

  getUserByUsername = (username) => {
    console.log("getting user...", username);
    const url = `${this.usersUrl}/${username}`;
    return this.client.get(url).catch((error) => {
      console.log(error);
    });
  };

  getUserPicture = (username) => {
    console.log("getting picture...", username);
    const url = `${this.usersUrl}/${username}/picture`;
    return this.client.get(url).catch((error) => {
      console.log(error);
    });
  };

  getMessages = () => {
    console.log("getting messages...");
    const url = this.messagesUrl + "?limit=10000";
    return this.client.get(url).catch((error) => {
      console.log(error);
    });
  };

  createMessage = (text, token) => {
    console.log("sending message...");
    const url = this.messagesUrl;
    return this.client
      .post(
        url,
        { text: text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  getMessageById = (messageId) => {
    console.log("getting message...");
    const url = `${this.messagesUrl}/${messageId}`;
    return this.client.get(url).catch((error) => {
      console.log(error);
    });
  };

  deleteMessage = (messageId, token) => {
    console.log("deleting message...", messageId);
    const url = `${this.messagesUrl}/${messageId}`;
    return this.client
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  like = (messageObj, token) => {
    console.log("liking...", messageObj, token);
    const url = `${this.likesUrl}`;
    return this.client
      .post(url, messageObj, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteLike = (likeId, token) => {
    console.log("deleting like...", likeId, token);
    const url = `${this.likesUrl}/${likeId}`;
    return this.client
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default ApiService;
