import { getFilteredPlants, setFilteredPlants } from "../features/filteredPlantsSlice";
import { setSelectedTag } from "../features/tagsSlice";
import { useAppDispatch } from "../shared/store/hooks";

interface TagProps {
  tag: string;
};

export const Tag = (props: TagProps) => {

  const dispatch = useAppDispatch();

  const handleTagClick = (tag: string) => {
    dispatch(setSelectedTag(tag));
    dispatch(getFilteredPlants(tag));
  };

  return (
    <div className="tag"
      onClick={() => handleTagClick(props.tag)}
    >
      {props.tag}
    </div>
  );
}
