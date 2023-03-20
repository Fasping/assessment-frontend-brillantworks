import { useState, useEffect } from "react";
import {
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  IonSpinner,
} from "@ionic/react";

const ShoppingList = () => {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.winnerheads.com/api/marketplace/getMarketplaceByIdString/winnerheads"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const shoppingItems = data.space.content.filter(
          (item) => item.shoppingItem
        );
        setShoppingItems(shoppingItems);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!shoppingItems) {
    return <IonSpinner name="dots"></IonSpinner>;
  }

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
            <IonList>
              {item.shoppingItem.price
                .filter((price) => price.currencyCode === "SEK")
                .map((price) => (
                  <IonItem key={price.currencyCode}>
                    <IonLabel>
                      {price.value} {price.currencyCode}/MONTH
                    </IonLabel>
                  </IonItem>
                ))}
            </IonList>
          </IonRouterLink>
        </IonItem>
      ))}
    </IonPage>
  );
};

export default ShoppingList;
