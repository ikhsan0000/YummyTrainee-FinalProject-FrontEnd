import React, { useContext, useEffect, useState } from "react";
import { Box, Text } from "../../components/Theme";
import { Alert, BackHandler, Dimensions, Image } from "react-native";
import { Card } from "react-native-elements";
import { useTheme } from "@shopify/restyle";
import ProductCard from "./ProductCard";
import { Button, Header } from "../../components";
import { RectButton } from "react-native-gesture-handler";
import RoundedIcon from "../../Authentication/components/RoundedIcon";
import { CartContext } from "../../services/cart/cart.context";
import CheckboxGroup from "../EditProfile/CheckboxGroup";
import Modal from "../../components/Modal";
import ModalBox from "../../components/Modal";
import ModalButtons from "./ModalButtons";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";
import ModalWishlistButtons from "./ModalWishlistButton";
import { ProfileContext } from "../../services/profile/profile.context";
import WishlistButton from "../../components/WishlistButton";

const { width, height } = Dimensions.get("window");

const ProductDetail = ({ navigation, route }: any) => {
  const { product, favorite } = route.params;
  const { profile, currentUserProfile }: any = useContext(ProfileContext);
  const [currentFav, setCurrentFav] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const baseImgUrl = "http://192.168.0.172:3000/products/images/";
  const imgUrl = product.productImage.map((img) => {
    return baseImgUrl + img.fileName;
  });
  const theme = useTheme();

  // Set current favorites
  useEffect(async () => {
    await currentUserProfile().then(() => {
      setCurrentFav(profile.userFavorites.product);
    });
  }, []);

  // Check current favorite
  useEffect(() => {
    currentFav && currentFav.forEach((favoriteItem:any) => {
      if (favoriteItem.id == product.id) {
        setIsFavorited(true);
      }
    });
  }, [currentFav])

  // add to cart modal
  const closeModal = () => {
    setShowModal(false);
  };
  const [showModal, setShowModal] = useState(false);

  // wishlist modal
  const closeModalWishlist = () => {
    setShowModalWishlist(false);
  };
  const [showModalWishlist, setShowModalWishlist] = useState(false);
  const [wishlistLabel, setWishlistLabel] = useState('')

  // Cart Context
  const { addToCart, isLoading }: any = useContext(CartContext);
  // Profile Context
  const { addToFavorite, removeFromFavorite }: any = useContext(ProfileContext);

  let currentProductToCart = {
    productId: product.id,
    quantity: quantity,
    size: product.sizes[0].name,
    image: product.productImage[0].fileName,
  };

  const subtractQty = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity((last) => last - 1);
  };

  const addQty = () => {
    setQuantity((last) => last + 1);
  };

  const onSizeChange = (size: string) => {
    // setSelectedSize(size)
    currentProductToCart.size = size;
  };

  const onSubmit = async () => {
    await addToCart(currentProductToCart)
      .then(() => setShowModal(true))
      .catch((err: any) => {
        console.log(err);
      });
  };

  const onAddToWishlist = async () => {
    if(isFavorited){
      await removeFromFavorite(product.id)
      .then(() => {
        setWishlistLabel('Removed from Wishlist')
        setShowModalWishlist(true)
      })
      .catch((err: any) => {
        console.log(err);
        navigation.dispatch(
          StackActions.replace("Authentication", { screen: "Login" })
        );
      });
    }
    else{
      await addToFavorite(product.id)
        .then(() => {
          setWishlistLabel('Added to Wishlist')
          setShowModalWishlist(true)
        })
        .catch((err: any) => {
          console.log(err);
          navigation.dispatch(
            StackActions.replace("Authentication", { screen: "Login" })
          );
        });
    }
  };

  const formattedSizes = product.sizes.map(({ name }: any) => {
    return { value: name, label: name };
  });

  const backNavigation = () => {
    if (favorite) {
      navigation.navigate("FavouriteOutfits");
    } else {
      navigation.navigate("OutfitIdeas");
    }
  };

  // Back Button Handler
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = (): any => {
        if (favorite) {
          navigation.navigate("FavouriteOutfits");
          return true;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <Box flex={1} backgroundColor="white">
      <ModalBox
        trigger={showModal}
        closeModal={closeModal}
        label="Item added to cart"
        buttons={<ModalButtons />}
      />
      <ModalBox
        trigger={showModalWishlist}
        closeModal={closeModalWishlist}
        label={wishlistLabel}
        buttons={<ModalWishlistButtons closeModal={closeModalWishlist} />}
      />
      <Box
        zIndex={99}
        position="absolute"
        flexDirection="row"
        justifyContent="space-between"
        marginTop="s"
        alignItems="center"
      >
        <RectButton
          rippleColor="rgba(0,0,0,0)"
          onPress={() => backNavigation()}
        >
          <RoundedIcon
            name="arrow-left"
            color="white"
            backgroundColor="transparent"
            size={40}
            iconRatio={0.5}
          ></RoundedIcon>
        </RectButton>
      </Box>

      {/* <Image
        style={{ flex: 0.4 }}
        resizeMode="cover"
        source={{ uri: `http://192.168.0.172:3000/products/images/${imgUrl}` }}
      /> */}
      <Box flex={0.4}>
        <SliderBox images={imgUrl} sliderBoxHeight={height * 0.4} imageLoader />
      </Box>
      <Box padding="m" flex={0.4}>
        <Text variant="title2">{product.name}</Text>
        {/* <Box flex={1} width={100} backgroundColor="secondary"/>  */}
        <Text variant="title1">$ {product.price}</Text>

        <Text variant="body" color="darkGrey" fontSize={14}>
          Brand : {product.brand.name}
        </Text>
        <Text variant="body" color="darkGrey" fontSize={14}>
          Category : {product.category.name}
        </Text>
        <Box flexDirection="row" paddingVertical="s" alignItems="center">
          <Text variant="title3">sizes available: </Text>
          <Box marginLeft="m" />
          <CheckboxGroup
            options={formattedSizes}
            radio
            defaultSelected={product.sizes[0].name}
            callback={onSizeChange}
          />
        </Box>

        <Box flex={0.01} backgroundColor="primary" />
        <Text variant="title3" color="darkGrey" fontSize={14}>
          Seller's description:
        </Text>
        <Text variant="body">{product.description}</Text>
      </Box>

      <Box
        flex={0.2}
        justifyContent="space-around"
        alignItems="center"
        // backgroundColor="violet"
      >
        <Box
          alignSelf="stretch"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="m"
        >
          <Text variant="body">Quantity: </Text>
          <Box flexDirection="row" alignItems="center">
            <RectButton
              rippleColor="rgba(0,0,0,0)"
              onPress={() => subtractQty()}
            >
              <RoundedIcon
                iconRatio={0.55}
                name="minus"
                size={27}
                color="white"
                backgroundColor="primary"
              />
            </RectButton>

            <Box paddingHorizontal="s">
              <Text variant="body">{quantity}</Text>
            </Box>

            <RectButton rippleColor="rgba(0,0,0,0)" onPress={() => addQty()}>
              <RoundedIcon
                iconRatio={0.55}
                name="plus"
                size={27}
                color="white"
                backgroundColor="primary"
              />
            </RectButton>
          </Box>
        </Box>

        <Box flexDirection="row">
          <WishlistButton
            icon={isFavorited ? "heart" : "heart-o"}
            variant="secondary"
            label="Wishlist "
            style={{ width: width * 0.3 }}
            isLoading={isLoading}
            onPress={() => onAddToWishlist()}
          />
          <Box style={{ width: width * 0.1 }} />
          <Button
            icon="shopping-cart"
            variant="primary"
            label="Add to Cart"
            style={{ width: width * 0.5 }}
            isLoading={isLoading}
            onPress={() => onSubmit()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
