import { PlantList } from '../widgets/PlantList';
import "./PlantsPage.scss";

export const PlantsPage = () => {
  return (
    <div className="main plants-page">
      <h1>Plants for your home garden</h1>
      <PlantList />    
    </div>
  )
};
