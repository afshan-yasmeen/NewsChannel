import React, { Component } from "react";
import NewsItem from "./newsitem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 20,
    category: "general",
    totalResults:0,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title =
      "NewsChannel - " +
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1);
  }

  async UpdateNews() {
    this.props.setProgress(20);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.props.page}&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: this.state.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }


  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }); // Increment the page number
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    
   
    this.setState({ loading: true });
    
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults, // Update totalResults based on the parsed data
      loading: false,
    });
  };
  
 
  async componentDidMount() {
    this.UpdateNews();
  }

  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.UpdateNews();
  };

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.UpdateNews();
  };
  render() {
    return (
      <div className="m-3">
        <h1 className="text-center my-3">
          NewsChannel: Top-Headlines on{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}
        </h1>
        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div >
          <div
            className="row"
            style={{
              alignContent: "center",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            {
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-3 m-2" key={element.url}>
                    <NewsItem
                      title={element.title === null ? " " : element.title}
                      description={
                        element.description === null ? " " : element.description
                      }
                      publishedAt={
                        element.publishedAt === null ? " " : element.publishedAt
                      }
                      author={element.author === null ? " " : element.author}
                      source={
                        element.source.name === null ? " " : element.source.name
                      }
                      imageUrl={
                        element.urlToImage === null
                          ? "fallback.jpg"
                          : element.urlToImage
                      }
                      url={element.url}
                    />
                  </div>
                );
              })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            // disabled={this.state.page >= 5}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
