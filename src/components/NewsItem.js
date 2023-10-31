//By Mayank Wadhwa

import React, { Children, Component } from 'react'

export class NewsItem extends Component {
    
    render() {
        let {title,description,imageurl,newsurl,author,date,source} = this.props; 
        return (
            <div className='my-3'>
                <div className="card rounded-start" style={{width: "18rem"}}><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {source}
    <span className="visually-hidden">unread messages</span>
  </span>
                    <img src={!imageurl?"https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930":imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}... </h5>
                            <p className="card-text">{description}...</p>
                            <h6 className='card-text'>{author}</h6>
                            <h6 className='card-text'>{date}</h6>
                            <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
