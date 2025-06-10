# Meu Diário Multimídia 📝📸🎤

Bem-vindo ao "Meu Diário Multimídia"! Esta é uma aplicação simples, desenvolvida com fins didáticos, para demonstrar como utilizar recursos nativos de hardware, como a câmera e o microfone, em um projeto React Native com Expo.

## 📖 Sobre o Projeto

O objetivo deste aplicativo é permitir que o usuário crie pequenas entradas de diário combinando uma foto e uma nota de voz. É um excelente ponto de partida para aprender sobre:
* Gerenciamento de permissões de hardware (câmera e áudio).
* Utilização de APIs nativas através do Expo (Expo Camera e Expo AV).
* Manipulação de estado e ciclo de vida de componentes com os Hooks do React (`useState`, `useEffect`, `useRef`).

## ✨ Funcionalidades

* **Fotografia**: Tire uma foto usando a câmera do dispositivo.
* **Visualização**: Veja a foto tirada diretamente na tela do app.
* **Gravação de Áudio**: Grave uma nota de voz usando o microfone.
* **Reprodução de Áudio**: Ouça a nota de voz gravada.
* **Interface Simples**: Uma única tela com controles claros e feedback visual para o usuário.

## 🛠️ Tecnologias Utilizadas

* **[React Native](https://reactnative.dev/)**: Framework para desenvolvimento de aplicações móveis multiplataforma.
* **[Expo](https://expo.dev/)**: Plataforma e conjunto de ferramentas para facilitar o desenvolvimento com React Native.
* **[Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)**: Módulo do Expo para acessar a câmera do dispositivo.
* **[Expo AV](https://docs.expo.dev/versions/latest/sdk/av/)**: Módulo do Expo para manipulação de áudio e vídeo.
* **JavaScript (ES6+)**: Linguagem base para o desenvolvimento.

## 🚀 Como Executar o Projeto

Para rodar este projeto em seu ambiente local, siga os passos abaixo.

### Pré-requisitos

* **Node.js**: Certifique-se de ter o Node.js (versão LTS recomendada) instalado.
* **Expo Go**: Instale o aplicativo **Expo Go** em seu smartphone (iOS ou Android) para testar o projeto.

### Passos de Instalação

1.  **Clone o Repositório** (ou baixe os arquivos do projeto):
    ```bash
    git clone [https://caminho-para-seu-repositorio.git](https://caminho-para-seu-repositorio.git)
    cd nome-do-projeto
    ```

2.  **Instale as Dependências**:
    Dentro da pasta do projeto, execute o comando abaixo para instalar todas as bibliotecas necessárias.
    ```bash
    npm install
    ```
    *ou, se você usa Yarn:*
    ```bash
    yarn install
    ```

3.  **Inicie o Servidor de Desenvolvimento**:
    Após a instalação das dependências, inicie o servidor do Expo.
    ```bash
    npx expo start
    ```

4.  **Teste no seu Dispositivo**:
    O comando acima irá abrir uma página no seu navegador com um QR Code. Abra o aplicativo **Expo Go** no seu celular e escaneie este QR Code para carregar o projeto.

## 📂 Estrutura do Código

Todo o código da aplicação está contido no arquivo `App.js` e está estruturado de forma didática para facilitar a compreensão:

* **Estados (`useState`)**: No topo do componente, declaramos todas as variáveis de estado que guardam informações dinâmicas, como as URIs da imagem e do áudio, o status da gravação e as permissões.
* **Efeitos (`useEffect`)**: Usamos `useEffect` para solicitar as permissões de câmera e áudio assim que o aplicativo é carregado e para limpar recursos (como o objeto de som) da memória.
* **Funções**: O código é organizado em funções claras e com nomes autoexplicativos (`iniciarGravacao`, `tirarFoto`, etc.), facilitando a leitura e manutenção.
* **Renderização (JSX)**: A parte final do arquivo contém o JSX, que descreve a interface do usuário. Ele usa renderização condicional para mostrar a câmera ou a imagem, e para habilitar/desabilitar botões conforme o estado da aplicação.
* **Estilos (`StyleSheet`)**: A estilização dos componentes está centralizada no final do arquivo para uma melhor organização.

---

Feito com ❤️ para fins de aprendizado. Sinta-se à vontade para modificar e experimentar!
