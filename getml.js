var my_id = "";
var access_token = "";

//carregar requisitos
(function(root){
  root.getScript = function(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
  }
}(window));
getScript('https://www.ideias.pw/userscripts/jquery3.3.1.min.js');
getScript('https://www.ideias.pw/userscripts/FileSaver.min.js');

//função que baixa os anuncios
function baixar(n1, n2) { 
	console.log('Ok! ' + n1 + ' até ' + n2);
	//Requisita a lista com ID dos anuncios, de 100 em 100
	$.getJSON('https://api.mercadolibre.com/users/'+my_id+'/items/search?access_token='+access_token+'&offset='+n1+'&limit=100&status=active', function(retorno){
		//Cria um loop para ler cada anuncio
		for (c=0;c<100;c++){
			let temp = retorno.results[c];
			//se existir a variavel com a ID (pois ela pode ter vindo vazio caso tinha menos de 100 anuncios neste loop)
			if(temp){
				//Baixa os detalhes do produto
				$.getJSON('https://api.mercadolibre.com/items/'+temp, function(retorno){
					let titulo =  retorno.title;
					let preco = retorno.base_price;
					let condicao = retorno.condition;
					let permalink = retorno.permalink;
					let qtd_fotos = retorno.pictures.length;
					let imagem;
					//Cria um "for-else"
					find: {
						//Cria um loop para salvar a URL das imagens
						for (i=0;i<qtd_fotos;i++){
							imagem += '\nimg_url: ' + retorno.pictures[i].url;
						} // else do loop for
							//Baixa a Descrição do produto
							$.getJSON('https://api.mercadolibre.com/items/'+ temp +'/description', function(retorno){
								desc = retorno.plain_text.replace(/\n/g,'\n<br>');
								let body = "<!--\n" + imagem + "\n-->\n<h1>" + titulo + "</h1>\n<p>R$" + preco + "</p>\n<p>" + condicao + "</p>\n<a href=\"" + permalink + "\"\>Link</a>\n<br><br>" + desc;
								let blob = new Blob([body], { type: "text/plain;charset=utf-8" });
								saveAs(blob, titulo + ".html");
								imagem = '';
							});
					}
				});
			}
		}
	});
}

//Requisita o número total de anuncios Ativos
$.getJSON('https://api.mercadolibre.com/users/'+my_id+'/items/search?access_token='+access_token+'&status=active', function(retorno){
	var total = retorno.paging.total;
	var lotesConsultas = Math.trunc((total-1)/100);

	for(i=0;i<=lotesConsultas;i++) {
		if (i<lotesConsultas) {
			console.log('Baixando de ' + i*100 + ' até ' + (((i+1)*100)-1));
			baixar(i*100, (((i+1)*100)-1));
		} else {
			console.log('Baixando de ' + i*100 + ' até ' + (total-1));
			baixar(i*100, (total-1));
		}
	}
});
