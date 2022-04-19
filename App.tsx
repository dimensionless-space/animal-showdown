import { Provider } from "react-redux";
import { store, interactor } from "./src/app/interactor";
import Game from "./src/ui/components/Game";
import { Interax } from "./src/framework/interax";
import { useState } from "react";
import Storybook from "./storybook";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { basicBoard } from "./src/content/basicBoard";
import { BoardSetContext } from "./src/content/boardSetContext";
// import DevMenu from "react-native-dev-menu";

export default function App() {
  const [storybookActive, setStorybookActive] = useState(false);
  // const toggleStorybook = useCallback(
  //   () => setStorybookActive((active) => !active),
  //   []
  // );

  // useEffect(() => {
  //   if (__DEV__) {
  //     // eslint-disable-next-line @typescript-eslint/no-var-requires
  //     DevMenu.addItem("Toggle Storybook", toggleStorybook);
  //   }
  // }, [toggleStorybook]);

  if (storybookActive) {
    return <Storybook />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E5AD1A" }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <Interax.Provider value={interactor}>
            <BoardSetContext.Provider value={basicBoard}>
              <Game />
            </BoardSetContext.Provider>
          </Interax.Provider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
