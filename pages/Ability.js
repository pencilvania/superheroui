import React from 'react';
import links from '../config/link';
import strings from '../config/string';
import 'primeicons/primeicons.css';
import error from '../config/Error';

class Ability extends React.Component{

    constructor(){
        super();
        this.state = {
            abilitys:[],
            Newability:'',
			loadingAb:true,

        }
    }

componentDidMount() {
    //get data
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
        this.setState({ abilitys: response,loadingAb:false })
    })
    .catch((error) => {
        console.error(error);
        })            
    }


//show textbox for add ability
AddText(e){
    e.preventDefault()
    
    if(document.getElementById('AddHiden').style.display = 'none') {
        document.getElementById('AddHiden').style.display = 'block'
    }
    
}

//Add New Ability to state
SetAbility = e =>{

    this.setState({Newability:e.target.value})          
    
}


//add
AddAbility = () =>{

    if(this.state.Newability == '')
    {
        
        error.RequireTextBox('NewAbliTXT')
    }
    else{

        fetch(links['BaseUrl']+links['Ability_Add'],{
            method:'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
            },
            body: JSON.stringify(
                {
                    'name': this.state.Newability
                })
        })
        .then(res=>{
            if(res.status == 200){
                //fill out this text box
                document.getElementsByName('NewAbliTXT')[0].value = ' '
                this.setState({Newability:''})
                error.DeleteRequireTextBox('NewAbliTXT')

                this.componentDidMount()               
            }
        })
    }
     
    
}


//delete
delAblity = e => {
    fetch(links['BaseUrl']+'/api/abilities/'+e+'/remove',{
        method:'delete',
        body:{
            id : e
        },
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


//update
handleChange(e,id){

    fetch(links['BaseUrl']+'/api/abilities/'+id,{
        method : 'put',
        body: JSON.stringify({
            id : id,
            name : e.target.value
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
        }
    })
    .then(res => res.json())
    .then(response => {
        
        if(response){
            this.componentDidMount()
        }
    })
}



    render(){

        return(
            <div className="ListHolder Ability">
                <div className="row" style={{border:0}}>
                    <div className="col-lg-3">
                        <form>
                            <button className="inputSub" onClick={this.AddText}>{strings['Add']}</button>
                        </form>
                    </div>
                    <div className="col-lg-7" id="AddHiden">
                        <input type="text"
                            className="inputTxt"
                            name = "NewAbliTXT"
                            placeholder={strings['txt']}
                            onKeyUp = {this.SetAbility}
                            onBlur={this.AddAbility}
                        />
                    </div>
                 </div>
				
				{!this.state.loadingAb ?(
					this.state.abilitys.map((item,index)=>{
						return(
							<div className="row" key={item['id']}>
								<div className="col-lg-7">
									<input type="text"
										className="inputTxt"
										defaultValue={item["name"]}
										onKeyUp = {this.SetAbility}
										onBlur={e => this.handleChange(e,item['id'])}
									/>
								</div>
								<div className="col-lg-1">
									<i className="pi pi-times"
										onClick={ () => this.delAblity(item['id'])}>
									</i>
								</div>
							</div>
						)
					})
					):
					(<div>Loading</div>)}
            </div>
        )
    }
}

export default Ability;