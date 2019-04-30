const numberInput = document.getElementsByName('tel'),
	button = document.getElementsByName('submit')

	button.addEventListener('click', send, false);

function send(){
	const number = tel.replace(/\D/g, '');
	const text = "Bienvenue au GSBAC";
	fetch('/submit', {
		method:'post',
		headers:{
			'Content-type':'application/json'
		},
		body: JSON.stringify({number:number, text: text})
	}).then(function(res){
		console.log(res);
	}).catch(function(err){
		console.log(err);
	})
}