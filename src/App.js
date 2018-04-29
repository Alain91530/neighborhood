import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import {MyMap} from './MyMap';            // eslint-disable-line no-unused-vars
import {AppHeader} from './AppHeader';          // eslint-disable-line no-unused-vars
import '../styles/App.css';


class App extends Component {

  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }

  render() {
    const PointsOfInterest = [
      { title: 'Cathedrale Saint-Etienne Agde ', position: {lng: 3.4692, lat : 43.3139 }},
      { title: 'Chateau Laurens ', position: {lng: 3.4716, lat : 43.3179 }},
      { title: 'Ecluse Ronde Agde' , position: {lng: 3.4674, lat : 43.3202 }},
      { title: 'Eglise Saint-Andre Agde ' , position: {lng: 3.47, lat : 43.3117 }},
      { title: 'Fort Brescou ' , position: {lng: 3.5019, lat : 43.2631 }},
      { title: ' Glaciere Communale Agde ' , position: {lng: 3.471283, lat : 43.313813 }},
      { title: ' Hotel Malaval ' , position: {lng: 3.4691158000001, lat : 43.3126395 }},
      { title: ' Hotel Viguier-Guerin ' , position: {lng: 3.4706462, lat : 43.3142917 }},
      { title: 'Hotel Ville Agde ' , position: {lng: 3.4684647, lat : 43.3132999 }},
      { title: ' Immeuble ' , position: {lng: 3.4691472, lat : 43.3131444 }},
      { title: ' Maison ' , position: {lng: 3.4698034, lat : 43.3133696 }},
      { title: ' Maison Renaissance Agde ' , position: {lng: 3.47055, lat : 43.314117 }},
      { title: ' Palais Episcopal Agde ' , position: {lng: 3.4692764282227, lat : 43.314253711747 }},
      { title: ' Pont Saint-Joseph Agde ' , position: {lng: 3.447103, lat : 43.31683 }},
      { title: 'Remparts Agde ' , position: {lng: 3.4713, lat : 43.3147 }},
      { title: 'Tour Anglais Agde ' , position: {lng: 3.503464, lat : 43.297526 }},
      { title: 'Chateau Agel' , position: {lng: 2.8539, lat : 43.3386 }},
      { title: 'Chapelle Morcairol ' , position: {lng: 3.0933, lat : 43.5792 }},
      { title: ' Eglise Saint-Martin Alignan-Vent' , position: {lng: 3.3433, lat : 43.4709 }},
      { title: ' Tour medievale Alignan-Vent ' , position: {lng: 3.3416, lat : 43.4695 }},
      { title: ' Abbatiale Saint-Sauveur Aniane ' , position: {lng: 3.5861, lat : 43.6844 }},
      { title: 'Abbaye Aniane ' , position: {lng: 3.5894, lat : 43.6836 }},
      { title: ' Chapelle Penitents Aniane ' , position: {lng: 3.585926, lat : 43.684466 }},
      { title: ' Hotel Ville Aniane ' , position: {lng: 3.5867, lat : 43.6845 }},
      { title: ' Pont Diable Aniane ' , position: {lng: 3.5574, lat : 43.7076 }},
      { title: ' Chateau Arboras ' , position: {lng: 3.4856, lat : 43.7117 }},
      { title: ' Chapelle Argelliers ' , position: {lng: 3.720768, lat : 43.697278 }},
      { title: 'Eglise Saint-Etienne Argelliers ' , position: {lng: 3.673942, lat : 43.697322 }},
      { title: ' Eglise Saint-Julien Aspiran ' , position: {lng: 3.4501361846924, lat : 43.5659719713 }},
      { title: ' Chateau Assas ' , position: {lng: 3.8976144790649, lat : 43.701536063833 }},
      { title: 'Eglise Saint-Martial Assas ' , position: {lng: 3.898129, lat : 43.7014 }},
      { title: ' Chapelle Saint-Martin Cardonnet ' , position: {lng: 3.643046, lat : 43.577317 }},
      { title: 'Chateau Aumelas' , position: {lng: 3.5992, lat : 43.6039 }},
      { title: 'Oppidum Proch-Ba', position:{lng: 3.461328, lat : 43.47357 }},
      { title: 'B', position: {lng: 3.987179, lat :43.654102}},
      { title: 'Eglise Saint-Julien-Sainte-Basilisse Baillargues', position: {lng: 4.013663, lat:43.660836 }},
      { title: 'Aqueduc Balaruc', position: {lng:3.685157, lat: 43.451455 }},
      { title: ' Basilique Balaruc-Bains ' , position: {lng: 3.678462, lat : 43.440554 }},
      { title: ' Eglise Notre-Dame-Aix Balaruc-Bains ' , position: {lng: 3.681646, lat : 43.440936 }},
      { title: ' Aqueduc Balaruc ' , position: {lng: 3.6882, lat : 43.4566 }},
      { title: ' Chateau Beaufort ' , position: {lng: 2.7589, lat : 43.2992 }},
      { title: ' Chapelle Notre-Dame-Pitie Beaulieu ' , position: {lng: 4.0288, lat : 43.7297 }},
      { title: ' Chapelle Saint-Raphael Bastide ' , position: {lng: 3.1363, lat : 43.5915 }},
      { title: ' Eglise Saint-Pierre Bessan ' , position: {lng: 3.4271, lat : 43.3599 }},
      { title: ' Hotel Berard Montalet ' , position: {lng: 3.4270544, lat : 43.361062 }},
      { title: ' Moulin Bessan ' , position: {lng: 3.4452, lat : 43.3624 }},
      { title: ' Enceinte Boisseron ' , position: {lng: 4.082376, lat : 43.760739 }},
      { title: ' Pont Romain Boisseron ' , position: {lng: 4.081249, lat : 43.761703 }},
      { title: ' Chateau Cazilhac ' , position: {lng: 3.1672, lat : 43.6936 }},
      { title: ' Chapelle Saint-Etienne Issensac ' , position: {lng: 3.7008, lat : 43.8433 }},
      { title: ' Eglise Saint-Nazaire-Saint-Celse Brissac ' , position: {lng: 3.7021, lat : 43.8778 }},
      { title: ' Pont Saint-Etienne Issensac ' , position: {lng: 3.701, lat : 43.8441 }},
      { title: ' Chateau Buzignargues ' , position: {lng: 4.0051898, lat : 43.771532 }},
      { title: ' Eglise Saint-Nazaire-Saint-Celse Buzignargues ' , position: {lng: 4.005, lat : 43.7707 }},
      { title: ' C ' , position: {lng: 3.3224, lat : 43.5771 }},
      { title: ' Eglise Saints-Come-Damien Candillargues ' , position: {lng: 4.0694689750671, lat : 43.619766735202 }},
      { title: ' Chateau Archeveques Narbonne ' , position: {lng: 3.0453, lat : 43.3297 }},
      { title: ' Collegiale Saint-Etienne Capestang ' , position: {lng: 3.044, lat : 43.3281 }},
      { title: ' Epanchoir Fer Mulet ' , position: {lng: 3.015412, lat : 43.329392 }},
      { title: ' Maison Baisse' ,position: {lng: 3.044948, lat : 43.328017 }},
      { title: ' Maison Balat ' , position: {lng: 3.044811, lat: 43.327903 }},
      { title: ' Chateau Castelnau-Guers ' , position: {lng: 3.438, lat : 43.4354 }},
      { title: ' Chateau Verchant ' , position: {lng: 3.9019, lat : 43.6369 }},
      { title: ' Eglise Saint-Jean-Baptiste Castelnau-Lez ' , position: {lng: 3.8949, lat : 43.6331 }},
      { title: ' Glaciere Castelnau-Lez ' , position: {lng: 3.8972, lat : 43.6312 }},
      { title: ' Voie Domitienne ' , position: {lng: 3.9248, lat : 43.6471 }},
      { title: ' Aqueduc Castries ' , position: {lng: 3.985851, lat : 43.679048 }},
      { title: ' Chateau Castries ' , position: {lng: 3.9822, lat : 43.6797 }},
      { title: ' Eglise Invention-Saint-Etienne Castries ' , position: {lng: 3.98617, lat : 43.67756 }},
      { title: ' Pont Cadoule Castries ' , position: {lng: 3.9814, lat : 43.6714 }},
      { title: ' Eglise Notre-Dame Caunette ' , position: {lng: 2.7757, lat : 43.3536 }},
      { title: ' Piles Causses-Veyran ' , position: {lng: 3.0983, lat : 43.4658 }},
      { title: ' Eglise Saint-Gervais Caux ' , position: {lng: 3.368686, lat : 43.506974 }},
      { title: ' Maison ' , position: {lng: 3.3684, lat : 43.5069 }},
      { title: ' Abbaye Sainte-Marie Fontcaude ' , position: {lng: 3.055, lat : 43.4178 }},
      { title: ' Eglise Saint-Amand Cazedarnes ' , position: {lng: 3.0313, lat : 43.4273 }},
      { title: ' Norias Cazilhac ' , position: {lng: 3.7078, lat : 43.9243 }},
      { title: ' Chateau Savignac-Haut ' , position: {lng: 3.1022, lat : 43.3933 }},
      { title: ' Eglise Saint-Saturnin Cazouls-Beziers ' , position: {lng: 3.101369, lat : 43.392201 }},
      { title: ' Eglise Saint-Vincent Savignac ' , position: {lng: 3.123813, lat : 43.415772 }},
      { title: ' Chateau Cazouls-Herault ' , position: {lng: 3.4581, lat : 43.5072 }},
      { title: ' Croix Cimetiere Cebazan ' , position: {lng: 2.9781532287598, lat : 43.403644434426 }},
      { title: ' Eglise Rocozels ' , position: {lng: 3.0866, lat : 43.8149 }},
      { title: ' Eglise Saint-Jean-Baptiste Ceilhes ' , position: {lng: 3.1115, lat : 43.8031 }},
      { title: ' Eglise Saint-Pierre-Salle Cessenon-Orb ' , position: {lng: 3.0489, lat : 43.4493 }},
      { title: ' Chapelle Saint-Germain Cesseras ' , position: {lng: 2.6942, lat : 43.3247 }},
      { title: ' Chapelle Saint-Salvy ' , position: {lng: 2.7218, lat : 43.3224 }},
      { title: ' Dolmen Cigaliere ' , position: {lng: 2.7221, lat : 43.3356 }},
      { title: ' Eglise Saint-Genies-Rome Cesseras ' , position: {lng: 2.7133119106293, lat : 43.325606949103 }},
      { title: ' Grotte Aldene ' , position: {lng: 2.6984, lat : 43.3539 }},
      { title: ' Chapelle Notre-Dame Hortus ' , position: {lng: 3.4688, lat : 43.643 }},
      { title: ' Ermitage Saint-Pierre Leneyrac ' , position: {lng: 3.443326, lat : 43.655282 }},
      { title: ' Tour Leneyrac ' , position: {lng: 3.443739, lat : 43.655201 }},
      { title: ' Eglise Saint-Antoine Clapiers ' , position: {lng: 3.8888, lat : 43.6573 }},
      { title: ' Eglise Saint-Felix-Gerone Claret ' , position: {lng: 3.9054250717163, lat : 43.86250506226 }},
      { title: ' Chapelle Couvent Recollets Clermont-Herault ' , position: {lng: 3.437302, lat : 43.628795 }},
      { title: ' Chapelle Notre-Dame Peyrou ' , position: {lng: 3.4108, lat : 43.6194 }},
      { title: ' Chapelle Penitents Clermont-Herault ' , position: {lng: 3.431527, lat : 43.625982 }},
      { title: ' Chateau Guilhem ' , position: {lng: 3.4278, lat : 43.6297 }},
      { title: ' Collegiale Saint-Paul Clermont-Herault ' , position: {lng: 3.4307, lat : 43.627 }},
      { title: ' Couvent Notre-Dame Gorjan ' , position: {lng: 3.4297, lat : 43.6293 }},
      { title: ' Grange Verny ' , position: {lng: 3.4646, lat : 43.6007 }},
      { title: ' Maison ' , position: {lng: 3.4301083, lat : 43.6273073 }},
      { title: ' Maison Brives ' , position: {lng: 3.4302, lat : 43.6287 }},
      { title: ' Monument Morts Clermont-Herault ' , position: {lng: 3.4357, lat : 43.6264 }},
      { title: ' Donjon Colombieres-Orb ' , position: {lng: 2.999021, lat : 43.58031 }},
      { title: ' Tunnel-aqueduc Drainage Etang Colombiers Montady ' , position: {lng: 3.1267, lat : 43.3072 }},
      { title: ' Aqueduc Beziers ' , position: {lng: 3.2121, lat : 43.4011 }},
      { title: ' Croix Cros ' , position: {lng: 3.3639, lat : 43.8708 }},
      { title: ' Eglise Sainte-Eulalie Cruzy ' , position: {lng: 2.9405, lat : 43.3559 }},
      { title: ' D ' , position: {lng: 3.2111, lat : 43.6674 }},
      { title: ' Eglise Saint-Andre Valquieres ' , position: {lng: 3.2344, lat : 43.6672 }},
      { title: ' Eglise Saint-Etienne Dio ' , position: {lng: 3.2123, lat : 43.6693 }},
      { title: ' E ' , position: {lng: 3.2576, lat : 43.4365 }},
      { title: ' F ' , position: {lng: 3.7655, lat : 43.5377 }},
      { title: ' Eglise Saint-Jacques Fabregues ' , position: {lng: 3.7762, lat : 43.5519 }},
      { title: ' Oppidum Roque ' , position: {lng: 3.8089, lat : 43.5553 }},
      { title: ' Ensemble Marbrier Moulin Biot ' , position: {lng: 2.5597, lat : 43.345 }},
      { title: ' Grotte Camprafaud ' , position: {lng: 2.9034, lat : 43.4578 }},
      { title: ' Cimetiere Eglise Fontes ' , position: {lng: 3.3782, lat : 43.5427 }},
      { title: ' Eglise Saint-Hippolyte Fontes ' , position: {lng: 3.3775, lat : 43.5424 }},
      { title: ' Aqueduc Beziers ' , position: {lng: 3.2452, lat : 43.4969 }},
      { title: ' Chateau Fozieres ' , position: {lng: 3.3578, lat : 43.7525 }},
      { title: ' Chapelle Penitents Frontignan ' , position: {lng: 3.7549, lat : 43.4471 }},
      { title: ' Eglise Saint-Paul Frontignan ' , position: {lng: 3.7552, lat : 43.4474 }},
      { title: ' Immeuble ' , position: {lng: 3.7553722, lat : 43.4453731 }},
      { title: ' Immeuble ' , position: {lng: 3.7555, lat : 43.4462 }},
      { title: ' G ' , position: {lng: 3.2621, lat : 43.5156 }},
      { title: ' Residence Eveques Beziers ' , position: {lng: 3.2738449999999, lat : 43.514032 }},
      { title: ' Abbaye Saint-Felix-Montceau ' , position: {lng: 3.7262, lat : 43.4873 }},
      { title: ' Chemin Croix Notre-Dame-Grace ' , position: {lng: 3.5551, lat : 43.6481 }},
      { title: ' Eglise Saint-Pierre Gignac ' , position: {lng: 3.5523, lat : 43.6522 }},
      { title: ' Hospice Gignac ' , position: {lng: 3.550993, lat : 43.652465 }},
      { title: ' Hotel Laures ' , position: {lng: 3.5500860214233, lat : 43.652355863611 }},
      { title: ' Mas Rieussec ' , position: {lng: 3.564, lat : 43.6577 }},
      { title: ' Pont Gignac ' , position: {lng: 3.5357, lat : 43.6537 }},
      { title: ' Site Castellas ' , position: {lng: 3.5507, lat : 43.6508 }},
      { title: ' Tour Grand-Travers ' , position: {lng: 4.037965, lat : 43.560501 }},
      { title: ' Eglise Saint-Michel Guzargues ' , position: {lng: 3.924222, lat : 43.721882 }},
      { title: ' J ' , position: {lng: 3.9122, lat : 43.6614 }},
      { title: ' Abbaye Joncels ' , position: {lng: 3.194, lat : 43.7373 }},
      { title: ' Chateau Jonquieres ' , position: {lng: 3.4764, lat : 43.6761 }},
      { title: ' Chateau Caunelles ' , position: {lng: 3.8106, lat : 43.6139 }},
      { title: ' L ' , position: {lng: 3.0788, lat : 43.5878 }},
      { title: ' Arenes Lansargues ' , position: {lng: 4.0771, lat : 43.6511 }},
      { title: ' Eglise Saint-Martin Lansargues ' , position: {lng: 4.0731, lat : 43.6531 }},
      { title: ' Ch�teau Laroque ' , position: {lng: 3.723795, lat : 43.922455 }},
      { title: ' Chapelle Saint-Jean de Laroque ' , position: {lng: 3.723987, lat : 43.922482 }},
      { title: ' Fabrique Chaux Laroque ' , position: {lng: 3.7265, lat : 43.9272 }},
      { title: ' Grotte Vache ' , position: {lng: 3.733, lat : 43.9173 }},
      { title: ' Eglise Saint-Laurent lattes ' , position: {lng: 3.9023780822754, lat : 43.567876550114 }},
      { title: ' Site Archeologique lattara ' , position: {lng: 3.9085, lat : 43.5662 }},
      { title: ' Chateau Grezan ' , position: {lng: 3.1945, lat : 43.50446 }},
      { title: ' Chateau Lavalette ' , position: {lng: 3.272217, lat : 43.691685 }},
      { title: ' Chateau Engarran ' , position: {lng: 3.8069, lat : 43.5978 }},
      { title: ' Chateau Eveques Montpellier ' , position: {lng: 3.8061, lat : 43.5864 }},
      { title: ' Eglise Saint-Pierre Lespignan ' , position: {lng: 3.1749, lat : 43.2707 }},
      { title: ' Villa Gallo-romaine Lespignan ' , position: {lng: 3.171951, lat : 43.256712 }},
      { title: ' Chateau Lezignan-Cebe ' , position: {lng: 3.439, lat : 43.4934 }},
      { title: ' Chateau Ribaute ' , position: {lng: 3.2378, lat : 43.4194 }},
      { title: ' Eglise Saint-Etienne Liviniere ' , position: {lng: 2.6352, lat : 43.4164 }},
      { title: ' Sanctuaire Notre-Dame Spasme ' , position: {lng: 2.6399, lat : 43.3116 }},
      { title: ' Cathedrale Saint-Fulcran Lodeve ' , position: {lng: 3.3172, lat : 43.7319 }},
      { title: ' Eglise Saint-Pierre Lodeve ' , position: {lng: 3.3224, lat : 43.7308 }},
      { title: ' Ensemble Episcopal Lodeve ' , position: {lng: 3.3173, lat : 43.7325 }},
      { title: ' Grotte Treviols ' , position: {lng: 3.328, lat : 43.7067 }},
      { title: ' Halles Lodeve ' , position: {lng: 3.3212, lat : 43.7305 }},
      { title: ' Hotel Albouy ' , position: {lng: 3.3197117, lat : 43.7309863 }},
      { title: ' Hotel Benoit Prunarede ' , position: {lng: 3.4574580999999, lat : 43.6627733 }},
      { title: ' Hotel Fleury ' , position: {lng: 3.3199, lat : 43.7318 }},
      { title: ' Hotel Salze ' , position: {lng: 3.3211541175842, lat : 43.7304914555 }},
      { title: ' Maison ' , position: {lng: 3.3188577, lat : 43.7324934 }},
      { title: ' Maison ' , position: {lng: 3.4583778, lat : 43.6626109 }},
      { title: ' Maison ' , position: {lng: 3.320889, lat : 43.731032 }},
      { title: ' Maison ' , position: {lng: 3.31782, lat : 43.73217 }},
      { title: ' Mausolee Romain Lodeve ' , position: {lng: 3.294842, lat : 43.73272 }},
      { title: ' Monument Morts Lodeve ' , position: {lng: 3.3173, lat : 43.7328 }},
      { title: ' Pont Montifort ' , position: {lng: 3.3175, lat : 43.7301 }},
      { title: ' Eglise Sainte-Cecile Loupian ' , position: {lng: 3.6162, lat : 43.4479 }},
      { title: ' Eglise Saint-Hippolyte Loupian ' , position: {lng: 3.6145, lat : 43.4492 }},
      { title: ' Maison ' , position: {lng: 3.6137429, lat : 43.449103 }},
      { title: ' Villa Gallo-romaine Loupian ' , position: {lng: 3.6146, lat : 43.441 }},
      { title: ' Chapelle Notre-Dame Nize ' , position: {lng: 3.224597, lat : 43.710224 }},
      { title: ' Chapelle Saint-Georges Lunas ' , position: {lng: 3.198361, lat : 43.705938 }},
      { title: ' Eglise Saint-Pancrace Lunas ' , position: {lng: 3.1937384605408, lat : 43.70669384613 }},
      { title: ' Chateau Gaucelm ' , position: {lng: 4.134287238121, lat : 43.674727842198 }},
      { title: ' Maison Philippe Bel Lunel ' , position: {lng: 4.1344, lat : 43.6743 }},
      { title: ' Chateau Lunel-Viel ' , position: {lng: 4.092962, lat : 43.679442 }}
    ];

    const markerPosition={ lat:43.476283, lng:3.277395 };

    return (
      <div>

        <MyMap
          isMarkerShown={ this.state.isMarkerShown}
          onMarkerClick={ this.handleMarkerClick}
          markerPosition={markerPosition}
          placesOfInterest={PointsOfInterest}
        />
      </div>
    );
  }
}

export default App;
