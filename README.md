# zssn-frontend
Teste de codificação de desenvolvedor (Rede Social de Sobrevivência Zumbi) 2022.<br>
https://zssn-front.herokuapp.com/survivor/

## :clipboard: Descrição do Problema
ZSSN (Rede Social de Sobrevivência Zumbi). O mundo como o conheceu caiu em um cenário apocalíptico. Um vírus produzido em laboratório está transformando seres humanos e animais em zumbis, famintos por carne fresca.
Você, como membro da resistência aos zumbis (e o último sobrevivente que sabe codificar), foi designado para desenvolver um sistema para compartilhar recursos entre humanos não infectados.

## :hammer: Tecnologias utilizadas
* Python 3;
* Django 4.1;
* Bootstrap v5.0

## Começando

### Pré-requisitos
* Python3
* PIP3
* Virtualenv

1. Clonando o projeto para a sua máquina:
    ```bash
    git clone https://github.com/JelsonMatheus/zssn-frontend.git
    ```

2. Renomear o arquivo que contem as variáveis de ambiente `.env.example` para `.env`.

### Executando o projeto

1. Criar uma **virtualenv** na raiz do projeto:
    ```bash
    python3 -m venv venv
    ```

2. Ativar o ambiente virtual:\
   Linux: `source venv/bin/active`.\
   Windows: `venv\scripts\activate`.

3. Instalar dependências:

    ```bash
    pip3 install -r .requirements.txt
    ```

4. Realizar o migrate no banco de dados:

    ```bash
    python3 manage.py migrate
    ```
5. Iniciar servidor Django:

    ```bash
    python3 manage.py runserver
    ```
    ```bash
    System check identified no issues (0 silenced).
    August 07, 2022 - 23:08:58
    Django version 3.2.5, using settings 'config.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CONTROL-C.
    ```


