import React from 'react';
import '../public/css/flexboxgrid.css'
import '../public/css/normalize.css'
import '../public/scss/style.scss';
import links from '../config/link';
import strings from '../config/string';
import Router from 'next/router'
import {Dialog} from 'primereact/dialog';

class ReviewAeros extends React.Component{

    constructor(){
        super();
        this.state = {
            dataReview:'',
			ParentID:'',
			LoaderReview:true
        }


    }

componentWillReceiveProps(nextProps){
    if(nextProps.visible){
        var id = nextProps.id;
        this.setState({
            ParentID:id
        })
        this.HeroReview(id);
    }
		
}


HeroReview(id){
	
	fetch(links['BaseUrl']+'/api/heros/'+id,{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
        }
   })
   .then(res=>res.json())
   .then(response=>{
        this.setState({ dataReview: response[0], LoaderReview:false})
   })
}

    render(){

        return(
            <Dialog header="Heros Review" visible={this.props.visible} style={{width: '60vw'}} modal={true} onHide={this.props.HideFunct}>
				<div className=" ListHolder" style={{width:'70%'}}>
                    <div className="row">
                        <div className="col-lg-2">{strings['realname']}</div>
                        <div className="col-lg-6">{this.state.dataReview.realname}</div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">{strings['heroname']}</div>
                        <div className="col-lg-6">{this.state.dataReview.heroname}</div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">{strings['publisher']}</div>
                        <div className="col-lg-6">{this.state.dataReview.publisher}</div>
                    </div>

                    <div className="row">
                        <div className="col-lg-2">{strings['fadate']}</div>
                        <div className="col-lg-6">{this.state.dataReview.fadate}</div>
                    </div>
					<div className="row">
                        <div className="col-lg-2">{strings['Ability']}</div>
                        <div className="col-lg-6">
							{!this.state.LoaderReview ?(
								this.state.dataReview.heros_abilities.map((item,index)=>{
								return(<span key={item['id']}>{item['ability_name']} ==> {item['ability_value']} ,</span>)
							})
							):
							(<div>Load</div>)
							}
						</div>
                    </div>
					<div className="row">
                        <div className="col-lg-2">{strings['Affiliations']}</div>
                        <div className="col-lg-6">
							{!this.state.LoaderReview ?(
								this.state.dataReview.affiliations.map((item,index)=>{
								return(<span key={item['id']}>{item['name']} ,</span>)
							})
							):
							(<div>Load</div>)
							}
						</div>
                    </div>
				</div>
            </Dialog>
        )
    }
}

export default ReviewAeros;