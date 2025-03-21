
<div style="text-align: center;">
<img loading="lazy" width="150" src="./public/images/codefy.png" />
</div>


# Projeto de frontend ReactJS com Typescript

## Configuração de ambiente
Para executar localmente a aplicação, primeiramente certifique-se de possuir as ferramentas necessárias
- As ferramentas necessárias para execução da aplicação são Git e Node
- Instalar o Git [Clique aqui](https://git-scm.com/downloads)
- Instalar o Node [Clique aqui](https://nodejs.org/pt/download)



## Instalação

Primeiramente, após ter o git instalado, realize o clone do repositório

```
  git clone https://github.com/brunoportess/reactjs-rick-morty-api
```


Em seguida, acesse o diretório clonado
```bash
  cd reactjs-rick-morty-api
``` 

Após acessar o diretorio execute o comando para instalação dos pacotes node_modules
```bash
  npm install
  ```  

Por fim, para executar a aplicação utilize o comando para abrir uma instância local da aplicação
```bash
  npm run dev
  ```

## Acessando a aplicação
Agora você pode acessar a aplicação pelo navegador, por padrão, caso a porta esteja disponível, a aplicação pode ser acessada pela URL abaixo
  ```bash
  http://localhost:5173/
  ```


## Hospedando aplicação
Para hospedar uma versão build da aplicação, primeiramente execute o comando para gerar uma versão de produção
```bash
  npm run build
  ```

Os arquivos que devem ser hospedados serão gerados dentro da pasta "dist".
Junto aos arquivos, recomendo também colocar o arquivo .htaccess para garantir o bom funcionamento em produção da aplicação

__Arquivo .htaccess está na raiz da aplicação__


## Testes unitários
Para executar os testes unitários, deverá executar o comando abaixo na raiz da aplicação
```bash
  npm run test
  ```

**O teste executará com sucesso com alguns warnings referentes aos componentes visuais de loading que existe na página e o warning informa que só podem ser vistos via browser**

## Observações técnicas

### Diretório src/hook

Possui o arquivo para tradução de termos em inglês vindos da API

### Diretório src/interface
Possui as models/interfaces de tipagem de dados de retorno da API

