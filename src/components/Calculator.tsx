import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Calculator as CalculatorIcon, RotateCcw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CriteriaTable } from '@/components/CriteriaTable';
import { AdminVote } from '@/components/AdminVote';
import { criteriaData } from '@/lib/data';
import { type CriteriaState } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

export function Calculator() {
  const [criteriaState, setCriteriaState] = useState<CriteriaState>(() => {
    const saved = localStorage.getItem('defiCalculatorState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved state:', e);
      }
    }
    return Object.fromEntries(criteriaData.map((c) => [c.id, 0]));
  });

  const [adminVote, setAdminVote] = useState<number>(0);

  const calculateTotal = useCallback(() => {
    return criteriaData.reduce((total, criteria) => {
      return total + criteria.points * (criteriaState[criteria.id] || 0);
    }, adminVote);
  }, [criteriaState, adminVote]);

  const [total, setTotal] = useState<number>(calculateTotal());

  useEffect(() => {
    setTotal(calculateTotal());
  }, [criteriaState, adminVote, calculateTotal]);

  useEffect(() => {
    localStorage.setItem('defiCalculatorState', JSON.stringify(criteriaState));
  }, [criteriaState]);

  const handleReset = () => {
    setCriteriaState(Object.fromEntries(criteriaData.map((c) => [c.id, 0])));
    setAdminVote(0);
    toast.success('Calculator has been reset');
  };

  const handleSave = () => {
    const data = {
      criteria: criteriaState,
      adminVote,
      total,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `defi-points-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Calculation saved successfully');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Criteria Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <CriteriaTable
            criteriaState={criteriaState}
            onStateChange={setCriteriaState}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Vote</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminVote value={adminVote} onChange={setAdminVote} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalculatorIcon className="h-5 w-5" />
            Total Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-3xl font-bold md:text-4xl lg:text-5xl">
              {formatNumber(total)} points
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="w-full sm:w-auto"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
              </Button>
              <Button
                size="lg"
                onClick={handleSave}
                className="w-full sm:w-auto"
              >
                <Save className="mr-2 h-5 w-5" />
                Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}