import React, { Component } from "react";
import axios from "axios";

const EndPoint = "https://jsonplaceholder.typicode.com/posts";
class Post extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(EndPoint);
    this.setState({ posts });
  }

  handelAdd = async () => {
    const obj = { title: "new post", body: "this post from axios " };
    const { data: post } = await axios.post(EndPoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handeleUpdate = async post => {
    post.title = "Updated";
    await axios.put(EndPoint + "/" + post.id, post);
    //await axios.patch(EndPoint + "/" + post.id, { title: post.title });

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handeleDelete = async post => {
    await axios.delete(EndPoint + "/" + post.id);

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });
  };

  render() {
    return (
      <div className="container">
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
