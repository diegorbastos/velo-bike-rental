// Centraliza o import de todas as imagens usadas pelo site.
// Os arquivos JSON referenciam apenas a CHAVE da imagem; 

import bikeCity from "@/features/velo/assets/bike-city.jpg";
import bikeElectric from "@/features/velo/assets/bike-electric.jpg";
import bikeMountain from "@/features/velo/assets/bike-mountain.jpg";
import veloHero from "@/features/velo/assets/velo-hero.jpg";
import station from "@/features/velo/assets/station.jpg";
import pracaSe from "@/features/velo/assets/praca-se.jpg";
import posto9 from "@/features/velo/assets/posto-9.jpg";
import centroHistCuritiba from "@/features/velo/assets/centro-hist-curitiba.jpg";
import orlaGuaiba from "@/features/velo/assets/orla-guaiba.jpg";
import pracaDaLiberdade from "@/features/velo/assets/praca-da-liberdade.jpg";
import pelourinho from "@/features/velo/assets/pelourinho.jpg";
import rider from "@/features/velo/assets/rider.jpg";
import unavailable from "@/features/velo/assets/unavailable.jpg";

export const images = {
  "bike-city": bikeCity,
  "bike-electric": bikeElectric,
  "bike-mountain": bikeMountain,
  "velo-hero": veloHero,
  "station": station,
  "praca-se": pracaSe,
  "posto-9": posto9,
  "centro-hist-curitiba": centroHistCuritiba,
  "orla-guaiba": orlaGuaiba,
  "praca-da-liberdade": pracaDaLiberdade,
  "pelourinho": pelourinho,
  "rider": rider,
  "unavailable": unavailable,
};

export const getImage = (key) => images[key] ?? unavailable;

const stationImageByName = {
  "Praça da Sé": "praca-se",
  "Posto 9": "posto-9",
  "Centro Histórico": "centro-hist-curitiba",
  "Orla do Guaíba": "orla-guaiba",
  "Praça da Liberdade": "praca-da-liberdade",
  "Pelourinho": "pelourinho",
};

export const getStationImageKey = (stationName) => stationImageByName[stationName] ?? "station";
