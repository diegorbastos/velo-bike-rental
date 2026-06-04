// ============================================================
// Repositório de imagens (Requisito do projeto)
// Centraliza o import de todas as imagens usadas pelo site.
// Os arquivos JSON referenciam apenas a CHAVE da imagem; este
// módulo resolve a chave para o asset final empacotado pelo Vite.
// ============================================================
import bikeCity from "@/features/velo/assets/bike-city.jpg";
import bikeElectric from "@/features/velo/assets/bike-electric.jpg";
import bikeMountain from "@/features/velo/assets/bike-mountain.jpg";
import veloHero from "@/features/velo/assets/velo-hero.jpg";
import station from "@/features/velo/assets/station.jpg";
import rider from "@/features/velo/assets/rider.jpg";
import unavailable from "@/features/velo/assets/unavailable.jpg";

export const images = {
  "bike-city": bikeCity,
  "bike-electric": bikeElectric,
  "bike-mountain": bikeMountain,
  "velo-hero": veloHero,
  "station": station,
  "rider": rider,
  "unavailable": unavailable,
};

export const getImage = (key) => images[key] ?? unavailable;
