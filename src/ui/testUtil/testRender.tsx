import {
  RenderAPI,
  RenderOptions,
  render as rtlRender,
} from "@testing-library/react-native";
import { JSXElementConstructor, ReactElement } from "react";
import { createAppInteractor } from "../../app/interactor";
import { Interax } from "../../framework/interax";
import { Provider } from "react-redux";

export function testRender(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: RenderOptions | undefined
): RenderAPI {
  const interactor = createAppInteractor();
  return rtlRender(
    <Interax.Provider value={interactor}>
      <Provider store={interactor.reduxStore}>{component}</Provider>
    </Interax.Provider>,
    options
  );
}
