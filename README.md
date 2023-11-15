## Información sobre el Desafio 8

Se separo en capas el proyecto, al mismo se le agrego la carpeta service, en el mismo se realizaron las clases que 
se encargan de interactuar con las clases DAO de User, Product, etc.

Ademas esta el archivo .env en el raiz con todas las variables de entorno tanto para la configuracion de MONGO y demas 
funcionalidades.

- **GET**      http://localhost:8080/view/profile

En cuanto al login con GitHub entiendo que la entrega anterior no les funciono al momento de probarlo, por mi lado les cuento que a mi 
me funciona perfectamente, de todas formas si te vuelve a pasar avisame que sigo investigando, si te arroja un error pasamelo en la 
devolucion.

## Resumen de todo lo que se fue agregando

Se incluyo funcionalidad de login y registro de usuarios, los mismos son necesarios para acceder a las secciones de Productos, 
Perfil y Carrito. Para ello se utilizo el paquete "express-session", ademas se agrego el modelo User para persistir la informacion de cada usuario que se registre.

Se agrego la posibilidad de login y registro utilizando passport, utilizando los paquetes "passport", "passport-local" y 
"passport-github2", este ultimo para que se pueda utilizar la autenticacion con GitHub.

En el archivo .env se agregaron las variables de entorno para la configuracion GitHub:

```
GITHUB_KEY=5bf3f144ace191045c9a1fce79b489570a5d71dd
GITHUB_APP_ID=406931
GITHUB_CLIENT_ID=Iv1.c8c7fadb4767d889
GITHUB_CALLBACK=http://localhost:8080/api/auth/callbackGitHub
```

A continuacion se listan las rutas que se fueron agregando.

- **GET**      http://localhost:8080/view/login
- **GET**      http://localhost:8080/view/register
- **GET**      http://localhost:8080/view/logout
- **POST**     http://localhost:8080/api/auth/register
- **POST**     http://localhost:8080/api/auth/login

A continuación, se detallan los endpoints de la API:

- **POST**     http://localhost:8080/api/cart
- **GET**      http://localhost:8080/api/cart/:cid
- **POST**     http://localhost:8080/api/cart/:cid/:pid
- **DELETE**   http://localhost:8080/api/cart/:cid/:pid
- **DELETE**   http://localhost:8080/api/cart/:cid
- **PUT**      http://localhost:8080/api/cart/:cid/:pid

```json
{
	"quantity": 4
}
```

- **PUT**      http://localhost:8080/api/cart/:cid   

```json 
[
	{ "_id": "6513307d03d6bf40717b4a31", "quantity": 7 },
	{ "_id": "6513305003d6bf40717b4a2d", "quantity": 6 },
	{ "_id": "6513306803d6bf40717b4a2f", "quantity": 5 }
]
```

### Endpoint para administrar los productos:

- **POST**     http://localhost:8080/api/products
- **GET**      http://localhost:8080/api/products
- **GET**      http://localhost:8080/api/products/:id
- **PUT**      http://localhost:8080/api/products/:id
- **DELETE**   http://localhost:8080/api/products/:id

Para los casos de POST y PUT, se necesita pasar los datos en formato JSON en el body de la solicitud. A continuación, se muestra una estructura de ejemplo:

```json
{
  "title": "Test",
  "description": "Test",
  "price": 100,
  "code": "ABC001",
  "stock": 1,
  "status": true,
  "thumbnail": "url imagen"
}
```

### URL de las diferentes vistas

- **GET**      http://localhost:8080/view/products
- **GET**      http://localhost:8080/view/products/:pid
- **GET**      http://localhost:8080/view/cart/:cid
- **GET**      http://localhost:8080/view/realtimeproducts
- **GET**      http://localhost:8080/view/chat

### Algunas aclaraciones

En la vista de products deje la posibilidad de agregar al carrito los productos, al darle agregar al carrito va a solicitar 
el CID correspondiente al carrito, luego con la url cart/:cid se pueden ver los productos agregados, ademas deje la posibilidad 
de paginar.