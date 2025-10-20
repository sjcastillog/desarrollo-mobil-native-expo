import React from "react";
import { Image, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface PropsI {
  images: string[];
}

const ProductImages = ({ images }: PropsI) => {
  return (
    <>
      {images.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/no-product-image.png")}
            style={{ width: 300, height: 300 }}
          />
        </View>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: 300,
                height: 300,
                marginHorizontal: 7,
                borderRadius: 5,
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default ProductImages;
