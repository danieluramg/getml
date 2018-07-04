# getml.js
**Script para salvar os anuncios do ML**

Parto do ponto que o usuário tenha um conhecimento um pouco além do básico 

**PREPARAR O TERRENO:**
- Crie um Aplicativo para o Mercadolivre para ter um Access Token: https://developers.mercadolivre.com.br/apps/connect
Por via das dúvidas dê todas as pemissões.

- Acesse https://developers.mercadolibre.com/pt-br/produto-autenticacao-autorizacao/#token e cole o ID do seu aplicativo para obter seu Access_Token
Este Access_Token tem uma validade de 6 horas, portanto não se esqueça de renová-lo caso vá usar o app novamente depois deste tempo

- Cole o access_token na segunda linha do script dentro das aspas, ex:

var access_token = "APP_USR-548205555582087-055515-df9b5666666666682b863bb8d3044d44-135555559";

- Cole seu ID do MercadoLivre na primeira linha do script dentro das aspas, ex:

var my_id = "130000019";
  - (Para descobrir sua ID acesse https://api.mercadolibre.com/users/me?access_token=SEU_ACCESS_TOKEN - TROQUE SEU_ACCESS_TOKEN pelo access_token gerado acima, sua ID vai estar na primeira linha)

**USO:**

Cole todo o código do script no Console do Google Chrome (F12 para abrir) ou no jsconsole.com

O navegador vai pedir permissão para salvar vários arquivos, para cada anuncio será criado um arquivo HTML com os dados.

A URL das imagens estão no código fonte de cada HTML mas não ficam visiveis se você abrir o arquivo no navegador, edite o código com um editor de texto que verá as URLs das imagens nas primeiras linhas do arquivo.

Quando quiser salvar seus anuncios novamente não se esqueça de gerar um novo access_token e atualizar no código (se já tiver passado 6 horas).
___
O formato do arquivo fiz desta forma pois depois importo eles em meu servidor que baixa todas as imagens e trata os dados para inserir em minha loja virtual, o script é de fácil entendimento então caso queira modificar a criação do arquivo conforme sua necessidade basta alterar a linha "let blob".
___
Caso queira fazer alguma contribuição basta enviar um Pull Request

