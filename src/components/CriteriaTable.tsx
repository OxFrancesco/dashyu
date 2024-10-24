import { Minus, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { criteriaData } from '@/lib/data';
import { type CriteriaState } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface CriteriaTableProps {
  criteriaState: CriteriaState;
  onStateChange: (state: CriteriaState) => void;
}

export function CriteriaTable({ criteriaState, onStateChange }: CriteriaTableProps) {
  const handleIncrement = (id: string) => {
    onStateChange({
      ...criteriaState,
      [id]: (criteriaState[id] || 0) + 1,
    });
  };

  const handleDecrement = (id: string) => {
    if (criteriaState[id] > 0) {
      onStateChange({
        ...criteriaState,
        [id]: criteriaState[id] - 1,
      });
    }
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    onStateChange({
      ...criteriaState,
      [id]: checked ? 1 : 0,
    });
  };

  const isCheckboxCriteria = (id: string) => {
    return ['team_doxxed', 'team_anon', 'audited', 'non_audited'].includes(id);
  };

  // Mobile view component
  const MobileView = () => (
    <div className="space-y-4 md:hidden">
      {criteriaData.map((criteria) => (
        <div
          key={criteria.id}
          className="rounded-lg border bg-card p-4 shadow-sm"
        >
          <div className="mb-2 flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-left font-medium">
                  {criteria.name}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{criteria.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span
              className={
                criteria.points >= 0 ? 'text-green-500' : 'text-red-500'
              }
            >
              {formatNumber(criteria.points)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Count:</span>
              <span>{criteriaState[criteria.id] || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              {isCheckboxCriteria(criteria.id) ? (
                <Checkbox
                  checked={Boolean(criteriaState[criteria.id])}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(criteria.id, checked as boolean)
                  }
                  className="h-6 w-6"
                />
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDecrement(criteria.id)}
                    disabled={!criteriaState[criteria.id]}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleIncrement(criteria.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 text-right">
            <span
              className={
                criteria.points * (criteriaState[criteria.id] || 0) >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            >
              Total: {formatNumber(criteria.points * (criteriaState[criteria.id] || 0))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop view component
  const DesktopView = () => (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Criteria</TableHead>
            <TableHead className="min-w-[100px]">Points</TableHead>
            <TableHead className="min-w-[80px]">Count</TableHead>
            <TableHead className="min-w-[100px]">Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {criteriaData.map((criteria) => (
            <TableRow key={criteria.id}>
              <TableCell className="font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-left">
                      {criteria.name}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{criteria.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <span
                  className={
                    criteria.points >= 0 ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {formatNumber(criteria.points)}
                </span>
              </TableCell>
              <TableCell>{criteriaState[criteria.id] || 0}</TableCell>
              <TableCell>
                <span
                  className={
                    criteria.points * (criteriaState[criteria.id] || 0) >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {formatNumber(criteria.points * (criteriaState[criteria.id] || 0))}
                </span>
              </TableCell>
              <TableCell className="text-right">
                {isCheckboxCriteria(criteria.id) ? (
                  <div className="flex justify-end">
                    <Checkbox
                      checked={Boolean(criteriaState[criteria.id])}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(criteria.id, checked as boolean)
                      }
                      className="h-6 w-6"
                    />
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDecrement(criteria.id)}
                      disabled={!criteriaState[criteria.id]}
                      className="h-9 w-9"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleIncrement(criteria.id)}
                      className="h-9 w-9"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}