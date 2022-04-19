import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
  getRelativeCoords,
  runOnJS,
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";
import { EventEmitter } from "events";

export function useDrag() {
  const context = useContext(DragAndDropContext);
  const ref = useAnimatedRef<any>();
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const f = (absolute: any) => {
    context.handleDrop(absolute);
  };

  const gesture = useMemo(() => {
    return Gesture.Pan()
      .onBegin(() => {
        isPressed.value = true;
      })
      .onUpdate((e) => {
        // const h = context.isHovering;
        // h.value = true;
        const f = context.doHoverings;
        f();
        // for (const isHovering of context.isHoverings) {
        //   // isHovering.value = true;
        //   isHovering();
        // }
        offset.value = {
          x: e.translationX + start.value.x,
          y: e.translationY + start.value.y,
        };
      })
      .onEnd((event) => {
        runOnJS(f)({ x: event.absoluteX, y: event.absoluteY });
      })
      .onFinalize(() => {
        offset.value = { x: 0, y: 0 };
        isPressed.value = false;
      });
  }, []);
  return { ref, gesture, isPressed, offset };
}

export function useDrop(onDrop: any) {
  const context = useContext(DragAndDropContext);
  const ref = useAnimatedRef<any>();
  const isHovering = useSharedValue(false);
  function ff() {
    "worklet";
    isHovering.value = true;
  }
  // const ff = () => (isHovering.value = true);
  context.isHoverings.push(ff);
  useEffect(() => {
    return context.addListener(ref, () => {
      // isHovering.value = true;
      onDrop();
    });
  }, [onDrop]);
  return {
    ref,
    isHovering,
  };
}

export class DragAndDropManager {
  private eventEmitter: EventEmitter = new EventEmitter();

  constructor() {
    this.eventEmitter.setMaxListeners(1000000);
    const h = [];
    this.isHoverings = h;
    function fh() {
      "worklet";
      for (const isHovering of h) {
        // isHovering.value = true;
        isHovering();
      }
    }
    this.doHoverings = fh;
  }

  // doHoverings() {
  // }

  addListener(aref: any, listener: any) {
    function cb(absolute: any) {
      // listener(getRelativeCoords(aref, absolute.x, absolute.y));
      listener(absolute.x, absolute.y);
    }

    this.eventEmitter.on("drop", cb);
    return () => {
      this.eventEmitter.off("drop", cb);
    };
  }

  handleDrop(absolute: { x: number; y: number }) {
    this.eventEmitter.emit("drop", absolute);
  }
}

export const DragAndDropContext = createContext(new DragAndDropManager());
