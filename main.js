(function () {
  const buttons = document.querySelectorAll("button");

  const numbers = [
    1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8,
    8, 8, 8, 9, 9, 9, 9, 10, 10, 10,
  ];
  const letters = [
    "a",
    "b",
    "d",
    "c",
    "f",
    "g",
    "s",
    "q",
    "er",
    "a",
    "d",
    "c",
    "s",
    "f",
    "w",
    "r",
    "f",
    "g",
    "c",
    "s",
    "f",
    "f",
    "d",
    "c",
    "a",
    "z",
    "x",
    "z",
    "xz",
    "x",
    "s",
    "f",
    "f",
  ];

  function countLetrasNums(arreglo) {
    //Se almacenan los resultados del conteo
    const reconteo = {};

    //recorremos el array
    arreglo.forEach((item) => {
      //como vamos a alamcenar el conteo en un objeto (una estructura de datos clave valor , donde la clave sera el elmento y el valor la cantidad de veces que se repite dicho elemento como se indicaba que se debia imprimir la respuesta  EJE  a:2 = el elemento a aparecio 2 veces )

      // convertimo a string por si el elemento es un numero
      const clave = String(item);

      //Verificamos si dicha clave ya se encuentra en el objeto
      if (reconteo[clave] === undefined) {
        // si no existe la clave asignarla al objeto y llevarle el valor de 1
        reconteo[clave] = 1;
      } else {
        //si ya existe sumele 1
        reconteo[clave]++;
      }
    });
    // Iterar sobre el objeto de conteo e imprimir cada elemento y su conteo
    let stringMuestra = "";
    for (let clave in reconteo) {
      stringMuestra += `\n  ${clave}: ${reconteo[clave]} , \n `;
    }
    return stringMuestra;
  }

  function countfrase(frase) {
    return new Promise((resolve, reject) => {
      // Valido si la frase está vacía
      if (!frase.trim()) {
        // Si la frase está vacía, rechazar la promesa con un mensaje de error
        reject("No puedes dejar este campo vacío");
      } else {
        try {
          // Eliminar espacios en blanco al inicio y al final de la frase
          const fraseSinEspacios = frase.trim();
          // Dividir la frase en un array de palabras
          const palabras = fraseSinEspacios.split(" ");
          // Unir las palabras sin espacios para obtener una única cadena
          const fraseUnida = palabras.join("");
          // Convertir la cadena en un array de caracteres
          const arrayCaracteres = fraseUnida.split("");
          // Llamar a la función countLetrasNums con el array de caracteres y resolver la promesa con el resultado
          resolve(countLetrasNums(arrayCaracteres));
        } catch (error) {
          // En caso de error, rechazar la promesa con el error
          reject(error);
        }
      }
    });
  }

  let response;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dataSet = btn.dataset.btn;
      switch (dataSet) {
        case "letras":
          response = countLetrasNums(letters);
          Swal.fire({
            title: "Este fue el resultado",
            text: response,
            icon: "success",
          });
          break;

        case "numeros":
          response = countLetrasNums(numbers);
          Swal.fire({
            title: "Este fue el resultado",
            text: response,
            icon: "success",
          });
          break;
        default:
          // Llamar a SweetAlert con la función countfrase en preConfirm
          Swal.fire({
            title: "Ingresa la frase para realizar el conteo de letras",
            input: "text",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            showLoaderOnConfirm: true,
            preConfirm: async (inputValue) => {
              try {
                // Llamar a la función countfrase y esperar su resultado
                return await countfrase(inputValue);
              } catch (error) {
                // Mostrar mensaje de error y permitir al usuario volver a ingresar la información
                Swal.showValidationMessage(error);
              }
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "En la frase ingresada",
                html: `<strong>${result.value}</strong>`,
              });
            }
          });

          break;
      }
    });
  });
})();
