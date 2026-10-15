import { useCounter } from "@/hooks/use-counter";

interface CounterDisplayProps {
  value: string;
  className?: string;
}

export const CounterDisplay = ({ value, className = "" }: CounterDisplayProps) => {
  const { count, ref } = useCounter({ target: value });
  return <div ref={ref} className={className}>{count}</div>;
};
