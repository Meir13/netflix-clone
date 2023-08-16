import "./ListItem.scss";

export const ListItem = ({ item }) => {
  return (
    <div className="list-item">
      <img src={item.img}></img>
      {/* <img src={item.imgTitle} className="image-title"></img> */}
    </div>
  );
};
