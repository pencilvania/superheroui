const Error = {

    RequireTextBox(Name){
        document.getElementsByName(Name)[0].style.boxShadow = '0 0 5px red'       
    }
    ,
    DeleteRequireTextBox(Name){
        document.getElementsByName(Name)[0].style.boxShadow = 'none'       
    }
	
	
}

export default Error