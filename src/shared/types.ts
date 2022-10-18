export interface PlantCardProps {
  id: string;
  title: string,
  description: string,
  images: string[],
  light_settings: {
    blue: number[],
    farred: number[],
    red: number[],
    white: number[]
  },
  price: number,
  tags: string[],
}

