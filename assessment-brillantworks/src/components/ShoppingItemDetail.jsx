import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const ShoppingItemDetail = ({ item }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{item.shoppingItem.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
        <div>{item.shoppingItem.premium.individual}</div>
        <div>{item.shoppingItem.premium.team}</div>
      </IonContent>
    </IonPage>
  );
};

export default ShoppingItemDetail;
