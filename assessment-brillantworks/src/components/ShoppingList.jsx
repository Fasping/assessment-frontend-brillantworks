import { useState, useEffect } from "react";
import { IonItem, IonRouterLink } from "@ionic/react";
import { useHistory } from "react-router";

const ShoppingList = () => {
  const [shoppingItems, setShoppingItems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.winnerheads.com/api/marketplace/getMarketplaceByIdString/winnerheads"
      );
      const data = await response.json();
      const shoppingItems = data.space.content.filter(
        (item) =>
          item.shoppingItem &&
          item.shoppingItem.price.some((price) => price.currencyCode === "SEK")
      );
      setShoppingItems(shoppingItems);
    };

    fetchData();
  }, []);

  const handleItemClick = (itemId) => {
    history.push(`/shopping-item/${itemId}`);
  };

  return (
    <>
      {shoppingItems.map((item) => (
        <IonItem key={item.shoppingItem.id}>
          <IonRouterLink onClick={() => handleItemClick(item.shoppingItem.id)}>
            <h2>{item.shoppingItem.name}</h2>
            <div>{item.shoppingItem.description}</div>
            <ul>
              {item.shoppingItem.price
                .filter((price) => price.currencyCode === "SEK")
                .map((price) => (
                  <li key={price.currencyCode}>
                    {price.value} {price.currencyCode}
                  </li>
                ))}
            </ul>
          </IonRouterLink>
        </IonItem>
      ))}
    </>
  );
};

export default ShoppingList;
