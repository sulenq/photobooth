const onRenderCallback: any = (
  id: string,
  phase: "mount" | "update",
  actualDuration: number
) => {
  console.log(
    `[Profiler] ${id} took ${actualDuration.toFixed(2)}ms to render (${phase})`
  );
};

export default onRenderCallback;
