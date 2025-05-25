import {
  CartesianGrid as CartesianGridRecharts,
  CartesianGridProps,
} from "recharts";

interface Props extends CartesianGridProps {}
const CartesianGrid = ({ ...props }: Props) => {
  return (
    <CartesianGridRecharts stroke="var(--d3)" strokeDasharray="3" {...props} />
  );
};

export default CartesianGrid;
