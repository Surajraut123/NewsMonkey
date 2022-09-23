import React, { Component } from 'react'

export class Newsitem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date} = this.props;

    return (
      <div className='my-3'>
        <div className="card" style={{height: '30rem', boxShadow: '0px 0px 15 px 1px #161111',borderRadius: '22px'}}>
            <img src={!imageUrl?"https://bsmedia.business-standard.com/_media/bs/img/article/2017-02/03/full/1486111340-7568.jpg":imageUrl} className="card-img-top" alt="..." style={{height: '183px'}}/>
            <div className="card-body">
                <h5 className="card-title">{title.slice(0,66)}...<span className="badge text-bg-danger" style={{padding:'2px 6px 2px 6px', fontSize :'9px'}} >New</span></h5>
                <p className="card-text">{description.slice(0,88)}...</p>
                <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                <a rel=" noopener noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark" style={{backgroundColor:'#90ff88', fontWeight:'600', color:'black', boxShadow: '0px 1px 16px 0px #2412b7', border: '2px solid white'}}>Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
