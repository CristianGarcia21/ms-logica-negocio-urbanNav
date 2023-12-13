class Graph<T> {
  private nodos: Map<T, Map<T, number>>;

  constructor() {
    this.nodos = new Map();
  }

  existeNodo(nodo: T) {
    return this.nodos.has(nodo);
  }

  agregarNodo(nodo: T) {
    if (!this.nodos.has(nodo)) {
      this.nodos.set(nodo, new Map());
    }
  }

  agregarArista(origen: T, destino: T, peso: number) {
    if (!this.nodos.has(origen) || !this.nodos.has(destino)) {
      throw new Error('Los nodos de origen y destino deben estar en el Graph.');
    }

    this.nodos.get(origen)!.set(destino, peso);
    this.nodos.get(destino)!.set(origen, peso); // Si el Graph es no dirigido, quita esta línea
  }

  obtenerAristas() {
    const aristas: Array<[T, T, number]> = [];

    for (const [origen, destinos] of this.nodos.entries()) {
      for (const [destino, peso] of destinos.entries()) {
        aristas.push([origen, destino, peso]);
      }
    }

    return aristas;
  }

  obtenerNodos() {
    return Array.from(this.nodos.keys());
  }

  //generate dijkstra algorithm recursively
  dijkstra(nodoInicio: T, nodoDestino: T) {
    const distancias: Map<T, number> = new Map();
    const visitados: Set<T> = new Set();
    this.nodos.forEach((_, nodo) => distancias.set(nodo, Infinity));
    distancias.set(nodoInicio, 0);

    const obtenerNodoNoVisitadoConMenorDistancia = () => {
      let nodoNoVisitado: T | null = null;
      this.nodos.forEach((_, nodo) => {
        if (
          !visitados.has(nodo) &&
          (nodoNoVisitado === null ||
            distancias.get(nodo)! < distancias.get(nodoNoVisitado)!)
        ) {
          nodoNoVisitado = nodo;
        }
      });
      return nodoNoVisitado;
    };

    const relajarAristas = (nodoActual: T) => {
      this.nodos.get(nodoActual)!.forEach((peso, nodoDestino) => {
        const distanciaNueva = distancias.get(nodoActual)! + peso;
        if (distanciaNueva < distancias.get(nodoDestino)!) {
          distancias.set(nodoDestino, distanciaNueva);
        }
      });
      visitados.add(nodoActual);

      const nodoSiguiente = obtenerNodoNoVisitadoConMenorDistancia();
      if (nodoSiguiente) {
        relajarAristas(nodoSiguiente);
      }
    };

    const nodoSiguiente = obtenerNodoNoVisitadoConMenorDistancia();
    if (nodoSiguiente) {
      relajarAristas(nodoSiguiente);
    }

    const distanciaFinal = distancias.get(nodoDestino);
    const precio = distanciaFinal !== undefined ? Number((distanciaFinal * 0.50).toFixed(2)) : undefined;

    return {precio, distanciaFinal};
  }

  dijkstraDestino(nodoInicio: T, nodoDestino: T) {
    const distancias: Map<T, number> = new Map();
    const visitados: Set<T> = new Set();

    this.nodos.forEach((_, nodo) => distancias.set(nodo, Infinity));
    distancias.set(nodoInicio, 0);

    const obtenerNodoNoVisitadoConMenorDistancia = () => {
      let nodoNoVisitado: T | null = null;
      this.nodos.forEach((_, nodo) => {
        if (
          !visitados.has(nodo) &&
          (nodoNoVisitado === null ||
            distancias.get(nodo)! < distancias.get(nodoNoVisitado)!)
        ) {
          nodoNoVisitado = nodo;
        }
      });
      return nodoNoVisitado;
    };

    while (true) {
      const nodoActual = obtenerNodoNoVisitadoConMenorDistancia();
      if (nodoActual === null || nodoActual === nodoDestino) {
        break;
      }

      visitados.add(nodoActual);

      const vecinos = this.obtenerVecinos(nodoActual);
      for (const vecino of vecinos) {
        const distanciaDesdeInicio =
          distancias.get(nodoActual)! +
          this.obtenerDistancia(nodoActual, vecino);
        if (distanciaDesdeInicio < distancias.get(vecino)!) {
          distancias.set(vecino, distanciaDesdeInicio);
        }
      }
    }

    const distanciaAlDestino = distancias.get(nodoDestino);
    console.log(
      `Distancia desde ${nodoInicio} hasta ${nodoDestino}: ${distanciaAlDestino}`,
    );
  }

  obtenerDistancia(nodoA: T, nodoB: T): number {
    // Implementa la lógica para obtener la distancia entre los nodos A y B
    // Puedes adaptar esta función según la lógica específica de tu aplicación.
    // Por ejemplo, podrías tener un mapa de distancias precalculadas.
    // Aquí, simplemente se devuelve 1 como un ejemplo.
    return 1;
  }

  obtenerVecinos(nodo: T): T[] {
    // Implementa la lógica para obtener los nodos vecinos de un nodo dado.
    // Puedes adaptar esta función según la lógica específica de tu aplicación.
    // Aquí, simplemente se devuelve un array vacío como ejemplo.
    return [];
  }
}

export default Graph;
