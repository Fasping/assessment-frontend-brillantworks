import { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const ShoppingItemDetail = ({ match }) => {
  const item = match.params.id;

  const [shoppingItem, setShoppingItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.winnerheads.com/api/shopitems/${item}`
      );
      const data = await response.json();
      console.log(data);
      setShoppingItem(data);
    };

    fetchData();
  }, [item]);

  if (!shoppingItem) {
    return <div>Loading...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{shoppingItem.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>{shoppingItem.description}</div>
        <ul>
          {shoppingItem.price
            .filter((price) => price.currencyCode === "SEK")
            .map((price) => (
              <li key={price.currencyCode}>
                {price.value} {price.currencyCode}
              </li>
            ))}
        </ul>
        {/* <div>{shoppingItem.premium.individual}</div>
        <div>{shoppingItem.premium.team}</div> */}
      </IonContent>
    </IonPage>
  );
};

export default ShoppingItemDetail;
