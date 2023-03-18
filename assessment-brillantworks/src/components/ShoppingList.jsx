import { useState, useEffect } from "react";
import { IonItem, IonPage, IonRouterLink } from "@ionic/react";

const ShoppingList = () => {
  const [shoppingItems, setShoppingItems] = useState([]);

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

  return (
    <IonPage>
      {shoppingItems.map((item) => (
        <IonItem key={item.shoppingItem.id}>
          <IonRouterLink
            routerDirection="forward"
            routerLink={`/shopping-item/${item.shoppingItem.id}`}
          >
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
    </IonPage>
  );
};

export default ShoppingList;
