import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps={
    country : 'in',
    pageSize : 6,
    category : 'general'
  }

  static propTypes={
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    constructor(props){
        super(props);

        this.state = {
            articles : [],
            loading:false,
            page: 1
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    async updateNews() {
      this.props.setProgress(10);
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe44a453b1e84678842ccaa7a0c0276d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedata = await data.json();
        this.props.setProgress(60);
        this.setState({
          articles:parsedata.articles, 
          totalResults : parsedata.totalResults,
          loading: false

        })
        this.props.setProgress(100);
    }

    //async function or class will wait for fetchting the data from url
    async componentDidMount(){
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe44a453b1e84678842ccaa7a0c0276d&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedata = await data.json();
        // this.setState({
        //   articles:parsedata.articles, 
        //   totalResults : parsedata.totalResults,
        //   loading: false

        // })
        this.updateNews();
    }


    handleprevclick = async() =>{
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe44a453b1e84678842ccaa7a0c0276d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true})
      // let data = await fetch(url);
      // let parsedata = await data.json();
      // this.setState({
      //   page : this.state.page - 1,
      //   articles: parsedata.articles,
      //   loading: false
      // })

      this.setState({page: this.state.page - 1});
      this.updateNews();
    }

    handlenextclick = async() =>{

      // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
      //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe44a453b1e84678842ccaa7a0c0276d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      //     this.setState({loading:true})
      //     let data = await fetch(url);
      //     let parsedata = await data.json();
      //     this.setState({
      //       page : this.state.page + 1,
      //       articles: parsedata.articles,
      //       loading: false
      //     })
      // }
      this.setState({page: this.state.page + 1});
      this.updateNews();
    }


  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{fontSize: '33px', marginTop : '80px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}    
           
            
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button"  className="btn btn-dark" onClick={this.handleprevclick} style={{backgroundColor:'#90ff88', fontWeight:'700', color:'black', boxShadow: '0px 1px 16px 0px #2412b7', border: '2px solid white'}}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextclick} style={{backgroundColor:'#90ff88', fontWeight:'700', color:'black', boxShadow: '0px 1px 16px 0px #2412b7', border: '2px solid white'}}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News

