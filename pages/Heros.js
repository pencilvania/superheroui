import React, {Component} from 'react';
import links from '../config/link';
import strings from '../config/string';
import 'primeicons/primeicons.css';
import Link from 'next/link'
import Affiliation from '../components/Affiliation';
import HerosEdite from '../components/HerosEdite';
import AbilityRe from '../components/Ability';
import HerosReview from '../components/ReviewHeros';


class Heros extends React.Component{

    constructor(){
        super();
        this.state = {
            heros:[],
            loadingHero:true,
			visibleAff: false,
			visibleHeros: false,
			visibleAbility: false,
			visibleHerosReview: false,
            CurrentId:'',
            All_Ability:[]

        }
    }
	
    componentDidMount() {
        //get data
        fetch(links['BaseUrl']+links['Heros_All'],{
                method:'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
                },
            })
        .then(res => res.json())
        .then(response => {
            this.setState({ heros: response.data,loadingHero:false })
        })
        .catch((error) => {
            })    


        //get all ability   
        fetch(links['BaseUrl']+links['Ability_All'],{
            method:'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
            },
        })
        .then(res => res.json())
        .then(response => {			
            this.setState({ All_Ability: response})
        })
        
    }


        


//delete
delHero = e => {
    fetch(links['BaseUrl']+'/api/heros/'+e+'/remove',{
        method:'delete',
        body:{ id : e },
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
        },
    })
    .then(res=>res.json())
    .then(response => {
        if(response){
            this.componentDidMount()
        }
    })
}

onHide = (e) =>{
        this.setState({
            visibleAff: false,
            visibleHeros:false,
            visibleAbility:false,
			visibleHerosReview:false,
            CurrentId:''})

    }

SearchHeros = e => {
	e.preventDefault()
	var name = e.target[0].value
	
	fetch(links['BaseUrl']+'/api/heros/search/'+name,{
		method:'get',
		headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
                },
		
	})
	.then(sep=>sep.json())
	.then(respons=>{
		this.setState({ heros: respons,loadingHero:false })
	})
}

    render(){

        return(
            <div className="ListHolder Heros">
			
                <div className="row" style={{border:0}}>
                    <div className="col-lg-1">
                            <Link href="/HerosAdd">
                                <button className="inputSub">{strings['Add']}</button>
                            </Link>
                    </div>
                 </div>
				 <form onSubmit={this.SearchHeros}>
					 <div className="row" style={{border:0}}>
						<div className="col-lg-4">
							<input type="text" className="inputTxt" placeholder={strings['hero_name']}/>
						</div>
						<div className="col-lg-1">
							<button className="inputSub">{strings['Filter']}</button>
						</div>
					 </div>
				</form>
				 
                <div className="row Header">
                    <div className="col-lg-2">{strings['realname']}</div>
                    <div className="col-lg-2">{strings['heroname']}</div>
                    <div className="col-lg-2">{strings['created_at']}</div>
                    <div className="col-lg-1">{strings['Publisher']}</div>
                    <div className="col-lg-1">{strings['Affiliations']}</div>
                    <div className="col-lg-1">{strings['Ability']}</div>
                    <div className="col-lg-1">{strings['Edite']}</div>
					<div className="col-lg-1">{strings['Review']}</div>
                    <div className="col-lg-1">{strings['Delete']}</div>
                </div>
                {!this.state.loadingHero ?(
                    this.state.heros.map((item,index)=>{
                        return(	
                            <div className="row" key={item['id']}>
                                <div className="col-lg-2">{item['realname']}</div>
                                <div className="col-lg-2">{item['heroname']}</div>
                                <div className="col-lg-2">{item['created_at']}</div>
                                <div className="col-lg-1">{item['publisher']}</div>
                                <div className="col-lg-1">
                                            <i className="pi pi-share-alt" onClick={(e) => this.setState({visibleAff: true,CurrentId:item['id']})} ></i>
                                </div>
                                <div className="col-lg-1">
											<i className="pi pi-pencil" onClick={(e) => this.setState({visibleAbility: true,CurrentId:item['id']})} ></i>
								</div>
                                <div className="col-lg-1">
                                            <i className="pi pi-pencil" onClick={(e) => this.setState({visibleHeros: true,CurrentId:item['id']})} ></i>
                                </div>
								<div className="col-lg-1">
											<i className="pi pi-ellipsis-v" onClick={(e) => this.setState({visibleHerosReview: true,CurrentId:item['id']})} ></i>
                                </div>
                                <div className="col-lg-1"><i className="pi pi-times" onClick={() => this.delHero(item['id']) }></i></div>
                            </div>
							
                        )
                    })
                ):
                (<div>Loading</div>)}
				
				<Affiliation visible={this.state.visibleAff} HideFunct={this.onHide} id={this.state.CurrentId} />
				<HerosEdite visible={this.state.visibleHeros} HideFunct={this.onHide} id={this.state.CurrentId} />
				<AbilityRe visible={this.state.visibleAbility} HideFunct={this.onHide} id={this.state.CurrentId} All_Ability={this.state.All_Ability} />
				<HerosReview visible={this.state.visibleHerosReview} HideFunct={this.onHide} id={this.state.CurrentId} />
				
            </div>

        )
    }
}

export default Heros;