import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useDebounce } from "../hooks/useDebounce";

describe("useDebounce", () => {

  // Use fake timers so tests don't actually wait 300ms
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("does not update before the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "hello" } }
    );

    rerender({ value: "world" });

    // Advance time by 200ms — not enough to trigger the debounce
    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("hello"); // still the old value
  });

  it("updates after the delay has passed", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "hello" } }
    );

    rerender({ value: "world" });

    // Advance time past the delay
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("world"); // now updated
  });

  it("resets the timer if value changes before delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "hello" } }
    );

    rerender({ value: "wor" });
    act(() => vi.advanceTimersByTime(200)); // 200ms in — not fired yet

    rerender({ value: "world" });
    act(() => vi.advanceTimersByTime(200)); // 200ms more — timer reset, still not fired

    expect(result.current).toBe("hello"); // still original

    act(() => vi.advanceTimersByTime(100)); // now 300ms since last change
    expect(result.current).toBe("world"); // finally updated
  });
});