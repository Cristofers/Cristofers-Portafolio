---
title: "Modo oscuro con Next-Themes"
description: ""Experimenta la magia del Modo Oscuro con Next-Themes: una funcionalidad que transforma tu experiencia digital en algo verdaderamente cautivador. Sumérgete en una estética sofisticada y moderna que no solo es visualmente impresionante, sino también amable con tus ojos durante esas largas sesiones frente a la pantalla. Con Next-Themes, cada detalle se optimiza para ofrecerte claridad y contraste perfectos, permitiéndote navegar, trabajar y disfrutar de tu contenido favorito con mayor comodidad y estilo. ¡Dale a tu interfaz un toque de elegancia nocturna y descubre cómo el Modo Oscuro puede enriquecer tu día a día!""
link: 
slug: Dark_Mode_next_themes
skip: false
image: 
lang: es
date: "2024-04-24"
---

> Experimenta la magia del Modo Oscuro con Next-Themes: una funcionalidad que transforma tu experiencia digital en algo verdaderamente cautivador. Sumérgete en una estética sofisticada y moderna que no solo es visualmente impresionante, sino también amable con tus ojos durante esas largas sesiones frente a la pantalla. Con Next-Themes, cada detalle se optimiza para ofrecerte claridad y contraste perfectos, permitiéndote navegar, trabajar y disfrutar de tu contenido favorito con mayor comodidad y estilo. ¡Dale a tu interfaz un toque de elegancia nocturna y descubre cómo el Modo Oscuro puede enriquecer tu día a día!

## Tecnologias a utilizar: 
- [NextJS](https://nextjs.org)
- [Next-Themes](https://github.com/pacocoursey/next-themes)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind](https://tailwindcss.com)

## Paso 1
Empezamos creando nuestra aplicación de [nextJs](https://nextjs.org) con el comando: 
```npx create-next-app@latest```
![Dark mode at WorkOS](\static\images\articles\DarkMode_Installation.jpg)

Si corremos la aplicación podemos observar que por defecto ya está utilizando el modo oscuro.

![Dark mode at WorkOS](\static\images\articles\Dark_Mode_next_themes.jpg)
Esto lo podemos comprobar al ver los classNames de *'app\page.tsx'*, ya que algunos atributos tienen la palabra dark: al inicio.

### Paso 2
Nos vamos a dirigir a tailwind.config.ts y agregaremos el siguiente valor:
```js
const config: Config = {
    darkMode: 'class'
//...
}
```
Esto es una forma de decirle a [Tailwind](https://tailwindcss.com) que vamos a trabajar con el modo oscuro de manera manual mediante el uso de las clases.

### Paso 3
Instalar [next-themes](https://github.com/pacocoursey/next-themes) con ```npm i next-themes```

### Paso 4
No podemos pasar directamente el ThemeProvider en el Layout, así que crearemos un 'contenedor' para colocarlo:
```jsx
// app/providers.tsx
"use client";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};
```

Y lo colocamos en nuestro *'app\layout.tsx:'*
```jsx
//...
import { Providers } from "./providers";
//...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
        <body className={inter.className}>
            <Providers>
                {children}
            </Providers>
        </body>
    </html>
  );
}
```
### ¿Por qué no pasamos directamente el ThemeProvider en 'app\layout.tsx:'?
Intentar crear un contexto en la raíz de nuestra aplicación causará un error, debido a que NO podemos usar [React Context](https://react.dev/learn/passing-data-deeply-with-context) en un Server Component.

Para solucionar esto, creamos nuestro proveedor en un Client Component y ya luego podremos usar dicho componente en cualquier Server Component, o en este caso, en *'app\layout.tsx'*, la raíz de la aplicación (la cual es un server component)

["Click aqui"](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers) para mas informacion...


## Paso 5
Al renderizar código de React del lado del servidor, normalmente aparece una advertencia cuando el servidor y el cliente renderizan contenidos diferentes, para desactivar esto, haremos uso de *'[suppressHydrationWarning]'*(https://legacy.reactjs.org/docs/dom-elements.html#suppresshydrationwarning) para que React no nos avise de desajustes en los atributos y el contenido de dicho elemento elemento.

```jsx
// app\layout.tsx
// ...
<html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
        <Providers>{children}</Providers>
    </body>
</html>
//...
```

## Paso 6
Una vez creado nuestro 'contenedor', solamente toca crear un elemento para cambiar el tema, en mi caso, me decanté por un sencillo botón que siempre se renderizara del lado inferior derecho por motivos prácticos para este ejercicio.

```jsx
"use client";
import React from "react";
import { useTheme } from "next-themes";

const ChangeThemeButton = () => {
  const { resolvedTheme, theme, setTheme } = useTheme();

  const onClickHandler = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={onClickHandler}
      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
    >
      Cambiar Tema (Tema Actual: {theme} )
    </button>
  );
};

export default ChangeThemeButton;
```

Colocamos este componente en '*app\page.tsx'*

```jsx
import ChangeThemeButton from "./change-theme-button";
// ...
<ChangeThemeButton />
    </main>
  );
}
//...
```

¡Y listo!, podremos observar que al hacer clic, algunos elementos en pantalla cambian, pero de una forma... extraña... Antes de resolver esto, pasemos a resolver otro error en pantalla:
```Error: Hydration failed because the initial UI does not match what was rendered on the server.```

## Paso 7
El código del botón es inseguro con todo el tema de [Hydration](https://legacy.reactjs.org/docs/dom-elements.html#suppresshydrationwarning:~:text=It%20only%20works%20one%20level%20deep) y lanzará una advertencia de desajuste cuando se renderice. Esto se debe a que no podemos conocer el tema en el servidor, por lo que siempre será *'indefinido'* hasta que se monte en el cliente.

Para esto haremos uso de useEffect, pues el mismo es llamado cuando el componente termina de renderizarse, también haremos uso de useState para guardar el estado de 'renderizado', el código nos quedaría tal que así:

```jsx
"use client";
import React, { useState, useEffect } from "react"; // <-
import { useTheme } from "next-themes";

const ChangeThemeButton = () => {
  const [mounted, setMounted] = useState(false); // <-
  const { resolvedTheme, theme, setTheme } = useTheme();

  useEffect(() => {   // <-
    setMounted(true); // <-
  }, []);             // <-

  const onClickHandler = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (mounted) {
    return (
      <button
        onClick={onClickHandler}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
      >
        Cambiar Tema (Tema Actual: {theme} )
      </button>
    );
  }
};

export default ChangeThemeButton;
```

Y solo con estos pequeños cambios ya no tendremos el problema con el Hydration.

## Paso 8
Regresando al error visual, en *'app\globals.css'* podemos ver el siguiente cacho de código:
```css
body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
```

Elimínalo... ¡Y a disfrutar!, para colocar un atributo de css en Tailwind cuando estamos en modo oscuro, solo tendremos que colocar la palabra '*dark*' detras del atributo, por ejemplo:

```html
    <button
      className="border rounded bg-blue-50"
    >
      Click Me
    </button>
```

Link del repositorio: [https://github.com/Cristofers/CristofersExample-NextThemes](https://github.com/Cristofers/CristofersExample-NextThemes) 