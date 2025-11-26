rate-limit: Es una regla que pone un límite a cuántas veces una persona puede usar tu aplicación en un tiempo. Sirve para evitar que alguien haga demasiadas peticiones y bloquee o dañe el sistema.

CORS:Es una protección del navegador que decide qué páginas sí pueden hablar con tu servidor y cuáles no. Sirve para evitar que sitios desconocidos usen tus datos sin permiso.

JWT: Es un pase digital que un usuario recibe al iniciar sesión. Dentro tiene información básica como su id o correo, y sirve para demostrar quién es cada vez que hace una petición.

EJEMPLOS DE SITUACIONES REALES: rate-limit: En un login, una persona intenta entrar muchas veces seguidas. Con rate-limit podemos decir “Solo puedes intentar unas pocas veces por minuto”

CORS:mi página web quiere pedir datos a mi servidor, pero está en otra dirección y el navegador lo bloquea, con CORS podemos decir “esta página sí tiene permiso de entrar”

JWT: Cuando alguien inicia sesión, recibe un pase. Cada vez que entra a una parte privada de la app, muestra ese pase. El servidor ve el pase y muestra “Ok ya sé quién eres, puedes pasar”