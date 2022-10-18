import { Tag } from "./Tag";

interface TagsListProps {
  tagsArray: string[];
};

export const TagsList = (props: TagsListProps) => {

  return (
    <div className="tags-container">
      <div className="tags__title explanation">
        Tags
      </div>
      <div className="tags__explanation">
        Click on a tag to see other plants with the same tag
      </div>
      <div className="tags__wrapper">
        {(props.tagsArray).map((tag: string, idx: number) => (
          <Tag
            key={idx}
            tag={tag}
            />
        ))}
      </div>
    </div>
  );
}