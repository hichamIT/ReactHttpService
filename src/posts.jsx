import React, { Component } from "react";
import http from "./services/http-service";
import config from "./services/config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Post extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.EndPoint);
    this.setState({ posts });
  }

  handelAdd = async () => {
    const obj = { title: "new post", body: "this post from axios " };
    const { data: post } = await http.post(config.EndPoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handeleUpdate = async post => {
    post.title = "Updated";
    await http.put(config.EndPoint + "/" + post.id, post);
    //await http.patch(config.EndPoint + "/" + post.id, { title: post.title });

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handeleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete("s" + config.EndPoint + "/" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("Post has already been deleted");

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handelAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handeleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handeleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Post;
