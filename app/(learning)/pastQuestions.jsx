import AppButton from "@/components/Buttons/AppButton";
import SearchInput from "@/components/Forms/SearchInput";
import CoursesCategories from "@/components/Reusables/CoursesCategories";
import NameBar from "@/components/Reusables/NameBar";
import PastCard from "@/components/Reusables/PastCard";
import SchoolCard from "@/components/Reusables/SchoolCard";
import TextHeader from "@/components/Reusables/TextHeader";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { FlatList, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const learnCardsData = Array.from({ length: 6 }, (_, i) => ({
  id: `${i + 1}`,
}));

const schoolsData = [
  {
    id: "1",
    name: "Yale University",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546375/ku_damdnc.png",
  },
  {
    id: "2",
    name: "Harvard University",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546374/col_cvfgux.png",
  },
  {
    id: "3",
    name: "Stanford University",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546374/lux_kp3jef.png",
  },
  {
    id: "4",
    name: "MIT",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546375/utah_iybi75.png",
  },
  {
    id: "5",
    name: "Oxford University",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546375/america_jcf9u0.png",
  },
  {
    id: "6",
    name: "Cambridge University",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546374/cal_nvs0aj.png",
  },
  {
    id: "7",
    name: "MIT",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546374/col_cvfgux.png",
  },
  {
    id: "8",
    name: "Oxford University",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546374/mich_gpl3cy.png",
  },
  {
    id: "9",
    name: "Cambridge University",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546374/corn_bgwxgf.png",
  },
  {
    id: "10",
    name: "MIT",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546374/col_cvfgux.png",
  },
  {
    id: "11",
    name: "Oxford University",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546374/mich_gpl3cy.png",
  },
  {
    id: "12",
    name: "Cambridge University",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546374/corn_bgwxgf.png",
  },
];

const PastQuestions = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["90%"], []);

  const filterCourses = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.4}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="bg-[#F9FAFB] flex-1">
        <View className="pt-16 flex-1">
          <NameBar courses filter={filterCourses} />
          <View>
            <CoursesCategories />
          </View>
          <View className="px-6 flex-1">
            <FlatList
              data={learnCardsData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <PastCard id={item.id} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 24 }}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
          </View>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: "#F9FAFB" }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView className="flex-1 px-6">
            <TextHeader
              content="Filter by"
              textStyles="text-[#030303] text-[18px] text-center mb-4"
            />
            <View className="mb-4">
              <SearchInput />
            </View>
            <View className="max-h-[450px]">
              <FlatList
                data={schoolsData}
                keyExtractor={(item) => item.id}
                numColumns={3}
                renderItem={({ item }) => (
                  <SchoolCard name={item.name} image={item.image} />
                )}
                columnWrapperStyle={{ gap: 12 }}
                contentContainerStyle={{ gap: 12, paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View className="px-6 pb-6 bg-[#F9FAFB] pt-5">
              <AppButton
                btnLabel={`Save changes`}
                moreStyles={`bg-[#13E0A0]`}
                textStyles={"text-[14px] text-[#000E3A]"}
              />
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default PastQuestions;
