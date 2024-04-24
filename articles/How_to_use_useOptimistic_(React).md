---
title: "How to use useOptimistic (React)"
description: "useOptimistic es un React Hook que te permite mostrar un estado diferente mientras una acción asíncrona está en curso. Acepta algún estado como argumento y devuelve una copia de ese estado que puede ser diferente durante la duración de una acción asíncrona, como una solicitud de red. Proporciona una función que toma el estado actual y la entrada a la acción, y devuelve el estado optimista que se utilizará mientras la acción esté pendiente."
link: "https://react.dev/reference/react/useOptimistic"
slug: How_to_use_useOptimistic_(React)
skip: false
image: /static/images/articles/How_to_use_useOptimistic.jpg
lang: es
date: "2024-04-22"
---

# useOptimistic
## ¿Que es?
> **useOptimistic** es un *Hook de React* que te permite mostrar un estado diferente mientras una acción asíncrona está en curso. Acepta un estado como argumento y devuelve una copia de ese estado que puede ser diferente *durante la duración de una acción asíncrona*, como una solicitud de red. Proporcionas una función que toma el estado actual y la entrada para la acción, y devuelve el "estado optimista" que se usará mientras la acción está pendiente. [React](https://react.dev/reference/react/useOptimistic)

En palabras más sencillas, **useOptimistic** es un hook especializado en mostrar un estado mientras se ejecuta una acción síncrona. Dicho estado es nombrado como: *"estado optimista"*, porque generalmente se utiliza para presentar de *inmediato* al usuario el resultado de realizar una acción, *aunque la acción en realidad tarde en completarse*.

Esto es perfecto para cuando estemos haciendo uso de algún  método del servidor (como hacer fetch, subir un dato a la base de datos, etc...), ya que dichos métodos *suelen tomar un tiempo antes de completarse*, especialmente si el internet del usuario no es de mucha capacidad.

## Estructura
```
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```
- **optimisticState:** Tendra el mismo valor que *'state'* siempre y cuando no se esté ejecutando una acción, en caso contrario, *'optimisticState'* pasara a tener el valor retornado por *'updateFn'*, al momento en que la acción termine de ejecutarse, *'optimisticState'* volverá a tener el valor de *'state'*
- **addOptimistic:** Es la función a llamar al momento de realizar la acción que nos consumirá tiempo, se pasa por parámetro el valor que tendrá *'optimisticState'* mientras *se está ejecutando* la acción.
- **state:** Como se explicó anteriormente, es el valor que tendrá  'optimisticState' mientras no se esté ejecutando la acción.
- **updateFn:** Es la función encargada de actualizar optimisticState mientras se ejecuta la acción que nos consumirá tiempo, su estructura es la siguiente:
	- ```(currentState, optimisticValue) => {return temporalOptimisticState}```
	- **currentState:** Es el valor actual en que está  'optimisticState', muy útil cuando el valor es un arreglo o un objeto complejo.
	- **optimisticValue:** Es el nuevo valor a colocar/agregar a 'optimisticState' mientras se ejecuta la 'acción'.

## ¿Como usarlo? (Ejemplo practico)
A continuación, un pequeño ejemplo práctico usando las siguientes tecnologías:
- [TypeScript](https://www.typescriptlang.org) 
- [Next.js](https://nextjs.org) 
- [Axios](https://www.npmjs.com/package/axios)
- [Tailwind](https://tailwindcss.com)
- [Api de Rick y Morty](https://rickandmortyapi.com)

## Estructura del proyecto.
El proyecto que usaremos de ejemplo para este caso no se aleja mucho de un proyecto convencional empezado con [Next.js](https://nextjs.org), Los archivos más destacables son los que están en *app\rick-and-morty-example\*, ya que son los archivos creados para explicar este ejemplo.
![Dark mode at WorkOS](/static/images/articles/useOptimistic(React)_ProyectEstructure.png)

<hr></hr>

### app\rick-and-morty-example\rick-and-morty-api.ts
Archivo encargado de manejar el [server action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) para obtener los datos de la  [api de Rick y Morty](https://rickandmortyapi.com), así como de poseer la interfaz *"Character"*, que define los atributos de los personajes obtenidos por la API.
	
```jsx
"use server";
import axios from "axios";

export const getRickAndMortyData = async (
  page: number
): Promise<Character[]> => {
  const fetchData = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  return fetchData.data.results as Character[];
};

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type?: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
```

<hr></hr>

### app\rick-and-morty-example\rick-and-morty-card.tsx
Componente encargado de renderizar la informacion obtenida por la api.

```jsx
import React from "react";
import { Character } from "./rick-and-morty-api";
import Image from "next/image";

interface RickMortyCardProps {
  character: Character;
}

const RickMortyCard = ({ character }: RickMortyCardProps) => {
  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden">
      <Image
        src={character.image}
        alt={character.name}
        className="w-full h-48 object-cover"
        width={1000}
        height={1000}
      />

      <div className="p-6 flex flex-col">
        <h2 className="text-xl font-semibold text-gray-800">
          {character.name}
        </h2>

        <div className="mt-4">
          <p className="text-gray-600">ID: {character.id}</p>
          <p className="text-gray-600">Status: {character.status}</p>
          <p className="text-gray-600">Species: {character.species}</p>
          <p className="text-gray-600">Gender: {character.gender}</p>

          <div className="mt-2">
            <p className="text-gray-600">
              Origin:{" "}
              <a
                href={character.origin.url}
                className="text-blue-500 hover:underline"
              >
                {character.origin.name}
              </a>
            </p>
            <p className="text-gray-600">
              Last Known Location:{" "}
              <a
                href={character.location.url}
                className="text-blue-500 hover:underline"
              >
                {character.location.name}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RickMortyCard;
```

<hr></hr>

### app\rick-and-morty-example\page.tsx 
Y aquí es donde empieza la magia, este archivo se renderiza en el lado del [client](https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering), pero está ejecutando un [server action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) encargado de recolectar la informacion de la [api de Rick y Morty](https://rickandmortyapi.com) para mostrarla en la pagina.


#### Vamos a comentar unas cuantas secciones de este archivo. 
```js  
const [rickAndMortyData, setRickAndMortyData] =  useState<Character[]>([]);
``` 
Se encarga de almacenar y actualizar el contenido sobre Rick and Morty. 

```js
const [actualPage, setActualPage] =  useState<number>(1);
``` 
La forma en que se obtiene los personajes de la serie de Rick y Morty es de 20 en 20, pasando un parámetro llamado *"page"* a la URL de la api, utilizo este useState para almacenar y actualizar la página en la que nos ubicamos.

```js 
const [optimisticState, addOptimistic] =  useOptimistic(
	rickAndMortyData,
	(currentState, optimisticValue:  Character) => {
		return [...currentState, optimisticValue];
	}
);
```

La razón de este artículo, el *'useOptimistic'*, el 'optimisticState', es el valor a renderizar, por defecto tiene como valor el mismo que el de la variable *'rickAndMortyData'*, pero al usar  *'addOptimistic'* el valor pasa a ser *'[...currentState, optimisticValue]'* (osea, el valor actual de 'rickAndMortyData' + optimisticValue que se pasa por parametro)

```js
const onClickHandler = async () => {
    addOptimistic({
      url: "#",
      origin: { url: "#" },
      location: { url: "#" },
    } as Character);
    const data = await getRickAndMortyData(actualPage);
    setRickAndMortyData([...rickAndMortyData, ...data]);
    setActualPage(actualPage + 1);
};
```
En esta sección podemos ver el funcionamiento del addOptimistic, como se puede observar, se le pasa por parámetro:


```js
{
	url: "#",
	origin: { url: "#" },
	location: { url: "#" },
} as Character
```

Esto a su vez, ejecuta:
```js
(currentState, optimisticValue: Character) => {
    return [...currentState, optimisticValue];
}
```
Lo cual cambia el valor de optimisticState **mientras se ejecuta** el server action encargado de recolectar la información de Rick and Morty.


```JS
const data = await getRickAndMortyData(actualPage);
setRickAndMortyData([...rickAndMortyData, ...data]);
```
Una vez seteado el *'optimisticState'* con *'addOptimistic'*, pasamos a obtener los datos de la API en cuestión, una vez recolectados, actualizamos la variable *'rickAndMortyData'* con *'setRickAndMortyData'*, en el momento en que se termina de actualizar la variable *'rickAndMortyData'*, *'optimisticState'* pasa a tener el valor de  *'rickAndMortyData'*.

```jsx
return (
    <main className="w-screen box-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {optimisticState.map((character, idx) => (
          <RickMortyCard character={character} key={idx} />
        ))}
      </div>
      <button
        className="block m-4 box-border p-4 border rounded-sm shadow-sm"
        onClick={onClickHandler}
      >
        Get More Characters
      </button>
    </main>
  );
```

Es lo que renderiza page.tsx, lo que verá el usuario, solo cabe agregar una pequeña observación, observa como utilizo *"optimisticState"* en vez de *"rickAndMortyData"*, ya que realmente este es el valor que quiero mostrar en pantalla, pues, mientras no se esté ejecutando el [server action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations), *"optimisticState"* tiene el mismo valor que *"rickAndMortyData"*, mientras se actualiza el valor *"rickAndMortyData"*, (o sea, mientras se ejecuta el server action para obtener la data de Rick y Morty para después agregarla a con *'setRickAndMortyData'*) *"optimisticState"* pasa a tener el valor de *"rickAndMortyData"* **MÁS** un objeto vacío de tipo *Character*, y cuando se termina el server action, *"optimisticState"* pasa a tener el mismo valor de *"rickAndMortyData"* ya actualizado.

## TypeScript
Se puede especificar el tipo de dato que manejara el useOptimistic de la misma forma que otros Hooks, el cambio más notable es que ya no haremos uso de la parte 'updateFn', en cambio, manejaremos el cambio completamente mediante el uso de *'addOptimistic'*.

### Ejemplo:
```jsx
const [optimisticState, addOptimistic] =
    useOptimistic<Character[]>(rickAndMortyData);

  const onClickHandler = async () => {
    addOptimistic([
      ...optimisticState,
      {
        url: "#",
        origin: { url: "#" },
        location: { url: "#" },
      },
    ] as Character[]);
	// Acción que requiere tiempo...
  }
```

Aqui esta el [Link al repositorio](https://github.com/Cristofers/CristofersExample-useOptimistic).