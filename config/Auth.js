import Router from 'next/router'

const Auth={
	
	RemoveSession(){
		if(sessionStorage.getItem('Token') === ''){
			Router.push('/')
		}
	}
}

export default Auth;