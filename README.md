# Atho Tech - Front End

# Como iniciar o aplicativo?

Para utilizar e instalar esse aplicativo é pré-requisito possuir o `docker` e o `docker-compose`, que pode ser obtido aqui: [Docker Download](https://docs.docker.com/desktop/windows/install/) e [Docker Compose Download](https://docs.docker.com/compose/install/). Abaixo estarão os passos necessários para a execução da página web localmente.

## Adicionando as variáveis de ambiente
Para definir a URL das APIs é necessário criar um arquivo com o nome `.env` na raiz do repositório. Os arquivos do repositório serão como na imagem abaixo:

![Listagem dos arquivos](https://i.imgur.com/GfWO3E6.png)
Obs: Lembre-se que os arquivos não necessariamente são exatamente esse, esta imagem somente ressalta a criação do arquivo `.env`.

Dentro arquivo `.env` deverá conter a(s) seguinte(s) variável(is), abaixo de cada variável estará listada os possíveis valores e em quais casos os valores são utilizados.

+ VITE_APP_BASE_API_URL
    + Ambiente de produção - `https://atho-tech-api.up.railway.app/`
    + Ambiente de desenvolvimento - `https://localhost:3001/`

+ PORT
    + Essa variável indicar em qual porta o container será aberto.
    + Qualquer valor numérico pode ser utilizado, geramente a porta do react, usando o vite, é `5173`.

O arquivo `.env` ficará:

![Monstrando .env](https://i.imgur.com/sCHnLwZ.png)

Um arquivo com as variáveis de ambiente já configuradas pode ser encontrado na raiz do projeto, para  utilizá-lo basta executar o comando:
`cp env_example .env`

## Instalar a imagem docker
Para certificar que o Docker está instalado corretamente em seu computador execute o comando `docker run hello-world` no seu terminal/cmd. O resutado esperado é:

![Sucesso no Docker](https://i.imgur.com/rTUcUm4.png)

Garanta que o Docker compose também está instalado corretamente, para isto execute o comando `docker-compose --version`, o resultado esperado é:

![Docker-compose instalado](https://i.imgur.com/Mwu0qKD.png)

Caso tenha ocorrido tudo certo, acesse a pasta do projeto utilizando o terminal/cmd e execute o comando `docker-compose up --build`. O resultado esperado é:

![Imagem docker](https://i.imgur.com/523BHPW.png)

Para sair deste container você pode pressionar Ctrl+C (ou command+C ser for MAC), pressione mais de uma vez, se necessário.

### Iniciando a imagem pela 2ª vez
Para executar o ambiente depois de fazer as configurações necessárias basta:
+ Entrar na pasta do projeto pelo terminal
+ Executar o comando `docker-compose up`, o mesmo resultado da primeira execução irá ocorrer.
