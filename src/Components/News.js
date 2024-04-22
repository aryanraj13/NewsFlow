import React,{useEffect,useLayoutEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) =>{
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,settotalResults]= useState(0)


    const capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews=async()=>
    {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setLoading(false)
    props.setProgress(100);
    }

    useEffect(()=>{
      document.title = `${capitalizeFirstLetter(props.category)} - NewsFlow`;
      updateNews();
    },[])

    const fetchMoreData = async() => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        
      };

    // handlePreviousClick= async ()=>{
    //     // console.log("prev");
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ee6e7b8847f44128b27c8ed2d822a9dd&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
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
    //     // if(!(this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)))
    //     // {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ee6e7b8847f44128b27c8ed2d822a9dd&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
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

 
    return (
      <>
        <h1 className='text-center' style = {{margin : '35px 0px',marginTop:'90px'}}>NewsFlow - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row" >
        {articles.map((element)=>{
            return <div className="col-md-4" key ={element.url}>
                <NewsItem title ={element.title?element.title.slice(0,45):""} description ={element.description?element.description.slice(0,88):""} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled = {this.state.page<=1} onClick = {this.handlePreviousClick} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled = {this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)} onClick = {this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>*/}
      </> 
    )
  
}

News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}


export default News
