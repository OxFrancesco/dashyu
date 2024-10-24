import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatNumber } from '@/lib/utils';

interface AdminVoteProps {
  value: number;
  onChange: (value: number) => void;
}

export function AdminVote({ value, onChange }: AdminVoteProps) {
  const handleIncrement = () => {
    if (value < 2) {
      onChange(Math.min(2, value + 0.5));
    }
  };

  const handleDecrement = () => {
    if (value > -2) {
      onChange(Math.max(-2, value - 0.5));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleDecrement}
            disabled={value <= -2}
            className="h-12 w-12"
          >
            <Minus className="h-6 w-6" />
          </Button>
          <span className="min-w-[80px] text-center text-2xl font-bold">
            {formatNumber(value)}
          </span>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleIncrement}
            disabled={value >= 2}
            className="h-12 w-12"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <Slider
        value={[value]}
        min={-2}
        max={2}
        step={0.5}
        onValueChange={([newValue]) => onChange(newValue)}
        className="py-4"
      />
    </div>
  );
}