import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country : 'in',
        pageSize : 8,
        category : 'general'
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

    capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props)
    {
        super(props);
        console.log("Hello i am a constructor");
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults :0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsFlow`;
    }

    async updateNews(pageNo)
    {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({articles:parsedData.articles,
            totalResults:parsedData.totalResults,
        loading:false
    })
    this.props.setProgress(100);
    }

    async componentDidMount()
    {
    //     let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ee6e7b8847f44128b27c8ed2d822a9dd&page=1&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({articles:parsedData.articles,
    //         totalResults:parsedData.totalResults,
    //     loading:false
    // })
    this.updateNews();

    }

    fetchMoreData = async() => {
        this.setState({page:this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults
    })
        
      };

    // handlePreviousClick= async ()=>{
    //     // console.log("prev");
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee6e7b8847f44128b27c8ed2d822a9dd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading:true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     page:this.state.page - 1,
    //     //     articles:parsedData.articles,
    //     //     loading:false
    //     // })
    //     this.setState({page : this.state.page -1});
    //     this.updateNews();
    // }

    // handleNextClick= async ()=>{
    //     // console.log("next");
    //     // if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
    //     // {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee6e7b8847f44128b27c8ed2d822a9dd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading:true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     page:this.state.page + 1,
    //     //     articles:parsedData.articles,
    //     //     loading:false
    //     // })}
    //     this.setState({page : this.state.page +1});
    //     this.updateNews();
    // }

  render() {
    return (
      <>
        <h1 className='text-center' style = {{margin : '35px 0px'}}>NewsFlow - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row" >
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key ={element.url}>
                <NewsItem title ={element.title?element.title.slice(0,45):""} description ={element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled = {this.state.page<=1} onClick = {this.handlePreviousClick} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled = {this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} onClick = {this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>*/}
      </> 
    )
  }
}


export default News
