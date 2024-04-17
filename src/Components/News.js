import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


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
    constructor()
    {
        super();
        console.log("Hello i am a constructor");
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }

    async updateNews(pageNo)
    {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=ee6e7b8847f44128b27c8ed2d822a9dd&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles,
            totalResults:parsedData.totalResults,
        loading:false
    })
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

    handlePreviousClick= async ()=>{
        // console.log("prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee6e7b8847f44128b27c8ed2d822a9dd&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page:this.state.page - 1,
        //     articles:parsedData.articles,
        //     loading:false
        // })
        this.setState({page : this.state.page -1});
        this.updateNews();
    }

    handleNextClick= async ()=>{
        // console.log("next");
        // if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)))
        // {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee6e7b8847f44128b27c8ed2d822a9dd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page:this.state.page + 1,
        //     articles:parsedData.articles,
        //     loading:false
        // })}
        this.setState({page : this.state.page +1});
        this.updateNews();
    }

  render() {
    return (
      <div className = "container my-3">
        <h1 className='text-center' style = {{margin : '35px 0px'}}>NewsFlow - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row" >
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key ={element.url}>
                <NewsItem title ={element.title?element.title.slice(0,45):""} description ={element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
            </div>
        })}
        <div className="container d-flex justify-content-between">
        <button type="button" disabled = {this.state.page<=1} onClick = {this.handlePreviousClick} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled = {this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} onClick = {this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
        </div>
      </div>
    )
  }
}


export default News
