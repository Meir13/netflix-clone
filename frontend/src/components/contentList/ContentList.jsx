import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "./ContentList.scss";
import { ListItem } from "../listItem/ListItem";

const responsive = {
  superLargeDesktop5: {
    breakpoint: { max: 4000, min: 2100 },
    items: 8,
  },
  superLargeDesktop4: {
    breakpoint: { max: 2100, min: 1875 },
    items: 7,
  },
  superLargeDesktop3: {
    breakpoint: { max: 1875, min: 1650 },
    items: 6,
  },
  superLargeDesktop2: {
    breakpoint: { max: 1650, min: 1425 },
    items: 6,
  },
  superLargeDesktop: {
    breakpoint: { max: 1425, min: 1200 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1200, min: 900 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 900, min: 370 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 370, min: 0 },
    items: 1,
  },
};

export const ContentList = ({ list }) => {
  return (
    <div className="content-lists-container">
      <h2>{list.title}</h2>

      <Carousel
        className="carousel"
        itemClass="carousel-item"
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={[]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {list.content.map((item, i) => (
          <ListItem item={item} key={i}></ListItem>
        ))}
      </Carousel>
    </div>
  );
};
