import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
// Need to add types for lodash
import { filter } from "lodash";
import { TgetRetailersReturn, getRetailers } from "./src/api/retailer";

export default function App() {
  const [isLoadingRetailers, setIsLoadingRetailers] = useState(true);
  const [retailersDetailsData, setRetailersDetailData] =
    useState<null | TgetRetailersReturn>(null);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    void getRetailers({ pageSize: 200 }).then((requestData) => {
      setIsLoadingRetailers(false);
      setRetailersDetailData(requestData);
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View style={{ marginHorizontal: 30 }}>
        <TextInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Search"
          style={styles.searchInput}
        ></TextInput>
      </View>
      {retailersDetailsData && (
        <FlatList
          data={
            searchValue === ""
              ? retailersDetailsData.items
              : filter(
                  retailersDetailsData.items,
                  function (item: TgetRetailersReturn["items"][0]) {
                    return (
                      item.name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) > -1
                    );
                  }
                )
          }
          renderItem={ItemView}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const ItemView = ({ item }: { item: TgetRetailersReturn["items"][0] }) => {
  return (
    // Single Comes here which will be repeatative for the FlatListItems
    <View style={styles.item}>
      <View>
        <Image
          source={{
            uri:
              "https://cards.wagesplitter-dev.com/api/Retailer/logo/" +
              item.logoUri,
          }}
          style={styles.logo}
        ></Image>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Text style={styles.fontMain}>Earn {item.rewardPercent}%</Text>
        <Text style={styles.fontSmall}>
          on spend over ${item.rewardThreshold}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    marginHorizontal: 30,
    paddingVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    borderBottomColor: "#C8C8C8",
    borderBottomWidth: 1,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  fontMain: {
    fontWeight: "800",
    fontSize: 24,
  },
  fontSmall: {
    color: "#4682B4",
  },
  searchInput: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
