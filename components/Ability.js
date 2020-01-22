import React from 'react';
import links from '../config/link';
import error from '../config/Error';
import '../public/css/flexboxgrid.css'
import '../public/css/normalize.css'
import '../public/scss/style.scss';
import {Dialog} from 'primereact/dialog';

class Ability extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           data : '',
           loadingAloc:true,
           NewAbiliId:'',
           NewAbiliValue:'',
           ParentID:'',
           All_Ability:[]

        }
    }

//get Id of new ability
selectItem(e){

    this.setState({NewAbiliId:e.target.value})
}

//Add value for ability
SetAbbValu = e =>{

    this.setState({NewAbiliValue:e.target.value})          
    
}

//insert data to DB
AddHeroAbilities(e){
    e.preventDefault()

    if(this.state.NewAbiliValue == '') { error.RequireTextBox('AbilityVal')}

    else{
        fetch(links['BaseUrl']+links['Hero_Ability'],{
            method:'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
            },
            body: JSON.stringify(
                {
                    'hero_id' : this.state.ParentID,
                    'abilitie_id':this.state.NewAbiliId,
                    "ability_value":this.state.NewAbiliValue
                })
                
        }).then(res=>res.json())
        .then(response=>{
            //show list again
            this.HeroAbilities(this.state.ParentID);

            document.getElementsByName('AbilityVal')[0].value = ''
            this.setState({NewAbiliId:'',NewAbiliValue:''})
            error.DeleteRequireTextBox('AbilityVal')
        })
    }
    
}


componentWillReceiveProps(nextProps){
    if(nextProps.visible){
        var id = nextProps.id;
        this.setState({
            ParentID:id,
            All_Ability:nextProps.All_Ability
        })
        this.HeroAbilities(id);
    }
		
}

HeroAbilities(Id){

    fetch(links['BaseUrl']+'/api/heros/'+Id+'/abilities',{
        method:'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
        }
   })
   .then(res=>res.json())
   .then(response=>{
        this.setState({ data: response,loadingAloc:false })
   })

}


delAbilityHero = id =>{
    
    fetch(links['BaseUrl']+'/api/heroabilities/'+id+'/remove',{
        method:'delete',
        body:{ id : id},
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('Token')
        },
    })
    .then(res=>res.json())
    .then(response => {
        if(response){
            this.HeroAbilities(this.state.ParentID);
        }
    })
}
    render(){

        return(
		<Dialog header="Ability" visible={this.props.visible} style={{width: '60vw'}} modal={true} onHide={this.props.HideFunct}>
                <div className=" ListHolder" style={{width:'70%'}}>
                <form>
                <div className="row" style={{border:0}}>
                    <div className="col-lg-5">
                        <select className="Ability-List"  onChange={(e)=>this.selectItem(e)}>
                            {
                                this.state.All_Ability.map((item,index)=>{
                                    return (
                                        <option value={item['id']} key={item['id']}>{item['name']}</option>
                                    )
                                })
                            }
                            </select>
                       
                    </div>
                    <div className="col-lg-4">
                        <input type="number"
                                name="AbilityVal"
                                className="inputTxt"
                                placeholder="Value of Ability"
                                onKeyUp = {this.SetAbbValu}
                                min="0"
                                max="10"
                            />
                    </div>
                    <div className="col-lg-3">
                         <button className="inputSub" onClick={e =>this.AddHeroAbilities(e)}>Add</button>
                    </div>
                </div>
                </form>
                <div className="row">
                    <div className="col-lg-2">Ability</div>
                    <div className="col-lg-2">Value</div>
                    <div className="col-lg-1">Delete</div>
                </div>
                    {!this.state.loadingAloc ?(
                        this.state.data.map((item,index)=>{
                            return(
                                <div className="row" key={item['id']}>
                                    <div className="col-lg-2">{item['ability_name']}</div>
                                    <div className="col-lg-2">{item['ability_value']}</div>
                                    <div className="col-lg-1"><i className="pi pi-times" onClick={() => this.delAbilityHero(item['id']) }></i></div>
                                </div>
                            )
                        })
                    ):
                    (<div>Loading</div>)}
                </div>
		</Dialog>
        )
    }
}

export default Ability;