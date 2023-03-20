import { useState, useEffect } from "react";
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
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
    return <IonSpinner name="dots"></IonSpinner>;
  }

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>{shoppingItem.name_en}</IonTitle>
      </IonToolbar>
      <IonContent>
        <div>{shoppingItem.description_en}</div>
        <IonList>
          {shoppingItem.price
            .filter((price) => price.currencyCode === "SEK")
            .map((price) => (
              <IonItem>
                <IonLabel key={price.currencyCode}>
                  <IonButton key={price.currencyCode}>
                    {price.value} {price.currencyCode}/MONTH
                  </IonButton>
                </IonLabel>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ShoppingItemDetail;
