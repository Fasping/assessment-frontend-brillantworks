import { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonHeader,
  IonLabel,
} from "@ionic/react";

const ShoppingItemDetail = ({ match }) => {
  const item = match.params.id;

  const [shoppingItem, setShoppingItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.winnerheads.com/api/shopitems/${item}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShoppingItem(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [item]);

  if (!shoppingItem) {
    return <IonSpinner name="dots"></IonSpinner>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle color="warning">{shoppingItem.name_en}</IonCardTitle>
            <IonCardSubtitle>{shoppingItem.description_en}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
      </IonHeader>
      <IonContent>
        <IonList>
          {shoppingItem.price
            .filter((price) => price.currencyCode === "SEK")
            .map((price, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <IonButton color="danger">
                    {price.value} {price.currencyCode}/MONTH
                  </IonButton>
                </IonLabel>
              </IonItem>
            ))}
        </IonList>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Why get Premium?</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              <IonItem>Add free</IonItem>
              <IonItem>Item 2</IonItem>
              <IonItem>Item 3</IonItem>
              <IonItem>Item 4</IonItem>
              <IonItem>Item 5</IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ShoppingItemDetail;
