import {
  ProgressCircleRing,
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "../ui/progress-circle";

const TaskProgress = ({ progress }: { progress: number }) => {
  const colors = (progress: number): string => {
    if (progress === 100) return "p.500";
    if (progress > 80) return "green.500";
    if (progress > 50) return "yellow.500";
    if (progress > 30) return "orange.500";
    return "red";
  };

  return (
    <ProgressCircleRoot value={progress} size={"xl"}>
      <ProgressCircleValueText fontWeight={"bold"} />
      <ProgressCircleRing color={colors(progress)} />
    </ProgressCircleRoot>
  );
};

export default TaskProgress;
