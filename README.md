# Bsale-Desafio-2022-Frontend
### Create the html index page
This is the first step. The connection with the browser will be stablished and the css style page will be chosen.
```bash
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <title>Bsale-desafío</title>
  </head>
  <body>
  </body>
</html>
```
### Create the header and script
The header will contain the name of the company, a button for resetting the filters and a search input. The script will execute the javascript code.
```bash
  <body>
    <main class="section">
        <section class="container">

          <div class="flex space-between container-header">
            <h1 class="heading text-center mb-2 heading--lg blue-header bold">Bsale</h1>
            <button class="js-reset button-style">Reset Page</button>
            <div>
              <label for="search">Press <span class="bold">Enter</span> to run the Search</label>
              <input id="search" type="form" class="js-search" placeholder="Empty shows all products"/>
            </div>
        </div>
            <div id="root"></div>
            <script type="module" src="index.js"></script>

    
      </section>
    </main>
  </body>

```
