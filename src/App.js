
import { Component } from "react";
import Buscador from "./componentes/Buscador";
import Resultado from './componentes/Resultado';
class App extends Component {
  state = {
    termino :'',
    imagenes : [],
    pagina:""
  }
  // METODOS
  scroll = () => {
    const elemento = document.querySelector(".jumbotron");
    elemento.scrollIntoView("smooth","start");
  }
  
  paginaAnterior =() =>{
 // leer el state
 let pagina = this.state.pagina;
 // si pagina es 1 no devolverse
 if(pagina===1)return null;
 // Aumentar 1
pagina -=1;
 // agregar el cambio al state
this.setState({
pagina
},()=> {
  this.consultarApi();
  this.scroll();
});
 //console.log(pagina);
  }
  paginaSiguiente =() =>{
   // leer el state
let pagina = this.state.pagina;
   // Aumentar 1
pagina +=1;
   // agregar el cambio al state
this.setState({
pagina
},()=> {
  this.consultarApi();
  this.scroll();

});
 //  console.log(pagina);
  }
  consultarApi = ()=> {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
  const url = `https://pixabay.com/api/?key=2560331-26507c2ed90d8b4f023f7096e&q=${termino}&per_page=30&page=${pagina}`;
 //const url = `https://pokeapi.co/api/v2/pokemon/${termino}`;
 // console.log(url);
fetch(url)
.then(respuesta => respuesta.json())
  .then(resultado => this.setState({imagenes :resultado.hits}))
}
  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () =>{
      this.consultarApi();
    })
  }
  render() {
  return (
          <div className="app container">
               <div className="jumbotron">
                   <p className="lead text-center">Buscar Imagenes</p>
                      <Buscador
                      datosBusqueda={this.datosBusqueda}
                      />
               </div>
              <div className="row justify-content-center">
              <Resultado
              imagenes={this.state.imagenes}
              paginaAnterior={this.paginaAnterior}
              paginaSiguiente={this.paginaSiguiente}
             
              />
                </div>
          </div>
        );
      }
}

export default App;
