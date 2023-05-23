# Shortly: API de Encurtamento de Links

<h2>Sobre:</h2>

<div text-align="center" align="left">
<p>Esse repositório trata-se do código de uma API, cuja finalidade é servir, através de queries num um banco de dados SQL, rotas que encaminhem para criar usuários da aplicação, encurtar novos links do usuário logado, redirecionar para o link correto através do link encurtado criado, obter todos os links que já foram encurtados pelo usuário, obter um ranking de cliques em links, e, também, poder deletar URLs encurtadas. </p>
</div>

<div align="left">
<h2>Rotas:</h2>

<ul align="left">
 <li align="left"><strong>POST</strong> "/signup": Cria um novo usuário</li>
 <li align="left"><strong>POST</strong> "/signin": Login de um usuário</li>
 <li align="left"><strong>POST</strong> "/urls/shorten": Encurta uma nova URL (autenticada)</li>
 <li align="left"><strong>GET</strong> "/urls/:id": Obtém as informações daquela URL encurtada</li>
 <li align="left"><strong>GET</strong> "/urls/open/:shortUrl": Redireciona da URL encurtada para a URL original</li>
 <li align="left"><strong>GET</strong> "/users/me": Obtém todas as URLs encurtadas do usuário e as informações dele (autenticada)</li>
 <li align="left"><strong>GET</strong> "/ranking": Obtém um ranking ordenado em ordem decrescente de visitas para as URLs de todos os usuários cadastrados na aplicação.</li>
 <li align="left"><strong>DELETE</strong> "/urls/:id": Exclui uma URL encurtada do usuário (autenticada) </li>
</ul>

</div>

<div align="left">
<h2>Link para Demo:</h2>
Clique aqui para acessar => <a href="https://uptight-lingerie-ox.cyclic.app" >Shortly API</a>
</div>

<div align="left">
<h2>Como foi feito:</h2>
<p>Foi desenvolvida como projeto de formação web full-stack, com o objetivo de praticar os recentes aprendizados em modelagem de banco de dados SQL, Queries SQL (Join, Group By, etc.), Repository Pattern e validação de Schemas. </p>
<h4>Stack de Tecnologias Utilizadas:</h4>
  <img alt="nodejs" align="center" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="express" align="center" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
  <img alt="postgresql" align="center" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
</div>

## Como executar no Seu Computador
1. Instale as dependências:
```bash
npm i
```
2. Crie um arquivo ".env" e preencha com a URL do banco de dados e, opcionalmente, com a porta em que será servida a aplicação no seu computador
3. Popule o banco de dados PostgreSQL com as informações do arquivo "dump.sql"
4. Execute-o:
```bash
npm run dev
```
5. Ou, opcionalmente, você pode buildá-lo:
```bash
npm run build
```
4. E, então, acesse-o através de http://localhost:4000
