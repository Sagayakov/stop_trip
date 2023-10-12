import data from "../../../db.json";
import { Cart } from "../../entities/popularAdverts";
import { ArrowLeft14x7 } from "../../shared/ui/icons/icons-tools/ArrowLeft14x7";
import { ArrowRight14x7 } from "../../shared/ui/icons/icons-tools/ArrowRight14x7";
import "./popularAdverts.scss";

export const PopularAdverts = () => {
  return (
    <div className="popular-adverts">
      <div className="popular-adverts-wrapper">
        <h3>Последние объявления</h3>
        <div className="adverts-list">
          {data.map((elem) => (
            <Cart
              description={elem.description}
              id={elem.id}
              image={elem.image}
              price={elem.price}
              time={elem.time}
              key={elem.id}
            />
          ))}
        </div>
        <div className="pagination">
          <ArrowLeft14x7
            color="#BCBCBC"
            style={{ marginRight: "12px", cursor: "pointer" }}
          />
          <ArrowRight14x7
            color="#1C1C1E"
            style={{ marginLeft: "12px", cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};
