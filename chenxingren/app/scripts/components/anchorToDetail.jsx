import React from 'react';
import $ from '../components/jquery.js'

const AnchorToDetail = React.createClass({

 bodyScrollTop(toThisScroll){
     console.log(getpos(toThisScroll).top)
     $('html,body').animate({
       scrollTop : getpos(toThisScroll).top
     }, 500);
 },

 toDetail(event){
    let obj=this.refs.hashAnchor;
    console.log(obj)
    this.bodyScrollTop(obj)
 },
 render(){
    console.log(this.props.toDetail)
    return (
        <div>
         <p ref='hashAnchor' style={this.props.sty} onClick={this.toDetail} >{this.props.children}</p>
        
        </div>
    );
   }
});

export default AnchorToDetail;