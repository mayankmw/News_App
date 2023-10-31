//By Mayank Wadhwa

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes, { element } from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
    heading: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    heading: PropTypes.string,
  }

  capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
    constructor(props){
        super(props);
        console.log("Constructor hu bhai news component ka")
        this.state={
            articles: [],
            loading:false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async componentDidMount(){
        console.log("cdm")
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f021ec8f29f2466faadc9b4f7ad9cf8f&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data =await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false})
    }

    handlePrevClick = async() => {
      console.log("prev")

      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f021ec8f29f2466faadc9b4f7ad9cf8f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data =await fetch(url);
      let pasedData = await data.json()
      console.log(pasedData)

      this.setState({
        loading:false,
        page: this.state.page - 1,
        articles: pasedData.articles
      })
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    } 

    handleNextClick = async() => {
      console.log("next")

      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/6))){
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f021ec8f29f2466faadc9b4f7ad9cf8f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data =await fetch(url);
      let pasedData = await data.json()
      console.log(pasedData)

      this.setState({
        loading:false,
        page: this.state.page + 1,
        articles: pasedData.articles
      })
    }
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    

  render() {
    console.log("render")
    return (
      <div className='container my-3'>
        <div ClassName="d-flex">
          <div ClassName="p-2 flex-grow-1"><h2>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2></div>
        </div>

        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
           return <div className="col md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,90):""} newsurl={element.url} imageurl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
                     
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/6)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
        
      </div>
    )
  }
}

export default News
