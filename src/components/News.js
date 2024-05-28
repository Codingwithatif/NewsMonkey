import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=d64ee23156234aba8dbe321d45356cb2&page=1pageSize=20";
    let data = await fetch(url);

    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handlePrevClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d64ee23156234aba8dbe321d45356cb2&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);

    let parsedData = await data.json();
    // console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    console.log("next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d64ee23156234aba8dbe321d45356cb2&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);

      let parsedData = await data.json();
      // console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center my-4">NewsMonkey - Top headlines</h1>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
