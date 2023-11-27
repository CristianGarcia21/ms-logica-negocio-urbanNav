import Graph from './graph';

function mostrarGrafo() {
  const grafo = new Graph<string>();

  grafo.agregarNodo('A');
  grafo.agregarNodo('B');
  grafo.agregarNodo('C');
  grafo.agregarNodo('D');
  grafo.agregarNodo('E');
  grafo.agregarNodo('F');
  grafo.agregarNodo('G');
  grafo.agregarNodo('H');

  // A
  grafo.agregarArista('A', 'B', 4.392045648842813);
  grafo.agregarArista('A', 'C', 0.42646626595018644);
  grafo.agregarArista('A', 'D', 0.42646626595018644);
  grafo.agregarArista('A', 'E', 1.4760208262056294);
  grafo.agregarArista('A', 'F', 3.8752540463729224);
  grafo.agregarArista('A', 'G', 3.68562199850146);
  grafo.agregarArista('A', 'H', 3.8614573749031695);
  // B
  grafo.agregarArista('B', 'C', 4.5842155824327815);
  grafo.agregarArista('B', 'D', 4.242206696246835);
  grafo.agregarArista('B', 'E', 5.113411944753717);
  grafo.agregarArista('B', 'F', 8.161278823034362);
  grafo.agregarArista('B', 'G', 0.9942754269169055);
  grafo.agregarArista('B', 'H', 0.9868130716119089);
  // C
  grafo.agregarArista('C', 'D', 1.0445990837654358);
  grafo.agregarArista('C', 'E', 1.0504744737283782);
  grafo.agregarArista('C', 'F', 3.854698540225399);
  grafo.agregarArista('C', 'G', 3.94173364970832);
  grafo.agregarArista('C', 'H', 3.977244231333235);
  // D
  grafo.agregarArista('D', 'E', 0.8877134362237344);
  grafo.agregarArista('D', 'F', 4.748344981147104);
  grafo.agregarArista('D', 'G', 3.8043866957492676);
  grafo.agregarArista('D', 'H', 3.4700449120007777);
  // E
  grafo.agregarArista('E', 'F', 4.080289899175555);
  grafo.agregarArista('E', 'G', 4.624591588132294);
  grafo.agregarArista('E', 'H', 4.356803567355257);
  // F
  grafo.agregarArista('F', 'D', 4.748344981147104);
  grafo.agregarArista('F', 'G', 7.330255044992598);
  grafo.agregarArista('F', 'H', 7.723044384620415);
  // G
  grafo.agregarArista('G', 'D', 3.8043866957492676);
  grafo.agregarArista('G', 'H', 1.4229058333257356);
  // H
  grafo.agregarArista('H', 'D', 3.4700449120007777);
  //console.log(grafo.obtenerAristas());
  console.log(grafo.dijkstra('A', 'B'));

  //grafo.dijkstraDestino('A', 'F');
}
export default mostrarGrafo;
