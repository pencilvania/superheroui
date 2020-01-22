import React, {Component} from 'react'
import '../public/css/flexboxgrid.css'
import '../public/css/normalize.css'
import '../public/scss/style.scss';
import {TabView,TabPanel} from 'primereact/tabview';
import Ability from './Ability';
import Heros from './Heros';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import strings from '../config/string';
import Logout from '../components/Share/Logout'
import Auth from '../config/Auth'

class About extends React.Component{

    handleChange = e => {
        //console.log(e.target.name)
        this.setState({
            [e.target.name]:e.target.value
        })

    }
	
	componentDidMount(){
		
		Auth.RemoveSession();
	}

    render(){

        return(
            <div className="HomeHolder">
                <Logout />
                <TabView>
                    <TabPanel header={strings['Heros']}>
                        <Heros />
                    </TabPanel>
                    <TabPanel header={strings['Ability']}>
                        <Ability />
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}

export default About;