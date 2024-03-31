import { roundDown } from "../miscellanous/round-figures";

function calculateMinimumAmountReceived(initialValue, slippageTolerance) {
  const percentageSlippage = slippageTolerance / 100;
  const maxSlippage = initialValue * percentageSlippage;

  const minimumAmountReceived = initialValue - maxSlippage;
  const roundedValue = roundDown(minimumAmountReceived, 2);
  return { minimumAmountReceived, roundedValue };
}

export default calculateMinimumAmountReceived;
