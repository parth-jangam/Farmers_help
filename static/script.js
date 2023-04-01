function vit(){
    var p= document.getElementById("textttt").value;
    if(p=="wheat" || p=="गेहू"){
        window.location.href= "../views/wheat.hbs"
        return false;
    }
    else{
        if(p=="gram"|| p=="chana"){
			window.location.href= "../views/whe"
        	return false;
        }
    	else{
            
        	alert("wrong input")
        	return ;
    	}
    }

}